import { ALL_RANKS, ALL_SUITS, RANK_TO_VALUE } from './constants';
import { Card } from './types';

class Deck {
  private cards: Card[] = [];
  private numberOfFullDecks: number;

  constructor(numberOfFullDecks: number = 1) {
    this.numberOfFullDecks = numberOfFullDecks;

    for (let i = 0; i < this.numberOfFullDecks; i++) {
      this.cards.push(...this.getFullDeck());
    }

    this.shuffle();
  }

  getFullDeck(): Card[] {
    const cards: Card[] = [];

    for (let suit of ALL_SUITS) {
      for (let rank of ALL_RANKS) {
        const value = RANK_TO_VALUE[rank];
        this.cards.push({
          suit,
          rank,
          value: Array.isArray(value) ? value[0] : value,
          secondaryValue: Array.isArray(value) ? value[1] : undefined,
          toString: () => `${rank} of ${suit}`,
        });
      }
    }

    return cards;
  }

  getCards(): Card[] {
    return [...this.cards];
  }

  shuffle() {
    let currentLength = this.cards.length;

    while (currentLength) {
      let i = Math.floor(Math.random() * currentLength);
      const temp = this.cards[currentLength];
      this.cards[currentLength] = this.cards[i];
      this.cards[i] = temp;

      currentLength--;
    }
  }

  draw() {
    // implement
  }
}

export default Deck;
