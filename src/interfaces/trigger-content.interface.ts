import type {
  ICupertinoTabIcon,
  ICupertinoTabLabelStyle,
} from './native.interface';

interface ITriggerContent {
  label?: string;
  labelStyle?: ICupertinoTabLabelStyle;
  icon?: ICupertinoTabIcon;
}

export type { ITriggerContent };
