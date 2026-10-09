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
}) => {
  const rowArray: null[] = Array(colCount).fill(null);

  const board: Board = Array.from({ length: rowsCount }, () => {
    const checkRow = [10];

    return rowArray.map(() => {
      const randomTile = Math.floor(Math.random() * tileTypeCount);
      checkRow.push(randomTile);
      if (checkRow.slice(-3).every((i) => i === randomTile)) {
        const newTile =
          randomTile === tileTypeCount - 1 ? randomTile - 1 : randomTile + 1;
        checkRow.push(newTile);

        return createTile(newTile);
      }
      return createTile(randomTile);
    });
  });

  return board;
};
