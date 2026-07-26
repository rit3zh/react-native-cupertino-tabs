import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { fontSize } from '../ds/font';

import { spacing } from '../ds/spacing';
const _width = Dimensions.get('window').width;

interface ILabel {
  children: React.ReactNode;
}
export default function Label(props: ILabel) {
  const [fontLoaded] = useFonts({
    Bold: require('../assets/sf-pro-rounded/bold.otf'),
    Medium: require('../assets/sf-pro-rounded/medium.otf'),
    Regular: require('../assets/sf-pro-rounded/regular.otf'),
  });
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            fontFamily: fontLoaded ? 'Regular' : undefined,
          },
        ]}
      >
        {props.children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.md,
  },
  label: {
    fontSize: fontSize.xl * 0.7,
    maxWidth: _width - 50,
    letterSpacing: -0.2,
    color: '#424242',
  },
});
