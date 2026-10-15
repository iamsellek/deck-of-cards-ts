import { Rank, Suit, Value } from './types';

export const FULL_DECK_CARD_COUNT = 52;

// Every full deck is 52 card objects, so a cap keeps a bad value (say, one that
// came straight from user input) from exhausting memory.
export const MAX_NUMBER_OF_FULL_DECKS = 1000;

// The collections below are frozen (and typed as readonly) so that nothing
// outside of this file can change what every Deck is built from.
export const SUIT_TO_COLOR: Readonly<Record<Suit, 'red' | 'black'>> =
  Object.freeze({
    hearts: 'red',
    diamonds: 'red',
    spades: 'black',
    clubs: 'black',
  });

export const ALL_RANKS: readonly Rank[] = Object.freeze([
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
]);

export const ALL_SUITS: readonly Suit[] = Object.freeze([
  'hearts',
  'diamonds',
  'spades',
  'clubs',
]);

// If it's an array, it'll be [primaryValue, secondaryValue].
export const RANK_TO_VALUE = Object.freeze({
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 11,
  Q: 12,
  K: 13,
  A: Object.freeze([14, 1] as const),
} as const satisfies Record<Rank, Value | readonly Value[]>);
