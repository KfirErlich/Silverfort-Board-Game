export type Shape = "Triangle" | "Square" | "Diamond" | "Circle";

export type BackgroundColor = "Red" | "Green" | "Blue" | "Yellow";

export interface CellData {
  shape: Shape;
  backgroundColor: BackgroundColor;
}

export interface BoardCellProps {
  cell: CellData;
  rowIndex: number;
  colIndex: number;
  onClick: (row: number, col: number) => void;
  isCooldown: boolean;
  cooldownTurns: number
}

