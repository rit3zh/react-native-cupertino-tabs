import type { StyleProp, ViewStyle } from 'react-native';
import type { TTabsDirection } from '../types/tabs-direction.type';
import type { ICupertinoTabItem } from './native.interface';

interface ICupertinoTabsViewProps {
  items: ICupertinoTabItem[];
  selectedIndex: number;

  width?: number;
  height?: number;
  backgroundColor?: string;
  selectedBackgroundColor?: string;
  cornerRadius?: number;
  activeTintColor?: string;
  inactiveTintColor?: string;
  direction?: TTabsDirection;
  gap?: number;
  iconSize?: number;
  apportionsSegmentWidthsByContent?: boolean;
  hapticFeedback?: boolean;

  onChange?: (index: number) => void;

  style?: StyleProp<ViewStyle>;
}

export type { ICupertinoTabsViewProps };
