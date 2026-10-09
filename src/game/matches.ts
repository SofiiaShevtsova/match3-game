import { Board, Position } from "./types";

export const findMatches = (board: Board): Position[] => {
  const positionArray: string[] = [];
  board.forEach((row, ind) => {
    row.forEach((tile, i) => {
      if (!tile?.type) {
        return;
      }
      if (
        board[ind][i + 1] &&
        board[ind][i + 2] &&
        [board[ind][i + 1], board[ind][i + 2]].every(
          (item) => item?.type === tile.type,
        )
      ) {
        positionArray.push(`${ind}-${i}`, `${ind}-${i + 1}`, `${ind}-${i + 2}`);
      }
      
      if (
        board[ind + 1] &&
        board[ind + 2] &&
        [board[ind + 1][i], board[ind + 2][i]].every(
          (item) => item?.type === tile.type,
        )
      ) {
        positionArray.push(`${ind}-${i}`, `${ind + 1}-${i}`, `${ind + 2}-${i}`);
      }
    });
  });

  const positions = Array.from(new Set(positionArray)).map((position) => ({
    row: Number(position.split("-")[0]),
    col: Number(position.split("-")[1]),
  }));
  return positions;
};
