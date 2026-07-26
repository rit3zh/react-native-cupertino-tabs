#!/usr/bin/env node
//
// Copy nitrogen's generated view config into src/.
//
// The config is required at runtime by NativeCupertinoTabsView. That require is
// a literal relative path, and bob rewrites nothing — so the path has to resolve
// identically from `src/views/CupertinoTabsView/` (how the example app and the
// "source" export condition load us) and from
// `lib/module/views/CupertinoTabsView/` (how published consumers load us).
//
// Pointing at `nitrogen/` at the package root cannot satisfy both: it sits three
// levels up from the source file but four from the built one. Keeping a copy
// inside src/ fixes the depth, because bob copies non-JS files from src/ into
// lib/module/ verbatim.

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const from = join(
  root,
  'nitrogen/generated/shared/json/CupertinoTabsConfig.json'
);
const to = join(root, 'src/generated/CupertinoTabsConfig.json');

mkdirSync(dirname(to), { recursive: true });
copyFileSync(from, to);

console.log('synced CupertinoTabsConfig.json -> src/generated/');
