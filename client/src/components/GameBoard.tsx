import { useState, useEffect, useCallback } from "react";
import type { CellData } from "../interfaces/GameBoardTypes";
import { BOARD_ROWS, BOARD_COLS } from "../config/constants";
import { getNextValidCellData, solveBoard } from "../utils/randomHelper"; 
import { BoardCell } from "./BoardCell";


export function GameBoard() {
  const [cells, setCells] = useState<CellData[][]>([]);
  const handleCellClick = useCallback((rowIndex: number, colIndex: number) => {
    
    setCells(prevCells => {
      const newCells = prevCells.map(rowArr => [...rowArr]) as CellData[][];
      
      const nextCellData = getNextValidCellData(newCells, rowIndex, colIndex);
      
      if (nextCellData) {
        newCells[rowIndex][colIndex] = nextCellData;
      } else {
        console.warn(`Could not find a new valid move for cell (${rowIndex}, ${colIndex}).`);
      }
      return newCells;
    });

  }, []);

  useEffect(() => {
    const initializeBoard = (): CellData[][] => {
      const initialCells: (CellData | null)[][] = Array.from({ length: BOARD_ROWS }, () =>
        Array(BOARD_COLS).fill(null)
      );
      

      if (solveBoard(initialCells, 0, 0)) {
        return initialCells as CellData[][];
      } else {
        console.error("Failed to generate a valid board.");
        return []; 
      }
    };

    const board = initializeBoard();
    setCells(board);
  }, []);

  if (cells.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[50vw] h-[50vh] grid gap-0" 
         style={{ gridTemplateColumns: `repeat(${BOARD_COLS}, 1fr)`, gridTemplateRows: `repeat(${BOARD_ROWS}, 1fr)` }}>
      {cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <BoardCell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            rowIndex={rowIndex}
            colIndex={colIndex}
            onClick={handleCellClick}
          />
        ))
      )}
    </div>
  );
}