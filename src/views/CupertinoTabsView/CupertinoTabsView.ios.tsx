import * as React from 'react';
import { callback } from 'react-native-nitro-modules';
import {
  UNSET_NUMBER,
  UNSET_TEXT,
} from '../../constants/native-sentinel.constant';
import type { ICupertinoTabsViewProps } from '../../interfaces/cupertino-tabs-view-props.interface';
import { NativeCupertinoTabsView } from './NativeCupertinoTabsView';
import { memo, useMemo } from 'react';
const UNSET_CALLBACK = callback((): void => {});

const CupertinoTabsViewComponent: React.FC<ICupertinoTabsViewProps> &
  React.FunctionComponent<ICupertinoTabsViewProps> = ({
  items,
  selectedIndex,
  width,
  height,
  backgroundColor,
  selectedBackgroundColor,
  cornerRadius,
  activeTintColor,
  inactiveTintColor,
  direction,
  gap,
  iconSize,
  apportionsSegmentWidthsByContent,
  hapticFeedback,
  onChange,
  style,
}: ICupertinoTabsViewProps): React.JSX.Element &
  React.ReactElement &
  React.ReactNode => {
  const wrappedOnChange = useMemo(
    () => (onChange ? callback(onChange) : UNSET_CALLBACK),
    [onChange]
  );

  return (
    <NativeCupertinoTabsView
      items={items}
      selectedIndex={selectedIndex}
      style={style}
      width={width ?? UNSET_NUMBER}
      height={height ?? UNSET_NUMBER}
      backgroundColor={backgroundColor ?? UNSET_TEXT}
      selectedBackgroundColor={selectedBackgroundColor ?? UNSET_TEXT}
      cornerRadius={cornerRadius ?? UNSET_NUMBER}
      activeTintColor={activeTintColor ?? UNSET_TEXT}
      inactiveTintColor={inactiveTintColor ?? UNSET_TEXT}
      direction={direction ?? UNSET_TEXT}
      gap={gap ?? UNSET_NUMBER}
      iconSize={iconSize ?? UNSET_NUMBER}
      apportionsSegmentWidthsByContent={
        apportionsSegmentWidthsByContent ?? false
      }
      hapticFeedback={hapticFeedback ?? false}
      onChange={wrappedOnChange}
    />
  );
};

const CupertinoTabsView = memo(CupertinoTabsViewComponent);

export { CupertinoTabsView };
