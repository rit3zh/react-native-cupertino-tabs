import type * as React from 'react';
import { TABS_ROLE } from '../../constants/role.constant';
import type { ITabsTriggerProps } from '../../interfaces/tabs-trigger-props.interface';
import type { ITaggedComponent } from '../../interfaces/tagged-component.interface';
import type { TTabsRole } from '../../types/role.type';
import { withRole } from '../../utils/role.util';

const TabsTriggerComponent: React.FC<ITabsTriggerProps> &
  React.FunctionComponent<ITabsTriggerProps> = (
  _props: ITabsTriggerProps
): null => {
  return null;
};

TabsTriggerComponent.displayName = 'Tabs.Trigger';

const TabsTrigger: typeof TabsTriggerComponent &
  ITaggedComponent<typeof TABS_ROLE.TRIGGER & TTabsRole> = withRole(
  TabsTriggerComponent,
  TABS_ROLE.TRIGGER
);

export { TabsTrigger };
