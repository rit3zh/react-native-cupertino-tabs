import type * as React from 'react';
import {
  DEFAULT_DIRECTION,
  DEFAULT_HAPTIC_FEEDBACK,
  DEFAULT_TAB_BAR_OPTIONS,
  resolveTabBarHeight,
} from '../constants/tab-bar.constant';
import { useNativeTabItems } from '../hooks/useNativeTabItems';
import { useParsedTriggers } from '../hooks/useParsedTriggers';
import { useTabSelection } from '../hooks/useTabSelection';
import type { ITabsProps } from '../interfaces/tabs-props.interface';
import { resolveTabsContainerStyle } from '../styles/tabs.style';
import { CupertinoTabsView } from '../views/CupertinoTabsView';

const TabsRoot: React.FC<ITabsProps> & React.FunctionComponent<ITabsProps> = ({
  children,
  value,
  defaultValue,
  onValueChange,
  tabBarOptions = DEFAULT_TAB_BAR_OPTIONS,
  style,
}: ITabsProps): React.JSX.Element & React.ReactElement & React.ReactNode => {
  const {
    width,
    height,
    backgroundColor,
    selectedBackgroundColor,
    cornerRadius,
    activeTintColor,
    inactiveTintColor,
    direction = DEFAULT_DIRECTION,
    gap,
    iconSize,
    apportionsSegmentWidthsByContent,
    hapticFeedback = DEFAULT_HAPTIC_FEEDBACK,
  } = tabBarOptions;

  const resolvedHeight = resolveTabBarHeight(height, direction);

  const triggers = useParsedTriggers(children);
  const items = useNativeTabItems(triggers);
  const { selectedIndex, onIndexChange } = useTabSelection({
    triggers,
    value,
    defaultValue,
    onValueChange,
  });

  return (
    <CupertinoTabsView
      items={items}
      selectedIndex={selectedIndex}
      onChange={onIndexChange}
      width={width}
      height={resolvedHeight}
      backgroundColor={backgroundColor}
      selectedBackgroundColor={selectedBackgroundColor}
      cornerRadius={cornerRadius}
      activeTintColor={activeTintColor}
      inactiveTintColor={inactiveTintColor}
      direction={direction}
      gap={gap}
      iconSize={iconSize}
      apportionsSegmentWidthsByContent={apportionsSegmentWidthsByContent}
      hapticFeedback={hapticFeedback}
      style={resolveTabsContainerStyle(
        { width, height: resolvedHeight },
        style
      )}
    />
  );
};

TabsRoot.displayName = 'Tabs';

export { TabsRoot };
