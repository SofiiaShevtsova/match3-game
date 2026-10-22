import { useCallback, useState } from "react";

import { Board, Direction, Position } from "../types";
import { playMove } from "../game/play";
import { hasPossibleMoves } from "../game/moves";
import { shuffleBoard } from "../game/board";

type UseBoardGameProps = {
  board: Board;
  tileTypeCount: number;
  changePoints: (delta: number) => void;
  changeMovesLeft: () => void;
};

export const useBoardGame = ({
  board,
  tileTypeCount,
  changePoints,
  changeMovesLeft,
}: UseBoardGameProps) => {
  const [currentBoard, setCurrentBoard] = useState<Board>(
    () => board.map((column) => [...column]),
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const showBoard = useCallback(
    async ({
      newBoard,
      points,
    }: {
      newBoard: Board;
      points: number;
    }): Promise<boolean> => {
      setCurrentBoard(newBoard);
      changePoints(points);

      await new Promise<void>((resolve) =>
        setTimeout(resolve, 500),
      );

      return true;
    },
    [changePoints],
  );

  const handleSwipe = useCallback(
    ({ direction, position }: {
      direction: Direction;
      position: Position;
    }) => {
      if (isAnimating) return;

      const colCount = currentBoard.length;
      const rowCount = currentBoard[0]?.length ?? 0;

      let nextTilePosition: Position;

      switch (direction) {
        case "RIGHT":
          if (position.col + 1 >= colCount) return;
          nextTilePosition = {
            row: position.row,
            col: position.col + 1,
          };
          break;

        case "LEFT":
          if (position.col - 1 < 0) return;
          nextTilePosition = {
            row: position.row,
            col: position.col - 1,
          };
          break;

        case "DOWN":
          if (position.row + 1 >= rowCount) return;
          nextTilePosition = {
            row: position.row + 1,
            col: position.col,
          };
          break;

        case "UP":
          if (position.row - 1 < 0) return;
          nextTilePosition = {
            row: position.row - 1,
            col: position.col,
          };
          break;
      }

      setIsAnimating(true);

      playMove({
        tileOne: position,
        tileTwo: nextTilePosition,
        board: currentBoard,
        tileTypeCount,
        showBoard,
      })
        .then((result) => {
          if (result.points > 0) {
            changeMovesLeft();
          }

          if (!hasPossibleMoves(result.board)) {
            const shuffledBoard = shuffleBoard({
              board: result.board,
              tileTypeCount,
            });

            setCurrentBoard(shuffledBoard);
          }
        })
        .catch((error) => {
          console.error("Помилка виконання ходу:", error);
        })
        .finally(() => {
          setIsAnimating(false);
        });
    },
    [
      isAnimating,
      currentBoard,
      tileTypeCount,
      showBoard,
      changeMovesLeft,
    ],
  );

  return {
    currentBoard,
    isAnimating,
    handleSwipe,
  };
};