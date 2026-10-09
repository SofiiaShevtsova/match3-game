import { Board, Position } from "./types";

export const findMatches = (board: Board): Position[] => {
  const positionArray: string[] = [];
  board.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      if (!tile?.type) {
        return;
      }
      if (
        board[rowIndex][colIndex + 1] &&
        board[rowIndex][colIndex + 2] &&
        [board[rowIndex][colIndex + 1], board[rowIndex][colIndex + 2]].every(
          (item) => item?.type === tile.type,
        )
      ) {
        positionArray.push(
          `${rowIndex}-${colIndex}`,
          `${rowIndex}-${colIndex + 1}`,
          `${rowIndex}-${colIndex + 2}`,
        );
      }

      if (
        board[rowIndex + 1] &&
        board[rowIndex + 2] &&
        [board[rowIndex + 1][colIndex], board[rowIndex + 2][colIndex]].every(
          (item) => item?.type === tile.type,
        )
      ) {
        positionArray.push(
          `${rowIndex}-${colIndex}`,
          `${rowIndex + 1}-${colIndex}`,
          `${rowIndex + 2}-${colIndex}`,
        );
      }
    });
  });

  const positions = Array.from(new Set(positionArray)).map((position) => ({
    row: Number(position.split("-")[0]),
    col: Number(position.split("-")[1]),
  }));
  return positions;
};
