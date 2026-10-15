import { Card, CardAsString, CardData, Rank, Suit, Value } from './types';

export function cardToString(
  card: Pick<CardData, 'rank' | 'suit'>
): CardAsString {
  return `${card.rank} of ${card.suit}`;
}

// toString lives here on the class instead of on each card, so a card is only
// its four fields (plain data that can be saved, sent and cloned). Cards are
// frozen so that nothing can change one while it's still in a deck.
export class PlayingCard implements Card {
  readonly suit: Suit;
  readonly rank: Rank;
  readonly value: Value;
  readonly secondaryValue: Value | null;

  constructor({ suit, rank, value, secondaryValue }: CardData) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
    this.secondaryValue = secondaryValue;

    Object.freeze(this);
  }

  toString(): CardAsString {
    return cardToString(this);
  }
}
