import type * as React from 'react';
import { TABS_ROLE } from '../../constants/role.constant';
import type { ITabsLabelProps } from '../../interfaces/tabs-label-props.interface';
import type { ITaggedComponent } from '../../interfaces/tagged-component.interface';
import type { TTabsRole } from '../../types/role.type';
import { withRole } from '../../utils/role.util';

const TabsLabelComponent: React.FC<ITabsLabelProps> &
  React.FunctionComponent<ITabsLabelProps> = (
  _props: ITabsLabelProps
): null => {
  return null;
};

const TabsLabel: typeof TabsLabelComponent &
  ITaggedComponent<typeof TABS_ROLE.LABEL & TTabsRole> = withRole(
  TabsLabelComponent,
  TABS_ROLE.LABEL
);

export { TabsLabel };
