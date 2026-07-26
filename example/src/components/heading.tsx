import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { fontSize } from '../ds/font';
import { Image } from 'expo-image';
import { PROFILE_PICTURE } from '../mock/constants';
const _width = Dimensions.get('window').width;
interface IHeading {
  children: React.ReactNode;
}
export default function Heading(props: IHeading) {
  const [fontLoaded] = useFonts({
    Bold: require('../assets/sf-pro-rounded/bold.otf'),
    Medium: require('../assets/sf-pro-rounded/medium.otf'),
    Regular: require('../assets/sf-pro-rounded/regular.otf'),
  });
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            fontFamily: fontLoaded ? 'Bold' : undefined,
          },
        ]}
      >
        {props.children}
      </Text>
      <View style={styles.pfpContainer}>
        <Image
          source={{
            uri: PROFILE_PICTURE,
          }}
          style={styles.pfp}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  title: {
    fontSize: fontSize.xl * 1.1,
    maxWidth: _width - 50,
  },
  pfp: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  pfpContainer: {
    position: 'absolute',
    left: _width - 75,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
