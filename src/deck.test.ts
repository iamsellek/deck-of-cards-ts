import { expect } from 'vitest';
import { FULL_DECK_CARD_COUNT } from './constants';
import Deck from './deck';

describe('Deck tests', () => {
  it('Instantiates with the correct number of cards', () => {
    expect(new Deck().getCards().length).toBe(FULL_DECK_CARD_COUNT * 1);
    expect(new Deck(1).getCards().length).toBe(FULL_DECK_CARD_COUNT * 1);
    expect(new Deck(2).getCards().length).toBe(FULL_DECK_CARD_COUNT * 2);
    expect(new Deck(10).getCards().length).toBe(FULL_DECK_CARD_COUNT * 10);
  });

  it('Instantiating a full deck does not repeat cards', () => {
    const deck = new Deck();
    const cards = deck.getCards();
    const uniqueCards = new Set(cards);

    expect(uniqueCards.size).toBe(FULL_DECK_CARD_COUNT);
  });

  it('Drawing a card removes it from the deck', () => {
    const deck = new Deck();
    const card = deck.draw();

    expect(card).not.toBe(null);
    expect(
      deck.getCards().some((c) => {
        if (deck.isThisYourCard(c, card!)) {
          console.log(c);
          console.log(card);
        }

        return deck.isThisYourCard(c, card!);
      })
    ).toBe(false);
  });

  it('Drawing after the last card returns null', () => {
    const deck = new Deck(0);
    const card = deck.draw();

    expect(card).toBe(null);
  });

  it('Shuffling changes the order of the cards', () => {
    const deck = new Deck();
    const cards = deck.getCards();

    deck.shuffle();

    const cardsCopy = deck.getCards();

    expect(cards).not.toEqual(cardsCopy);
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

  it('Calling toString on a card returns the string implementation of the card', () => {
    const deck = new Deck();
    const cards = deck.getCards();

    expect(cards[0].toString()).toBe(`${cards[0].rank} of ${cards[0].suit}`);
  });
});
