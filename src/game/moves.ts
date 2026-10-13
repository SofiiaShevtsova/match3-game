import { createTile } from "../utils/createTile";
import { findMatches } from "./matches";
import { Board, Position, Tile } from "./types";

export const swapTiles = ({
  board,
  tileOne,
  tileTwo,
}: {
  board: Board;
  tileOne: Position;
  tileTwo: Position;
}): Board => {
  const newBoard = board.map((col) => [...col]);
  newBoard[tileOne.col][tileOne.row] = board[tileTwo.col][tileTwo.row];
  newBoard[tileTwo.col][tileTwo.row] = board[tileOne.col][tileOne.row];

  return newBoard;
};

export const tryMove = ({
  board,
  tileOne,
  tileTwo,
}: {
  board: Board;
  tileOne: Position;
  tileTwo: Position;
}): Board | null => {
  const isNeighbor =
    ((tileOne.row + 1 === tileTwo.row || tileOne.row - 1 === tileTwo.row) &&
      tileOne.col === tileTwo.col) ||
    ((tileOne.col + 1 === tileTwo.col || tileOne.col - 1 === tileTwo.col) &&
      tileOne.row === tileTwo.row);

  if (!isNeighbor) {
    return null;
  }
  const newBoard = swapTiles({ board, tileOne, tileTwo });

  const hasMatches = !!findMatches(newBoard).length;

  return hasMatches ? newBoard : null;
};

export const removeMatches = ({
  board,
  positions,
}: {
  board: Board;
  positions: Position[];
}): Board => {
  const newBoard = board.map((col) => [...col]);
  positions.forEach((position) => {
    newBoard[position.col][position.row] = null;
  });

  return newBoard;
};

export const applyGravity = ({
  board,
  tileTypeCount,
}: {
  board: Board;
  tileTypeCount: number;
}): Board => {
  const currentBoard = board.map((col) => [...col.filter((tile) => !!tile)]);
  const rowsCount = board[0].length;

  const newBoard = currentBoard.map((col) => [
    ...Array.from({ length: rowsCount - col.length }, () => {
      const randomTile = Math.floor(Math.random() * tileTypeCount);
      return createTile(randomTile);
    }),
    ...col,
  ]);
  return newBoard;
};
