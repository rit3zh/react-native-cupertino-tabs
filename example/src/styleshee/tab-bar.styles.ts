import { StyleSheet } from 'react-native';
import { spacing } from '../ds/spacing';
import { ACTION_SIZE, TAB_BAR_HEIGHT } from '../constants/tab-bar.const';

const tabBarStyles = StyleSheet.create({
  stage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  container: {
    height: TAB_BAR_HEIGHT,
    borderRadius: 99,
    justifyContent: 'center',

    alignItems: 'center',
  },
  action: {
    width: ACTION_SIZE,
    height: ACTION_SIZE,
    borderRadius: 99,
    justifyContent: 'center',

    alignItems: 'center',
  },
  glassContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionSlot: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  blur: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  layer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
  },
});

export { tabBarStyles };
