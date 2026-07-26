import type { TValueChangeHandler } from '../types/value-change-handler.type';
import type { IParsedTrigger } from './parsed-trigger.interface';

interface ITabSelectionOptions {
  triggers: readonly IParsedTrigger[];
  value?: string;
  defaultValue?: string;
  onValueChange?: TValueChangeHandler;
}

export type { ITabSelectionOptions };
