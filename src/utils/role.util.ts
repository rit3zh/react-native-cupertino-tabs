import { isValidElement, type ReactNode } from 'react';
import { TABS_ROLE_KEY } from '../constants/role.constant';
import type { ITaggedComponent } from '../interfaces/tagged-component.interface';
import type { TTabsRole } from '../types/role.type';

const withRole = <TComponent extends object, TRole extends TTabsRole>(
  component: TComponent,
  role: TRole
): TComponent & ITaggedComponent<TRole> => {
  const tagged = component as TComponent & { [TABS_ROLE_KEY]?: TRole };
  tagged[TABS_ROLE_KEY] = role;
  return tagged;
};

const roleOf = (node: ReactNode): TTabsRole | undefined => {
  if (!isValidElement(node)) return undefined;
  return (node.type as ITaggedComponent | undefined)?.[TABS_ROLE_KEY];
};

export { withRole, roleOf };
