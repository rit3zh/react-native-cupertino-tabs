#!/usr/bin/env bash
#
# Push the full repository to GitHub — everything tracked, including the
# example app, tests and tooling config. Only .gitignore decides what is
# left out here; the npm "files" allowlist is irrelevant to this script.
#
# Usage:
#   ./scripts/push-github.sh                     # commit (if needed) + push current branch
#   ./scripts/push-github.sh "feat: my message"  # use this commit message
#   ./scripts/push-github.sh -f "wip: message"   # same, but skip the lefthook checks
#
set -euo pipefail

cd "$(dirname "$0")/.."

NO_VERIFY=""
if [[ "${1:-}" == "-f" || "${1:-}" == "--force" || "${1:-}" == "--skip-checks" ]]; then
  NO_VERIFY="--no-verify"
  shift
fi

MESSAGE="${1:-}"

step() { printf '\n\033[1;34m==>\033[0m \033[1m%s\033[0m\n' "$1"; }
fail() { printf '\n\033[1;31mERROR:\033[0m %s\n' "$1" >&2; exit 1; }

step "Checking remote"
if ! git remote get-url origin >/dev/null 2>&1; then
  REPO_URL="$(node -p "require('./package.json').repository.url" 2>/dev/null || echo '')"
  REPO_URL="${REPO_URL#git+}"
  [[ -n "$REPO_URL" ]] || fail "No 'origin' remote and no repository.url in package.json."
  printf 'No origin remote. Adding: %s\n' "$REPO_URL"
  git remote add origin "$REPO_URL"
fi
git remote get-url origin | sed 's/^/  origin -> /'

BRANCH="$(git rev-parse --abbrev-ref HEAD)"

step "Verifying nothing ignored-but-needed is missing"
# The example app must be tracked on GitHub even though it never ships to npm.
if [[ -d example/src ]] && ! git ls-files --error-unmatch example/src/App.tsx >/dev/null 2>&1; then
  fail "example/src/App.tsx is not tracked by git. Check .gitignore — the example belongs on GitHub."
fi

if [[ -n "$(git status --porcelain)" ]]; then
  step "Staging all changes"
  git add -A
  git status --short

  step "Committing"
  [[ -n "$NO_VERIFY" ]] && printf '  Skipping lefthook checks (--no-verify).\n'
  if [[ -n "$MESSAGE" ]]; then
    git commit $NO_VERIFY -m "$MESSAGE"
  else
    # No message given: open git's editor. Never read a message from the
    # terminal here — a pasted multi-line body would leak its trailing
    # lines into the shell as commands.
    printf '  No message argument — opening your git editor.\n'
    git commit $NO_VERIFY
  fi
else
  printf '  Working tree clean — nothing new to commit.\n'
fi

step "Pushing $BRANCH to origin"
if git rev-parse --abbrev-ref "@{upstream}" >/dev/null 2>&1; then
  git push origin "$BRANCH"
else
  git push -u origin "$BRANCH"
fi

step "Pushing tags"
git push origin --tags

step "Pushed $BRANCH to $(git remote get-url origin)"
