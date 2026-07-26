// @ts-check
import * as React from 'react';
import { memo } from 'react';
import { View, type ViewProps } from 'react-native';
import type { ICupertinoTabsViewProps } from '../../interfaces/cupertino-tabs-view-props.interface';
const CupertinoTabsViewComponent: React.FC<ICupertinoTabsViewProps> &
  React.FunctionComponent<ICupertinoTabsViewProps> = ({
  style,
  width,
  height,
}: ICupertinoTabsViewProps): React.JSX.Element &
  React.ReactElement &
  React.ReactNode => {
  return <View style={[{ width, height }, style] as ViewProps['style']} />;
};

const CupertinoTabsView = memo(CupertinoTabsViewComponent);

export { CupertinoTabsView };
