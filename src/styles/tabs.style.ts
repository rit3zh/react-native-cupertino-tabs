import type { StyleProp, ViewStyle } from 'react-native';
import type { ITabBarOptions } from '../interfaces/tab-bar-options.interface';

const resolveTabsContainerStyle = (
  options: Pick<ITabBarOptions, 'width' | 'height'>,
  style: StyleProp<ViewStyle>
): StyleProp<ViewStyle> => {
  const size: ViewStyle =
    options.width === undefined
      ? { alignSelf: 'stretch', height: options.height }
      : { width: options.width, height: options.height };

  return [size, style];
};

export { resolveTabsContainerStyle };
