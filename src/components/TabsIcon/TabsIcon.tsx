import type * as React from 'react';
import { TABS_ROLE } from '../../constants/role.constant';
import type { ITabsIconProps } from '../../interfaces/tabs-icon-props.interface';
import type { ITaggedComponent } from '../../interfaces/tagged-component.interface';
import type { TTabsRole } from '../../types/role.type';
import { withRole } from '../../utils/role.util';

const TabsIconComponent: React.FC<ITabsIconProps> &
  React.FunctionComponent<ITabsIconProps> = (_props: ITabsIconProps): null => {
  return null;
};

const TabsIcon: typeof TabsIconComponent &
  ITaggedComponent<typeof TABS_ROLE.ICON & TTabsRole> = withRole(
  TabsIconComponent,
  TABS_ROLE.ICON
);

export { TabsIcon };
