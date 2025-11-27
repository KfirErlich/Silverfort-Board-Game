

import type { Shape, BackgroundColor, CellData } from "../interfaces/GameBoardTypes";
import { SHAPES, BACKGROUND_COLORS, BOARD_ROWS, BOARD_COLS } from "../config/constants"; 

function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function isSafe(
    board: (CellData | null)[][], 
    row: number,
    col: number,
    proposedShape: Shape,
    proposedColor: BackgroundColor
): boolean {
    const neighbors = [
        { r: row - 1, c: col }, 
        { r: row, c: col - 1 }, 
    ];

    for (const neighbor of neighbors) {
        const nr = neighbor.r;
        const nc = neighbor.c;
        
        if (nr >= 0 && nr < BOARD_ROWS && nc >= 0 && nc < BOARD_COLS) {
            const neighborCell = board[nr][nc];
            
            if (neighborCell) { 
                if (
                    neighborCell.shape === proposedShape ||
                    neighborCell.backgroundColor === proposedColor
                ) {
                    return false;
                }
            }
        }
    }

    return true;
}


export function solveBoard(board: (CellData | null)[][], row: number, col: number): boolean {
    if (row === BOARD_ROWS) {
        return true;
    }

    let nextCol = col + 1;
    let nextRow = row;
    if (nextCol === BOARD_COLS) {
        nextCol = 0;
        nextRow = row + 1;
    }

    const availableShapes = [...SHAPES];
    const availableColors = [...BACKGROUND_COLORS];
    shuffleArray(availableShapes);
    shuffleArray(availableColors);

    for (const shape of availableShapes) {
        for (const color of availableColors) {

            if (isSafe(board, row, col, shape, color)) {

                board[row][col] = { shape, backgroundColor: color };

                if (solveBoard(board, nextRow, nextCol)) {
                    return true; 
                }

                board[row][col] = null;
            }
        }
    }

    return false;
}