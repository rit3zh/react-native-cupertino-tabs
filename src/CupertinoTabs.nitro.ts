import type {
  HybridView,
  HybridViewMethods,
  HybridViewProps,
} from 'react-native-nitro-modules';

export interface CupertinoTabsProps extends HybridViewProps {
  color: string;
}
export interface CupertinoTabsMethods extends HybridViewMethods {}

export type CupertinoTabs = HybridView<
  CupertinoTabsProps,
  CupertinoTabsMethods
>;
