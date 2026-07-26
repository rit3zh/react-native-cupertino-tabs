/**
 * ⚠️ messy code ahead.
 */

import { StyleSheet, View, Pressable, type ViewStyle } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../ds/spacing';
import { GlassContainer, GlassView } from 'expo-glass-effect';
import { Tabs } from 'react-native-cupertino-tabs';
import { SymbolView } from 'expo-symbols';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useCallback } from 'react';
import { BlurView, type BlurViewProps } from 'expo-blur';
import {
  ______routes,
  ACTION_SIZE,
  AVATAR_SIZE,
  EXPANDED_TAB_BAR_WIDTH,
  RESOLVED_TAB_BAR_SHIFT,
  SPRING_CONFIG,
  TAB_BAR_HEIGHT,
  COLLAPSED_TAB_BAR_WIDTH,
  _indicatorColor,
} from '../constants/tab-bar.const';

const AnimatedGlassView = Animated.createAnimatedComponent(GlassView);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

function AnimatedTabBar(__: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const progress = useSharedValue<number>(0);
  const tabBarProgress = useSharedValue<number>(0);

  const animatedTabBarStylez = useAnimatedStyle<
    Pick<ViewStyle, 'width' | 'transform'>
  >(() => {
    return {
      width: interpolate(
        tabBarProgress.value,
        [0, 1],
        [COLLAPSED_TAB_BAR_WIDTH, EXPANDED_TAB_BAR_WIDTH]
      ),
      transform: [
        {
          translateX: interpolate(
            tabBarProgress.value,
            [0, 1],
            [0, -RESOLVED_TAB_BAR_SHIFT]
          ),
        },
      ],
    };
  });

  const animatedActionStylez = useAnimatedStyle<Pick<ViewStyle, 'transform'>>(
    () => {
      return {
        transform: [
          {
            rotate: `${interpolate(progress.value, [0, 1], [0, 45])}deg`,
          },
        ],
      };
    }
  );

  const handlePressIn = useCallback(() => {
    progress.value = withTiming<number>(progress.value === 1 ? 0 : 1);
    tabBarProgress.value = withSpring<number>(
      tabBarProgress.value === 1 ? 0 : 1,
      SPRING_CONFIG
    );
  }, [progress, tabBarProgress]);

  const animatedGlassViewTabStylez = useAnimatedStyle<
    Pick<ViewStyle, 'opacity' | 'transform' | 'pointerEvents'>
  >(() => {
    return {
      opacity: interpolate(tabBarProgress.value, [0, 1], [1, 0]),
      transform: [
        {
          scale: interpolate(tabBarProgress.value, [0, 1], [1, 0.8]),
        },
      ],
      pointerEvents: tabBarProgress.value < 0.5 ? 'auto' : 'none',
    };
  });

  const animatedDrawActionStylez = useAnimatedStyle<
    Pick<ViewStyle, 'opacity' | 'transform' | 'pointerEvents'>
  >(() => {
    return {
      opacity: interpolate(tabBarProgress.value, [0, 1], [0, 1]),
      pointerEvents: tabBarProgress.value < 0.5 ? 'none' : 'auto',
      transform: [
        {
          scale: interpolate(tabBarProgress.value, [0, 1], [0.8, 1]),
        },
      ],
    };
  });

  const animatedBlurViewPropz = useAnimatedProps<
    Pick<BlurViewProps, 'intensity'>
  >(() => {
    return {
      intensity: withSpring(
        interpolate(tabBarProgress.value, [0, 0.5, 1], [0, 15, 0])
      ),
    };
  });

  const animatedBlurViewActionPropz = useAnimatedProps<
    Pick<BlurViewProps, 'intensity'>
  >(() => {
    return {
      intensity: withSpring(
        interpolate(tabBarProgress.value, [0, 0.5, 1], [0, 12, 0])
      ),
    };
  });

  return (
    <View style={styles.stage}>
      <View
        style={[
          styles.parent,
          {
            marginBottom: insets.bottom / 1.5,
          },
        ]}
      >
        <GlassContainer style={styles.glassContainer}>
          <AnimatedGlassView
            isInteractive
            glassEffectStyle="regular"
            style={[styles.container, animatedTabBarStylez]}
          >
            <Animated.View
              style={[styles.layer, animatedGlassViewTabStylez]}
              pointerEvents={'none'}
            >
              <Tabs
                tabBarOptions={{
                  backgroundColor: 'transparent',
                  selectedBackgroundColor: _indicatorColor,
                }}
              >
                {______routes.map((route) => (
                  <Tabs.Trigger
                    key={route.id}
                    value={route.id}
                    accessibilityLabel={route.label}
                  >
                    {route.hasIcon === false ? (
                      <Tabs.Icon
                        source={{ uri: route.image }}
                        width={AVATAR_SIZE}
                        height={AVATAR_SIZE}
                        borderRadius={AVATAR_SIZE / 2}
                      />
                    ) : (
                      <Tabs.Icon name={route.icon} />
                    )}
                  </Tabs.Trigger>
                ))}
              </Tabs>
            </Animated.View>

            <Animated.View
              style={[styles.layer, animatedDrawActionStylez]}
              pointerEvents={'none'}
            >
              <Tabs
                tabBarOptions={{
                  backgroundColor: 'transparent',
                  selectedBackgroundColor: _indicatorColor,
                }}
              >
                <Tabs.Trigger>
                  <Tabs.Icon name="pencil" />
                  <Tabs.Label style={styles.label}>Edit</Tabs.Label>
                </Tabs.Trigger>
                <Tabs.Trigger>
                  <Tabs.Icon name="line.2.horizontal.decrease.circle" />
                  <Tabs.Label style={styles.label}> Reorganize</Tabs.Label>
                </Tabs.Trigger>
              </Tabs>
            </Animated.View>

            <AnimatedBlurView
              style={[StyleSheet.absoluteFill, styles.blur]}
              tint={'systemThickMaterialLight'}
              pointerEvents={'none'}
              animatedProps={animatedBlurViewPropz}
            />
          </AnimatedGlassView>
          <Pressable onPress={handlePressIn} style={styles.actionSlot}>
            <AnimatedGlassView
              isInteractive
              tintColor={'#000000be'}
              glassEffectStyle={'clear'}
              style={[styles.action, animatedActionStylez]}
            >
              <SymbolView
                name={'plus'}
                tintColor={'#ebe9e9'}
                size={AVATAR_SIZE / 1.5}
              />

              <AnimatedBlurView
                style={[
                  StyleSheet.absoluteFill,
                  {
                    borderRadius: 100,
                    overflow: 'hidden',
                  },
                ]}
                tint={'systemThickMaterial'}
                animatedProps={animatedBlurViewActionPropz}
              />
            </AnimatedGlassView>
          </Pressable>
        </GlassContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default AnimatedTabBar;
