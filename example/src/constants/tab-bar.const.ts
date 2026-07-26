import type { SFSymbol } from 'sf-symbols-typescript';
import { PROFILE_PICTURE } from '../mock/constants';
import { Dimensions } from 'react-native';
import { spacing } from '../ds/spacing';
import type { WithSpringConfig } from 'react-native-reanimated';

interface IRoute {
  id: string;
  label: string;
  icon?: SFSymbol;
  image?: string;
  hasIcon?: boolean;
}

const ______routes: IRoute[] = [
  {
    id: '_home',
    label: 'Home',
    icon: 'house.fill',
  },
  {
    id: '_search',
    label: 'Search',
    icon: 'magnifyingglass',
  },
  {
    id: '_profile',
    label: 'Profile',
    image: PROFILE_PICTURE,
    hasIcon: false,
  },
];

const _width = Dimensions.get('window').width;
const _indicatorColor = '#f1eeee';
const AVATAR_SIZE = 26;
const TAB_BAR_HEIGHT = 45;
const ACTION_SIZE: number = 45;
const TRIGGER_WIDTH = 58;
const COLLAPSED_TAB_BAR_WIDTH = TRIGGER_WIDTH * ______routes.length;
const EXPANDED_TAB_BAR_WIDTH = TRIGGER_WIDTH * ______routes.length * 1.3;
const TAB_BAR_SHIFT = 100;
const TAB_BAR_LEFT = (_width - COLLAPSED_TAB_BAR_WIDTH) / 2;
const MAX_TAB_BAR_SHIFT = Math.max(0, TAB_BAR_LEFT - spacing['4xl']);
const RESOLVED_TAB_BAR_SHIFT = Math.min(TAB_BAR_SHIFT, MAX_TAB_BAR_SHIFT);
const SPRING_CONFIG: WithSpringConfig = {
  damping: 12,
  stiffness: 130,
  mass: 0.5,
};

export {
  AVATAR_SIZE,
  TAB_BAR_HEIGHT,
  ACTION_SIZE,
  EXPANDED_TAB_BAR_WIDTH,
  TAB_BAR_LEFT,
  TAB_BAR_SHIFT,
  RESOLVED_TAB_BAR_SHIFT,
  SPRING_CONFIG,
  ______routes,
  _indicatorColor,
  COLLAPSED_TAB_BAR_WIDTH,
};
