import { findMatches } from "./matches";
import { Board, Position } from "./types";

// isValidMove({ board, tileOne, tileTwo }): boolean
// чому не перевірити поле функцією findMatches

export const swapTiles = ({
  board,
  tileOne,
  tileTwo,
}: {
  board: Board;
  tileOne: Position;
  tileTwo: Position;
}): Board => {
  const newBoard = board.map((row) => [...row]);
  newBoard[tileOne.row][tileOne.col] = board[tileTwo.row][tileTwo.col];
  newBoard[tileTwo.row][tileTwo.col] = board[tileOne.row][tileOne.col];

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
