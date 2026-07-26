import type { ITabBarOptions } from '../interfaces/tab-bar-options.interface';
import type { TTabsDirection } from '../types/tabs-direction.type';

const EMPTY_TAB_BAR_OPTIONS: ITabBarOptions = Object.freeze({});
const DEFAULT_HAPTIC_FEEDBACK = true;
const DEFAULT_DIRECTION: TTabsDirection = 'row';
const DEFAULT_ROW_HEIGHT = 44;
const DEFAULT_COLUMN_HEIGHT = 56;

const DEFAULT_TAB_BAR_OPTIONS: ITabBarOptions = Object.freeze({
  direction: DEFAULT_DIRECTION,
  hapticFeedback: DEFAULT_HAPTIC_FEEDBACK,
});

const resolveTabBarHeight = (
  height: number | undefined,
  direction: TTabsDirection
): number => {
  if (height !== undefined) return height;
  return direction === 'column' ? DEFAULT_COLUMN_HEIGHT : DEFAULT_ROW_HEIGHT;
};

export {
  EMPTY_TAB_BAR_OPTIONS,
  DEFAULT_TAB_BAR_OPTIONS,
  DEFAULT_HAPTIC_FEEDBACK,
  DEFAULT_DIRECTION,
  DEFAULT_ROW_HEIGHT,
  DEFAULT_COLUMN_HEIGHT,
  resolveTabBarHeight,
};
