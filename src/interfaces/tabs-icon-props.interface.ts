import type { ImageSourcePropType } from 'react-native';
import type { TFontWeight } from '../types/font-weight.type';
import type { SFSymbol } from 'sf-symbols-typescript';

interface ITabsIconProps {
  name?: SFSymbol;
  source?: ImageSourcePropType;
  size?: number;
  color?: string;
  weight?: TFontWeight;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export type { ITabsIconProps };
