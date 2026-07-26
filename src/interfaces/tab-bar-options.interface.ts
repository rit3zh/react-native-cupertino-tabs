import type { TTabsDirection } from '../types/tabs-direction.type';

interface ITabBarOptions {
  width?: number;
  height?: number;
  /**
   * @use "transparent" to get a clear tab bar.
   */
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
}

export type { ITabBarOptions };
