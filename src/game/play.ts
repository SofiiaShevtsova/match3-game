import { findMatches } from "./matches";
import { applyGravity, removeMatches, tryMove } from "./moves";
import { Board, Position, Result } from "../types";

export const playMove = async ({
  board,
  tileOne,
  tileTwo,
  tileTypeCount,
  showBoard,
}: {
  board: Board;
  tileOne: Position;
  tileTwo: Position;
  tileTypeCount: number;
  showBoard: ({
    newBoard,
    points,
  }: {
    newBoard: Board;
    points: number;
  }) => Promise<boolean>;
}): Promise<Result> => {
  let points = 0;
  let currentBoard = tryMove({ board, tileOne, tileTwo });

  if (!currentBoard) {
    return { points, board };
  }
  let positionsForRemove = findMatches(currentBoard);
  await showBoard({
    newBoard: currentBoard,
    points: positionsForRemove.length,
  });
  while (positionsForRemove.length > 0) {
    points += positionsForRemove.length;

    const boardWithEmptyTile = removeMatches({
      board: currentBoard,
      positions: positionsForRemove,
    });

    currentBoard = applyGravity({
      board: boardWithEmptyTile,
      tileTypeCount,
    });

    positionsForRemove = findMatches(currentBoard);
    await showBoard({
      newBoard: currentBoard,
      points: positionsForRemove.length,
    });
  }

  return { points, board: currentBoard };
};
