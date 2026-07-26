import { Children, isValidElement, type ReactNode } from 'react';
import { TABS_ROLE } from '../constants/role.constant';
import type {
  ICupertinoTabItem,
  IParsedTrigger,
  ITabsIconProps,
  ITabsLabelProps,
  ITabsTriggerProps,
  ITriggerContent,
} from '../interfaces';
import { compact } from './compact.util';
import { toNativeIcon } from './icon.util';
import { toNativeLabelStyle } from './label-style.util';
import { roleOf } from './role.util';
import { textOf } from './text.util';

const parseTriggerContent = (children: ReactNode): ITriggerContent => {
  const content: ITriggerContent = {};

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      const text = textOf(child);
      if (text) content.label = text;
      return;
    }

    switch (roleOf(child)) {
      case TABS_ROLE.LABEL: {
        const labelProps = child.props as ITabsLabelProps;
        content.label = textOf(labelProps.children);
        content.labelStyle = toNativeLabelStyle(labelProps.style);
        break;
      }
      case TABS_ROLE.ICON: {
        content.icon = toNativeIcon(child.props as ITabsIconProps);
        break;
      }
    }
  });

  return content;
};

const parseTriggers = (children: ReactNode): IParsedTrigger[] => {
  const triggers: IParsedTrigger[] = [];

  Children.forEach(children, (child) => {
    if (roleOf(child) !== TABS_ROLE.TRIGGER || !isValidElement(child)) return;

    const props = child.props as ITabsTriggerProps;
    const { label, labelStyle, icon } = parseTriggerContent(props.children);

    triggers.push({
      value: props.value ?? label ?? String(triggers.length),
      item: compact<ICupertinoTabItem>({
        label,
        labelStyle,
        icon,
        enabled: props.disabled !== true,
        accessibilityLabel: props.accessibilityLabel,
      }),
    });
  });

  return triggers;
};

export { parseTriggers, parseTriggerContent };
