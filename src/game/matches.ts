import { Board, Position } from "./types";

export const findMatches = (board: Board): Position[] => {
  const positionArray: string[] = [];
  board.forEach((col, colInd) => {
    col.forEach((tile, rowInd) => {
      if (!tile?.type) {
        return;
      }
      if (
        board[colInd][rowInd + 1] &&
        board[colInd][rowInd + 2] &&
        [board[colInd][rowInd + 1], board[colInd][rowInd + 2]].every(
          (item) => item?.type === tile.type,
        )
      ) {
        positionArray.push(
          `${colInd}-${rowInd}`,
          `${colInd}-${rowInd + 1}`,
          `${colInd}-${rowInd + 2}`,
        );
      }

      if (
        board[colInd + 1] &&
        board[colInd + 2] &&
        [board[colInd + 1][rowInd], board[colInd + 2][rowInd]].every(
          (item) => item?.type === tile.type,
        )
      ) {
        positionArray.push(
          `${colInd}-${rowInd}`,
          `${colInd + 1}-${rowInd}`,
          `${colInd + 2}-${rowInd}`,
        );
      }
    });
  });

  const positions = Array.from(new Set(positionArray)).map((position) => ({
    row: Number(position.split("-")[1]),
    col: Number(position.split("-")[0]),
  }));
  return positions;
};
