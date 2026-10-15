import { expect } from 'vitest';
import Deck from './deck';
import DefaultExportedDeck, {
  Deck as NamedExportedDeck,
  cardToString,
} from './index';

describe('Package exports tests', () => {
  it('Exports the Deck class as both a named and a default export', () => {
    expect(NamedExportedDeck).toBe(Deck);
    expect(DefaultExportedDeck).toBe(Deck);
  });

  it('Exports cardToString', () => {
    expect(cardToString({ rank: 'A', suit: 'spades' })).toBe('A of spades');
  });
});
