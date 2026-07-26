import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { GlassView } from 'expo-glass-effect';
import { spacing } from '../ds/spacing';
import { SymbolView } from 'expo-symbols';

const _width = Dimensions.get('window').width;
export default function SearchBarWithFilter() {
  return (
    <View style={styles.container}>
      <GlassView style={styles.inputContainer} isInteractive>
        <SymbolView
          name={'magnifyingglass'}
          size={spacing.md}
          tintColor={'#848181'}
        />
        <TextInput
          placeholder="Search for books."
          style={styles.input}
          selectionColor={'#000'}
          editable={false}
        />
      </GlassView>
      <GlassView style={styles.filterButtonContainer} isInteractive>
        <SymbolView
          name={'line.3.horizontal.decrease'}
          size={spacing.xl}
          tintColor={'black'}
        />
      </GlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: spacing.xxs,
    alignItems: 'center',
    borderRadius: 99,
    paddingHorizontal: spacing.md,
    width: _width - spacing['7xl'] * 1.02,
    paddingVertical: spacing.xs,
  },
  input: {
    padding: spacing.xs,
  },
  filterButtonContainer: {
    width: spacing['4xl'],
    height: spacing['4xl'],
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
