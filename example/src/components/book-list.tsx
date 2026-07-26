import { FlatList, StyleSheet } from 'react-native';
import { useCallback } from 'react';
import BookCard from './book-card';
import { BOOKS, type IMockData } from '../mock/constants';
import { spacing } from '../ds/spacing';

export default function BookList() {
  const renderItem = useCallback(
    ({ item }: { item: IMockData }) => <BookCard book={item} />,
    []
  );

  return (
    <FlatList
      data={BOOKS}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.lg,
    paddingBottom: spacing['7xl'] * 2,
    gap: spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
});
