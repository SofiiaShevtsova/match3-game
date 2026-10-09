import { Board } from "./types";
import { createTile } from "../utils/createTile";

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

  const rowArray: null[] = Array(colCount).fill(null);
  const checkCol = Array.from({ length: colCount }, () => [10]);

  const board: Board = Array.from({ length: rowsCount }, () => {
    const checkRow = [10];

    return rowArray.map((_, i) => {
      let randomTile = Math.floor(Math.random() * tileTypeCount);
      if (
        checkRow.slice(-2).every((item) => item === randomTile) ||
        checkCol[i].slice(-2).every((item) => item === randomTile)
      ) {
        while (
          randomTile === checkRow.at(-1) ||
          randomTile === checkCol[i].at(-1)
        ) {
          randomTile = Math.floor(Math.random() * tileTypeCount);
        }
      }

      checkRow.push(randomTile);
      checkCol[i].push(randomTile);
      return createTile(randomTile);
    });
  });
  return board;
};
