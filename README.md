# deck-of-cards-ts

Lightweight TypeScript library for creating and working with one or more standard 52‑card decks.

I couldn't find a simple, well-typed deck of cards library, so I made one. You're welcome.

## Installation

```bash
npm install deck-of-cards-ts
```

## Quick Start

```ts
import Deck, { Card } from 'deck-of-cards-ts';

const deck = new Deck(); // single 52 card deck (auto-shuffled)

const card: Card | null = deck.draw();

if (card) {
  console.log(card.toString()); // e.g. "K of hearts"
  console.log(card.value); // numeric value (A defaults to 14)
  console.log(card.secondaryValue); // for A: 1, else null
}
```

## Multiple Decks

```ts
const shoe = new Deck(6); // 6 combined shuffled decks (312 cards)

console.log(shoe.getCards().length); // 312
```

## API

### Class: Deck

`new Deck(numberOfFullDecks = 1)`

- `numberOfFullDecks` (optional) how many 52‑card sets to include

Methods:

- `getCards(): Card[]` (returns a shallow copy of current remaining cards)
- `shuffle(): void` (rebuilds and reshuffles all cards; resets state)
- `draw(): Card | null` (removes and returns the top card or null if empty)
- `isThisYourCard(a: Card, b: Card): boolean` (rank & suit equality)

### Type: Card

```ts
interface Card {
  suit: 'hearts' | 'diamonds' | 'spades' | 'clubs';
  rank:
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
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14; // A -> 14 primary
  secondaryValue:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | null; // A -> 1
  toString(): `${Rank} of ${Suit}`;
}
```

### Constants

- `FULL_DECK_CARD_COUNT = 52`
- `ALL_RANKS`
- `ALL_SUITS`
- `SUIT_TO_COLOR`
- `RANK_TO_VALUE` (A represented as `[14,1]` for dual value games)

## Deterministic Testing / Shuffling

The current `shuffle()` uses `Math.random()` Fisher–Yates. For deterministic outcomes in your app or tests, set a seeded RNG globally before constructing a deck or fork the class to inject an RNG.

## License

MIT © Chris Sellek
