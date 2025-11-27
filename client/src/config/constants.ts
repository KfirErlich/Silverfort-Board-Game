import type { Shape, BackgroundColor } from "../interfaces/GameBoardTypes";

export const BOARD_ROWS = 3;
export const BOARD_COLS = 6;

export const SHAPES: Shape[] = ["Triangle", "Square", "Diamond", "Circle"];

export const BACKGROUND_COLORS: BackgroundColor[] = ["Red", "Green", "Blue", "Yellow"];

// Color mapping for Tailwind CSS classes
export const COLOR_CLASSES: Record<BackgroundColor, string> = {
  Red: "bg-red-500",
  Green: "bg-green-500",
  Blue: "bg-blue-500",
  Yellow: "bg-yellow-500",
};

