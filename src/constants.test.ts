import { expect } from 'vitest';
import {
  ALL_RANKS,
  ALL_SUITS,
  FULL_DECK_CARD_COUNT,
  MAX_NUMBER_OF_FULL_DECKS,
  RANK_TO_VALUE,
  SUIT_TO_COLOR,
} from './constants';
import Deck from './deck';

describe('Constants tests', () => {
  it('The maximum number of full decks is 1000', () => {
    expect(MAX_NUMBER_OF_FULL_DECKS).toBe(1000);
  });

  it('The exported constants are frozen', () => {
    expect(Object.isFrozen(ALL_RANKS)).toBe(true);
    expect(Object.isFrozen(ALL_SUITS)).toBe(true);
    expect(Object.isFrozen(SUIT_TO_COLOR)).toBe(true);
    expect(Object.isFrozen(RANK_TO_VALUE)).toBe(true);
    expect(Object.isFrozen(RANK_TO_VALUE.A)).toBe(true);
  });

  it('RANK_TO_VALUE keeps the literal type of every value', () => {
    // These only compile while RANK_TO_VALUE is a const-asserted object.
    const king: 13 = RANK_TO_VALUE.K;
    const ace: readonly [14, 1] = RANK_TO_VALUE.A;

    expect(king).toBe(13);
    expect(ace).toEqual([14, 1]);
  });

  it('Mutating the exported constants throws and does not change new decks', () => {
    // @ts-expect-error The constants are readonly.
    expect(() => ALL_SUITS.pop()).toThrow(TypeError);
    // @ts-expect-error The constants are readonly.
    expect(() => ALL_RANKS.push('A')).toThrow(TypeError);
    expect(() => {
      // @ts-expect-error The constants are readonly.
      SUIT_TO_COLOR.hearts = 'black';
    }).toThrow(TypeError);
    expect(() => {
      // @ts-expect-error The constants are readonly.
      RANK_TO_VALUE.A = 11;
    }).toThrow(TypeError);

    expect(new Deck().getCards().length).toBe(FULL_DECK_CARD_COUNT);
  });
});
