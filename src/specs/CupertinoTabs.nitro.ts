import type {
  HybridView,
  HybridViewMethods,
  HybridViewProps,
} from 'react-native-nitro-modules';

export interface CupertinoTabIcon {
  systemName?: string;
  uri?: string;
  size?: number;
  color?: string;
  weight?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export interface CupertinoTabLabelStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  letterSpacing?: number;
  lineHeight?: number;

  color?: string;
}

export interface CupertinoTabItem {
  label?: string;
  labelStyle?: CupertinoTabLabelStyle;
  icon?: CupertinoTabIcon;
  enabled?: boolean;
  accessibilityLabel?: string;
}

export interface CupertinoTabsProps extends HybridViewProps {
  items: CupertinoTabItem[];
  selectedIndex: number;

  width?: number;
  height?: number;
  backgroundColor?: string;
  selectedBackgroundColor?: string;
  cornerRadius?: number;

  activeTintColor?: string;
  inactiveTintColor?: string;
  direction?: string;
  gap?: number;

  iconSize?: number;

  apportionsSegmentWidthsByContent?: boolean;
  hapticFeedback?: boolean;

  onChange?: (index: number) => void;
}

export interface CupertinoTabsMethods extends HybridViewMethods {
  selectIndex(index: number, animated: boolean): void;
}

export type CupertinoTabs = HybridView<
  CupertinoTabsProps,
  CupertinoTabsMethods
>;
