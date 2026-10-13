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
