# Shape and Color Matching Board Game

A tiny puzzle built around a single rule: every cell on the board must differ
in both shape **and** color from its neighbors. You cycle through the available
options to keep the board compliant for as long as possible.

The Goal is to get the highest score!

## Core Gameplay

- **Dynamic Board Creation**  
  The board is initialized via a backtracking algorithm so every starting state
  is legal and solvable.
- **Interactive Cells**  
  Clicking a cell advances it to the next valid shape/color combination.
  If no valid move exists, the game is over.
- **Scoring**  
  Each successful change adds 1 point.

## Turn-Based Cooldown System

- Each clicked cell goes on cooldown for 3 turns to discourage spamming.
- Any other legal click decrements all active cooldown counters by one.
- Cooldowns live inside the `GameBoard` state and are updated atomically inside
  `handleCellClick`, ensuring React state stays in sync.
- `BoardCell` renders a small visual counter so players can plan around the
  frozen cells.

## Future Work

Multiplayer matchmaking, turn sync, and shared scoring were scoped but not yet
implemented.