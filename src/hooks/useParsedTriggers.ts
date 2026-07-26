import { useMemo, type ReactNode } from 'react';
import type { IParsedTrigger } from '../interfaces/parsed-trigger.interface';
import { parseTriggers } from '../utils/parse-triggers.util';

const useParsedTriggers = (children: ReactNode): readonly IParsedTrigger[] => {
  return useMemo<readonly IParsedTrigger[]>(
    () => parseTriggers(children),
    [children]
  );
};

export { useParsedTriggers };
