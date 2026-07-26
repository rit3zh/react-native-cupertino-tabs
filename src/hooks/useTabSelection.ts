import { useCallback, useState } from 'react';
import type { ITabSelection } from '../interfaces/tab-selection.interface';
import type { ITabSelectionOptions } from '../interfaces/tab-selection-options.interface';

const useTabSelection = ({
  triggers,
  value,
  defaultValue,
  onValueChange,
}: ITabSelectionOptions): ITabSelection => {
  const [uncontrolled, setUncontrolled] = useState<string | undefined>(
    defaultValue
  );

  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  const selectedIndex = Math.max(
    0,
    triggers.findIndex((trigger) => trigger.value === current)
  );

  const onIndexChange = useCallback(
    (index: number): void => {
      const trigger = triggers[index];
      if (!trigger) return;
      if (value === undefined) setUncontrolled(trigger.value);
      onValueChange?.(trigger.value, index);
    },
    [onValueChange, triggers, value]
  );

  return { selectedIndex, onIndexChange };
};

export { useTabSelection };
