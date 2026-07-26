import { StyleSheet, type StyleProp } from 'react-native';
import type { ICupertinoTabLabelStyle } from '../interfaces';
import type { TTabsLabelStyle } from '../types/label-style.type';
import { compact, isEmpty } from './compact.util';

const toNativeLabelStyle = (
  style: StyleProp<TTabsLabelStyle>
): ICupertinoTabLabelStyle | undefined => {
  const flat = StyleSheet.flatten(style);
  if (!flat) return undefined;

  const resolved = compact<ICupertinoTabLabelStyle>({
    fontFamily: flat.fontFamily,
    fontSize: flat.fontSize,
    fontWeight:
      flat.fontWeight === undefined ? undefined : String(flat.fontWeight),
    fontStyle: flat.fontStyle,
    letterSpacing: flat.letterSpacing,
    lineHeight: flat.lineHeight,
    color: typeof flat.color === 'string' ? flat.color : undefined,
  });

  return isEmpty(resolved) ? undefined : resolved;
};

export { toNativeLabelStyle };
