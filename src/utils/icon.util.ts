import { Image } from 'react-native';
import type { ICupertinoTabIcon, ITabsIconProps } from '../interfaces';
import { compact } from './compact.util';

const toNativeIcon = (props: ITabsIconProps): ICupertinoTabIcon => {
  const resolved = props.source
    ? Image.resolveAssetSource(props.source)
    : undefined;

  return compact<ICupertinoTabIcon>({
    systemName: props.name,
    uri: resolved?.uri,
    size: props.size,
    color: props.color,
    weight: props.weight,
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius,
  });
};

export { toNativeIcon };
