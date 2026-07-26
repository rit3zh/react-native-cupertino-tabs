import type * as React from 'react';
import type { TabsIcon } from '../components/TabsIcon/TabsIcon';
import type { TabsLabel } from '../components/TabsLabel/TabsLabel';
import type { TabsTrigger } from '../components/TabsTrigger/TabsTrigger';
import type { ITabsProps } from './tabs-props.interface';

interface ITabsComponent extends React.FC<ITabsProps> {
  readonly Trigger: typeof TabsTrigger;
  readonly Icon: typeof TabsIcon;
  readonly Label: typeof TabsLabel;
}

export type { ITabsComponent };
