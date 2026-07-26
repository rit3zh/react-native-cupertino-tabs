import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { TValueChangeHandler } from '../types/value-change-handler.type';
import type { ITabBarOptions } from './tab-bar-options.interface';

interface ITabsProps {
  children?: ReactNode;

  value?: string;
  defaultValue?: string;
  onValueChange?: TValueChangeHandler;
  tabBarOptions?: ITabBarOptions;

  style?: StyleProp<ViewStyle>;
}

export type { ITabsProps };
