import type { TABS_ROLE } from '../constants/role.constant';

type TTabsRole = (typeof TABS_ROLE)[keyof typeof TABS_ROLE];

export type { TTabsRole };
