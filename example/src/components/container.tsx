import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { spacing } from '../ds/spacing';
import { ScrollEdgeBar } from 'react-native-scroll-edge-bar';

interface IContainer {
  children: React.ReactNode;
}

export default function Container(props: IContainer) {
  return (
    <ScrollEdgeBar style={styles.container} prefersGlassEffect>
      <ScrollEdgeBar.TopBar
        style={{ paddingHorizontal: 16, paddingVertical: 12 }}
      />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: 0,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {props.children}
      </ScrollView>
      <ScrollEdgeBar.BottomBar
        style={{ paddingHorizontal: 16, paddingVertical: 12 }}
      />
    </ScrollEdgeBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
});
