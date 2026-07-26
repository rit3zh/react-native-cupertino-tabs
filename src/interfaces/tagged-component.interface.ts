import type { TABS_ROLE_KEY } from '../constants/role.constant';
import type { TTabsRole } from '../types/role.type';

interface ITaggedComponent<TRole extends TTabsRole = TTabsRole> {
  readonly [TABS_ROLE_KEY]?: TRole;
}

export type { ITaggedComponent };
