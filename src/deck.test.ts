import { expect } from 'vitest';
import {
  ALL_RANKS,
  FULL_DECK_CARD_COUNT,
  MAX_NUMBER_OF_FULL_DECKS,
} from './constants';
import Deck from './deck';
import { Card, Rank, Value } from './types';

const EXPECTED_VALUES: Record<Rank, [Value, Value | null]> = {
  '2': [2, null],
  '3': [3, null],
  '4': [4, null],
  '5': [5, null],
  '6': [6, null],
  '7': [7, null],
  '8': [8, null],
  '9': [9, null],
  '10': [10, null],
  J: [11, null],
  Q: [12, null],
  K: [13, null],
  A: [14, 1],
};

// A Set compares objects by identity, so tell cards apart by their string
// form. It also makes failure messages read as card names instead of objects.
const toStrings = (cards: Card[]): string[] =>
  cards.map((card) => card.toString());

describe('Deck tests', () => {
  it('Instantiates with the correct number of cards', () => {
    expect(new Deck().getCards().length).toBe(FULL_DECK_CARD_COUNT * 1);
    expect(new Deck(1).getCards().length).toBe(FULL_DECK_CARD_COUNT * 1);
    expect(new Deck(2).getCards().length).toBe(FULL_DECK_CARD_COUNT * 2);
    expect(new Deck(10).getCards().length).toBe(FULL_DECK_CARD_COUNT * 10);
  });

  it('Instantiating with zero full decks creates an empty deck', () => {
    const deck = new Deck(0);

    expect(deck.getCards()).toEqual([]);
    expect(deck.draw()).toBe(null);
  });

  it('Instantiates with the maximum number of full decks', () => {
    const deck = new Deck(MAX_NUMBER_OF_FULL_DECKS);

    expect(deck.getCards().length).toBe(
      FULL_DECK_CARD_COUNT * MAX_NUMBER_OF_FULL_DECKS
    );
  });

  it.each([
    -1,
    1.5,
    NaN,
    Infinity,
    -Infinity,
    MAX_NUMBER_OF_FULL_DECKS + 1,
    1e9,
  ])(
    'Throws a RangeError when instantiated with %s full decks',
    (numberOfFullDecks) => {
      expect(() => new Deck(numberOfFullDecks)).toThrow(RangeError);
    }
  );

  it('Throws a RangeError when instantiated with something that is not a number', () => {
    expect(() => new Deck('3' as unknown as number)).toThrow(RangeError);
    expect(() => new Deck(null as unknown as number)).toThrow(RangeError);
  });

  it('Instantiating a full deck does not repeat cards', () => {
    const cards = new Deck().getCards();
    const uniqueCards = new Set(toStrings(cards));

    expect(uniqueCards.size).toBe(FULL_DECK_CARD_COUNT);
  });

  it.each(ALL_RANKS)(
    'Cards of rank %s have the expected value and secondary value',
    (rank) => {
      const [value, secondaryValue] = EXPECTED_VALUES[rank];
      const cardsOfRank = new Deck()
        .getCards()
        .filter((card) => card.rank === rank);

      expect(cardsOfRank.length).toBe(4);

      for (const card of cardsOfRank) {
        expect(card.value).toBe(value);
        expect(card.secondaryValue).toBe(secondaryValue);
      }
    }
  );

  it('Drawing a card removes it from the deck', () => {
    const deck = new Deck();
    const card = deck.draw();

    expect(card).not.toBe(null);
    expect(deck.getCards().length).toBe(FULL_DECK_CARD_COUNT - 1);
    expect(deck.getCards().some((c) => deck.isThisYourCard(c, card!))).toBe(
      false
    );
  });

  it('Drawing after the last card returns null', () => {
    const deck = new Deck();

    for (let i = 0; i < FULL_DECK_CARD_COUNT; i++) {
      expect(deck.draw()).not.toBe(null);
    }

    expect(deck.draw()).toBe(null);
  });

  it('Shuffling changes the order of the cards', () => {
    const deck = new Deck();
    const cards = toStrings(deck.getCards());

    deck.shuffle();

    expect(toStrings(deck.getCards())).not.toEqual(cards);
  });

  it('Shuffling keeps every card in the deck', () => {
    const deck = new Deck(2);
    const cards = toStrings(deck.getCards()).sort();

    deck.shuffle();

    expect(toStrings(deck.getCards()).sort()).toEqual(cards);
  });

  it('Shuffling puts drawn cards back into the deck', () => {
    const deck = new Deck(2);

    deck.draw();
    deck.draw();
    deck.draw();

    expect(deck.getCards().length).toBe(FULL_DECK_CARD_COUNT * 2 - 3);

    deck.shuffle();

    expect(deck.getCards().length).toBe(FULL_DECK_CARD_COUNT * 2);
  });

  it('isThisYourCard returns true when the cards are the same', () => {
    const deck = new Deck();
    const cards = deck.getCards();

    expect(deck.isThisYourCard(cards[0], cards[0])).toBe(true);
  });

  it('isThisYourCard returns false when the cards are different', () => {
    const deck = new Deck();
    const cards = deck.getCards();

    expect(deck.isThisYourCard(cards[0], cards[1])).toBe(false);
  });

  it('isThisYourCard works on cards that were saved and loaded back', () => {
    const deck = new Deck();
    const cards = deck.getCards();
    const restored = JSON.parse(JSON.stringify(cards));

    expect(deck.isThisYourCard(restored[0], cards[0])).toBe(true);
    expect(deck.isThisYourCard(restored[0], cards[1])).toBe(false);
  });

  it('Calling toString on a card returns the string implementation of the card', () => {
    const deck = new Deck();
    const cards = deck.getCards();

    expect(cards[0].toString()).toBe(`${cards[0].rank} of ${cards[0].suit}`);
  });
});
