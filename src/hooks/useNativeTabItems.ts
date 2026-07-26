import { useMemo } from 'react';
import type { ICupertinoTabItem } from '../interfaces/native.interface';
import type { IParsedTrigger } from '../interfaces/parsed-trigger.interface';

/**
 * The segment payloads on their own, split out from the values so the array
 * handed to the native view only changes when the triggers do.
 */
const useNativeTabItems = (
  triggers: readonly IParsedTrigger[]
): ICupertinoTabItem[] => {
  return useMemo<ICupertinoTabItem[]>(
    () => triggers.map((trigger) => trigger.item),
    [triggers]
  );
};

export { useNativeTabItems };
