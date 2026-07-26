import { View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import type { IMockData } from '../mock/constants';
import { spacing } from '../ds/spacing';

const _width = Dimensions.get('window').width;

const SLOT_WIDTH = (_width - spacing.md * 2 - spacing.md) / 2;
const ROTATION_INSET = spacing.xs;
const CARD_WIDTH = SLOT_WIDTH - ROTATION_INSET * 2;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

interface IBookCard {
  book: IMockData;
}

export default function BookCard(props: IBookCard) {
  return (
    <View style={styles.slot}>
      <View
        style={[
          styles.card,
          {
            transform: [{ rotate: props.book.rotationDeg ?? '0deg' }],
          },
        ]}
      >
        <Image
          source={{ uri: props.book.image }}
          style={styles.cover}
          contentFit="cover"
          transition={200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    width: SLOT_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: spacing.sm,
    backgroundColor: '#fff',
    padding: spacing.xxs,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cover: {
    flex: 1,
    borderRadius: spacing.xs,
  },
});
