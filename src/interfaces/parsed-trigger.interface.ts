import type { ICupertinoTabItem } from './native.interface';

interface IParsedTrigger {
  readonly value: string;
  readonly item: ICupertinoTabItem;
}

export type { IParsedTrigger };
