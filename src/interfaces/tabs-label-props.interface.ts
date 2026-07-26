import type { ReactNode } from 'react';
import type { StyleProp } from 'react-native';
import type { TTabsLabelStyle } from '../types/label-style.type';

interface ITabsLabelProps {
  children?: ReactNode;
  style?: StyleProp<TTabsLabelStyle>;
}

export type { ITabsLabelProps };
