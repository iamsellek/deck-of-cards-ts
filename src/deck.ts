import { PlayingCard } from './card';
import {
  ALL_RANKS,
  ALL_SUITS,
  MAX_NUMBER_OF_FULL_DECKS,
  RANK_TO_VALUE,
} from './constants';
import { Card, CardData } from './types';

class Deck {
  private cards: Card[] = [];
  private numberOfFullDecks: number;

  constructor(numberOfFullDecks: number = 1) {
    if (
      !Number.isInteger(numberOfFullDecks) ||
      numberOfFullDecks < 0 ||
      numberOfFullDecks > MAX_NUMBER_OF_FULL_DECKS
    ) {
      const received = `${String(numberOfFullDecks)} (${typeof numberOfFullDecks})`;

      throw new RangeError(
        `numberOfFullDecks must be an integer from 0 to ${MAX_NUMBER_OF_FULL_DECKS}, received ${received}`
      );
    }

    this.numberOfFullDecks = numberOfFullDecks;
    this.shuffle();
  }

  private resetDeck(): void {
    this.cards = [];

    for (let i = 0; i < this.numberOfFullDecks; i++) {
      this.cards.push(...this.getFullDeck());
    }
  }

  private getFullDeck(): Card[] {
    const cards: Card[] = [];

    for (let suit of ALL_SUITS) {
      for (let rank of ALL_RANKS) {
        const value = RANK_TO_VALUE[rank];

        // Array.isArray doesn't narrow readonly arrays, so check for the number.
        cards.push(
          new PlayingCard({
            suit,
            rank,
            value: typeof value === 'number' ? value : value[0],
            secondaryValue: typeof value === 'number' ? null : value[1],
          })
        );
      }
    }

    return cards;
  }

  getCards(): Card[] {
    return [...this.cards];
  }

  shuffle(): void {
    this.resetDeck();

    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(): Card | null {
    return this.cards.pop() ?? null;
  }

  isThisYourCard(cardOne: CardData, cardTwo: CardData): boolean {
    return cardOne.rank === cardTwo.rank && cardOne.suit === cardTwo.suit;
  }
}

export default Deck;
