import { Button, Dimensions, StyleSheet, View } from 'react-native';
import * as Tabs from 'react-native-cupertino-tabs';
import Animated, {
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type WithSpringConfig,
} from 'react-native-reanimated';
import { useCallback } from 'react';

const _width = Dimensions.get('window').width;
// const _height = Dimensions.get('window').height;

const SPRING_CONFIG: WithSpringConfig = {
  damping: 10,
  stiffness: 150,
  mass: 0.5,
  reduceMotion: ReduceMotion.System,
};

export default function App() {
  const progress = useSharedValue<number>(0);

  const animatedStylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(progress.value, [0, 1], [1, 0.3]),
        },
        {
          translateY: interpolate(progress.value, [0, 1], [0, -120]),
        },
        {
          translateX: interpolate(progress.value, [0, 1], [0, 120]),
        },
      ],
      opacity: interpolate(progress.value, [0, 1], [1, 0]),
    };
  });

  const handlePress = useCallback(() => {
    progress.value = withSpring(progress.value === 1 ? 0 : 1, SPRING_CONFIG);
  }, [progress]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.stage,
          {
            width: _width * 0.9,
          },
          animatedStylez,
        ]}
      >
        <Tabs.Root
          tabBarOptions={{
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            iconSize: 23,
            width: _width * 0.35,
            height: _width * 0.12,
            backgroundColor: '#101010',
            selectedBackgroundColor: '#000',
          }}
        >
          <Tabs.Trigger value="library">
            <Tabs.Label>Hey</Tabs.Label>
          </Tabs.Trigger>
          <Tabs.Trigger value="home">
            <Tabs.Icon name="house.slash.fill" />
          </Tabs.Trigger>
          <Tabs.Trigger value="search">
            <Tabs.Icon name="magnifyingglass" />
          </Tabs.Trigger>
        </Tabs.Root>
      </Animated.View>

      <Button title="Animated Scale" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    gap: 8,
    paddingTop: 32,
  },
  blur: {
    height: 50,
    position: 'absolute',

    // backgroundColor: 'red',
  },
});
