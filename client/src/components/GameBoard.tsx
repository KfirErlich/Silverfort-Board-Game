
import { useState, useEffect, useCallback } from "react";
import type { CellData } from "../interfaces/GameBoardTypes";
import { BOARD_ROWS, BOARD_COLS } from "../config/constants"; 
import { getNextValidCellData, solveBoard } from "../utils/randomHelper"; 
import { BoardCell } from "./BoardCell";
import { GameOver } from "./GameOver";


export function GameBoard() {
  const [cells, setCells] = useState<CellData[][]>([]);
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  
  
  const applyMoveEffects = useCallback((key: string) => {
    setCooldowns(prevCooldowns => {
      const updatedCooldowns: Record<string, number> = {};

      for (const cooldownKey in prevCooldowns) {
        const remainingTurns = prevCooldowns[cooldownKey] - 1;
        if (remainingTurns > 0) {
          updatedCooldowns[cooldownKey] = remainingTurns;
        }
      }

      updatedCooldowns[key] = 3;
      return updatedCooldowns;
    });

    setScore(prev => prev + 1);
  }, []);

  const handleCellClick = useCallback((rowIndex: number, colIndex: number) => {
    const key = `${rowIndex}-${colIndex}`;

    if (cooldowns[key] && cooldowns[key] > 0) {
        return; 
    }

    const newCells = cells.map(rowArr => [...rowArr]) as CellData[][];
    const nextCellData = getNextValidCellData(newCells, rowIndex, colIndex);

    if (nextCellData) {
      newCells[rowIndex][colIndex] = nextCellData;
      setCells(newCells);
      applyMoveEffects(key);
    } else {
      setIsGameOver(true);
    }

  }, [cells, cooldowns, applyMoveEffects]);


  const initializeBoard = useCallback((): CellData[][] => {
    const initialCells: (CellData | null)[][] = Array.from({ length: BOARD_ROWS }, () =>
      Array(BOARD_COLS).fill(null)
    );
    if (solveBoard(initialCells, 0, 0)) {
      return initialCells as CellData[][];
    } else {
      console.error("Failed to generate a valid board.");
      return []; 
    }
  }, []);

  useEffect(() => {
    const board = initializeBoard();
    setCells(board);
    setIsGameOver(false);
    setCooldowns({});
    setScore(0);
  }, [initializeBoard]);

  const handleRestart = useCallback(() => {
    const board = initializeBoard();
    setCells(board);
    setIsGameOver(false);
    setCooldowns({});
    setScore(0);
  }, [initializeBoard]);


  if (cells.length === 0 && !isGameOver) {
    return <div>Loading...</div>;
  }

  if (isGameOver) {
    return <GameOver score={score} onRestart={handleRestart} />;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-semibold text-gray-800">
        Score: {score}
      </div>
      <div
        className="w-[50vw] h-[50vh] grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${BOARD_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_ROWS}, 1fr)`
        }}
      >
        {cells.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const remainingTurns = cooldowns[key] || 0;

            return (
              <BoardCell
                key={key}
                cell={cell}
                rowIndex={rowIndex}
                colIndex={colIndex}
                onClick={handleCellClick}
                isCooldown={remainingTurns > 0}
                cooldownTurns={remainingTurns}
              />
            );
          })
        )}
      </div>
    </div>
  );
}