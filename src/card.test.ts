import { expect } from 'vitest';
import { cardToString } from './card';
import Deck from './deck';
import { CardData } from './types';

describe('Card tests', () => {
  it('cardToString names a card by its rank and suit', () => {
    expect(cardToString({ rank: 'K', suit: 'hearts' })).toBe('K of hearts');
    expect(cardToString({ rank: '10', suit: 'spades' })).toBe('10 of spades');
  });

  it('Calling toString on a card gives the same name as cardToString', () => {
    for (const card of new Deck().getCards()) {
      expect(card.toString()).toBe(cardToString(card));
      expect(`${card}`).toBe(cardToString(card));
    }
  });

  it('A card is only its four fields', () => {
    const card = new Deck().getCards()[0];

    expect(Object.keys(card)).toEqual([
      'suit',
      'rank',
      'value',
      'secondaryValue',
    ]);
  });

  it('Cards survive JSON and structuredClone as plain data', () => {
    const card = new Deck().getCards()[0];
    const data: CardData = {
      suit: card.suit,
      rank: card.rank,
      value: card.value,
      secondaryValue: card.secondaryValue,
    };

    expect(JSON.parse(JSON.stringify(card))).toEqual(data);
    expect(structuredClone(card)).toEqual(data);
  });

  it('cardToString names cards that came back from JSON', () => {
    const cards = new Deck().getCards();
    const restored: CardData[] = JSON.parse(JSON.stringify(cards));

    expect(restored.map(cardToString)).toEqual(
      cards.map((card) => card.toString())
    );
  });

  it('Cards are frozen, whether they come from getCards or draw', () => {
    const deck = new Deck();
    const card = deck.getCards()[0];

    expect(Object.isFrozen(card)).toBe(true);
    expect(Object.isFrozen(deck.draw())).toBe(true);
    expect(() => {
      // @ts-expect-error Card fields are readonly.
      card.rank = 'A';
    }).toThrow(TypeError);
    expect(() => {
      // @ts-expect-error Card fields are readonly.
      card.value = 2;
    }).toThrow(TypeError);
  });
});
