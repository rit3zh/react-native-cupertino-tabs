#!/usr/bin/env bash
#
# Publish the built library to npm.
#
# Only the built output + the iOS/nitrogen sources the podspec needs are
# shipped. The example app, tests, and tooling config are kept out via the
# "files" allowlist in package.json, and this script hard-fails if any of
# them ever sneak in.
#
# Usage:
#   ./scripts/publish-npm.sh              # publish current version
#   ./scripts/publish-npm.sh --dry-run    # build + verify, publish nothing
#
set -euo pipefail

cd "$(dirname "$0")/.."

DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

# Anything matching these must never end up in the tarball.
FORBIDDEN=(
  'example/'
  '__tests__/'
  '__mocks__/'
  '__fixtures__/'
  '.test.'
  '.spec.'
  'jest.setup.js'
  'eslint.config.mjs'
  'tsconfig.json'
  'turbo.json'
  'babel.config.js'
  'lefthook.yml'
  'yarn.lock'
  'ios/build/'
  'node_modules/'
  '.github/'
)

step() { printf '\n\033[1;34m==>\033[0m \033[1m%s\033[0m\n' "$1"; }
fail() { printf '\n\033[1;31mERROR:\033[0m %s\n' "$1" >&2; exit 1; }

step "Checking git state"
if [[ -n "$(git status --porcelain)" ]]; then
  fail "Working tree is dirty. Commit or stash first (see ./scripts/push-github.sh)."
fi

step "Checking npm auth"
npm whoami >/dev/null 2>&1 || fail "Not logged in to npm. Run: npm login"

step "Typechecking"
yarn typecheck

step "Linting"
yarn lint

step "Running tests"
yarn test

step "Building (clean + bob)"
yarn clean
yarn prepare

[[ -f lib/module/index.js ]] || fail "Build produced no lib/module/index.js"
[[ -f lib/typescript/src/index.d.ts ]] || fail "Build produced no type declarations"

step "Verifying tarball contents"
PACKED="$(npm pack --dry-run 2>&1 | sed -nE 's/^npm notice +[0-9.]+[a-zA-Z]+ +(.+)$/\1/p')"
[[ -n "$PACKED" ]] || fail "Could not read the file list from npm pack"

VIOLATIONS=""
for pattern in "${FORBIDDEN[@]}"; do
  match="$(printf '%s\n' "$PACKED" | grep -F -- "$pattern" || true)"
  [[ -n "$match" ]] && VIOLATIONS+="$match"$'\n'
done

if [[ -n "$VIOLATIONS" ]]; then
  printf '%s\n' "$VIOLATIONS" >&2
  fail "The above files would be published. Fix the \"files\" allowlist in package.json."
fi

printf '%s\n' "$PACKED" | sed 's/^/  /'
printf '\n%s file(s) will be published.\n' "$(printf '%s\n' "$PACKED" | wc -l | tr -d ' ')"

NAME="$(node -p "require('./package.json').name")"
VERSION="$(node -p "require('./package.json').version")"

if $DRY_RUN; then
  step "Dry run complete — $NAME@$VERSION was NOT published"
  exit 0
fi

if npm view "$NAME@$VERSION" version >/dev/null 2>&1; then
  fail "$NAME@$VERSION is already on npm. Bump the version first (yarn release)."
fi

step "Publishing $NAME@$VERSION"
npm publish --access public

step "Published $NAME@$VERSION"
