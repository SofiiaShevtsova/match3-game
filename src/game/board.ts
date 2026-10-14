import { Board, Tile } from "./types";
import { createTile } from "../utils/createTile";
import { findMatches } from "./matches";
import { hasPossibleMoves } from "./moves";

export const createBoard = ({
  tileTypeCount,
  rowsCount,
  colCount,
}: {
  tileTypeCount: number;
  rowsCount: number;
  colCount: number;
}): Board => {
  if (tileTypeCount < 3 || tileTypeCount > 5) {
    throw new Error("tileTypeCount must be at least 3 and max 5");
  }

  const colArray: null[] = Array(rowsCount).fill(null);
  const checkRow = Array.from({ length: rowsCount }, () => [10]);

  const board: Board = Array.from({ length: colCount }, () => {
    const checkCol = [10];

    return colArray.map((_, i) => {
      let randomTile = Math.floor(Math.random() * tileTypeCount);
      if (
        checkCol.slice(-2).every((item) => item === randomTile) ||
        checkRow[i].slice(-2).every((item) => item === randomTile)
      ) {
        while (
          randomTile === checkCol.at(-1) ||
          randomTile === checkRow[i].at(-1)
        ) {
          randomTile = Math.floor(Math.random() * tileTypeCount);
        }
      }

      checkCol.push(randomTile);
      checkRow[i].push(randomTile);
      return createTile(randomTile);
    });
  });
  return board;
};

export const shuffleBoard = ({
  board,
  tileTypeCount,
}: {
  board: Board;
  tileTypeCount: number;
}): Board => {
  const currentBoard = board.map((col) => [...col]);
  const openedBoard = currentBoard.flat();
  const maxAttempts = 500;
  let attempts = 0;

  while (attempts < maxAttempts) {
    attempts = attempts + 1;

    for (let i = openedBoard.length - 1; i > 0; i--) {
      const randomTile = Math.floor(Math.random() * (i + 1));

      const currentTile = openedBoard[i];

      openedBoard[i] = openedBoard[randomTile];
      openedBoard[randomTile] = currentTile;
    }

    const newBoard = openedBoard.reduce<(Tile | null)[][]>(
      (col, tile, index) => {
        const rowIndex = Math.floor(index / board[0].length);
        col[rowIndex].push(tile);
        return col;
      },
      Array.from({ length: board.length }, () => []),
    );

    const hasMatches = findMatches(newBoard).length > 0;
    const hasMoves = hasPossibleMoves(newBoard);

    if (!hasMatches && hasMoves) {
      return newBoard;
    }
  }

  const rowsCount = currentBoard[0].length;
  const colCount = currentBoard.length;

  const createdNewBoard = createBoard({ tileTypeCount, colCount, rowsCount });

  return createdNewBoard;
};
