export type Suit = 'hearts' | 'diamonds' | 'spades' | 'clubs';

export type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type Rank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';

export type CardAsString = `${Rank} of ${Suit}`;

// Just the data of a card, so it can be saved, sent and cloned.
export interface CardData {
  readonly suit: Suit;
  readonly rank: Rank;
  readonly value: Value;
  readonly secondaryValue: Value | null;
}

export interface Card extends CardData {
  toString: () => CardAsString;
}
