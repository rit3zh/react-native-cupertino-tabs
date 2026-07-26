import { getHostComponent } from 'react-native-nitro-modules';
import type {
  ICupertinoTabsMethods,
  ICupertinoTabsProps,
} from '../../interfaces/native.interface';

const CupertinoTabsConfig = require('../../generated/CupertinoTabsConfig.json');

const NativeCupertinoTabsView = getHostComponent<
  ICupertinoTabsProps,
  ICupertinoTabsMethods
>('CupertinoTabs', () => CupertinoTabsConfig);

export { NativeCupertinoTabsView };
