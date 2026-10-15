# deck-of-cards-ts

Lightweight TypeScript library for creating and working with one or more standard 52‑card decks.

I couldn't find a simple, well-typed deck of cards library, so I made one. You're welcome.

## Installation

```bash
npm install deck-of-cards-ts
```

## Quick Start

```ts
import { Deck, type Card } from 'deck-of-cards-ts';

const deck = new Deck(); // single 52 card deck (auto-shuffled)

const card: Card | null = deck.draw();

if (card) {
  console.log(card.toString()); // e.g. "K of hearts"
  console.log(card.value); // numeric value (A defaults to 14)
  console.log(card.secondaryValue); // for A: 1, else null
}
```

Use the named `Deck` export. It works in bundlers, TypeScript, native Node ESM (`import { Deck } from 'deck-of-cards-ts'`) and CommonJS (`const { Deck } = require('deck-of-cards-ts')`). The default export is still there for existing code, but from native Node ESM (and TypeScript projects that use it) `import Deck from 'deck-of-cards-ts'` doesn't give you the class.

## Multiple Decks

```ts
const shoe = new Deck(6); // 6 combined shuffled decks (312 cards)

console.log(shoe.getCards().length); // 312
```

## API

### Class: Deck

`new Deck(numberOfFullDecks = 1)`

- `numberOfFullDecks` (optional) how many 52‑card sets to include. Must be an integer from 0 to 1000 (`MAX_NUMBER_OF_FULL_DECKS`), otherwise a `RangeError` is thrown. `0` gives an empty deck, and the cap keeps a bad value (say, unchecked user input) from exhausting memory

Methods:

- `getCards(): Card[]` (returns a shallow copy of current remaining cards)
- `shuffle(): void` (rebuilds and reshuffles all cards; resets state)
- `draw(): Card | null` (removes and returns the top card or null if empty)
- `isThisYourCard(a: CardData, b: CardData): boolean` (rank & suit equality; works on cards that were saved and loaded back, too)

### Function: cardToString

`cardToString(card: { rank, suit }): CardAsString` returns e.g. `"K of hearts"`. It works on any object with a `rank` and a `suit`, including cards that came back from `JSON.parse`.

### Type: Card

```ts
interface CardData {
  readonly suit: Suit; // 'hearts' | 'diamonds' | 'spades' | 'clubs'
  readonly rank: Rank; // '2' to '10', 'J', 'Q', 'K', 'A'
  readonly value: Value; // 1 to 14 (A -> 14 primary)
  readonly secondaryValue: Value | null; // A -> 1, else null
}

interface Card extends CardData {
  toString(): CardAsString; // `${Rank} of ${Suit}`, e.g. "K of hearts"
}
```

The `Suit`, `Rank`, `Value` and `CardAsString` types are exported too.

Cards are frozen, plain data: `toString()` lives on a shared prototype instead of on each card, so a card is only its four fields. That means you can `JSON.stringify` it, `structuredClone` it or `postMessage` it. What comes back is a `CardData` (a plain object with no `toString()`), so use `cardToString(card)` to print it.

### Constants

- `FULL_DECK_CARD_COUNT = 52`
- `MAX_NUMBER_OF_FULL_DECKS = 1000`
- `ALL_RANKS`
- `ALL_SUITS`
- `SUIT_TO_COLOR`
- `RANK_TO_VALUE` (A represented as `[14,1]` for dual value games)

`ALL_RANKS`, `ALL_SUITS`, `SUIT_TO_COLOR` and `RANK_TO_VALUE` are read-only: they're typed `readonly` and frozen at runtime, so they can't be changed out from under a `Deck`.

## Deterministic Testing / Shuffling

The current `shuffle()` uses `Math.random()` Fisher–Yates. For deterministic outcomes in your app or tests, set a seeded RNG globally before constructing a deck or fork the class to inject an RNG.

## License

MIT © Chris Sellek
