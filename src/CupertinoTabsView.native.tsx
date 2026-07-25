import { getHostComponent } from 'react-native-nitro-modules';
const CupertinoTabsConfig = require('../nitrogen/generated/shared/json/CupertinoTabsConfig.json');
import type {
  CupertinoTabsMethods,
  CupertinoTabsProps,
} from './CupertinoTabs.nitro';

export const CupertinoTabsView = getHostComponent<
  CupertinoTabsProps,
  CupertinoTabsMethods
>('CupertinoTabs', () => CupertinoTabsConfig);
