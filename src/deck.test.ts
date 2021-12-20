import { FULL_DECK_CARD_COUNT } from './constants';
import Deck from './deck';

describe('Deck tests', () => {
  test('Instantiates with the correct number of cards', () => {
    expect(new Deck(1).getCards().length).toBe(FULL_DECK_CARD_COUNT * 1);
    expect(new Deck(2).getCards().length).toBe(FULL_DECK_CARD_COUNT * 2);
    expect(new Deck(10).getCards().length).toBe(FULL_DECK_CARD_COUNT * 10);
  });
});
