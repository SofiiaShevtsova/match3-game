import { findMatches } from "./matches";
import { applyGravity, removeMatches, tryMove } from "./moves";
import { Board, Position, Result } from "./types";

export const playMove = ({
    board,
    tileOne,
    tileTwo,
    tileTypeCount,
}: {
    board: Board;
    tileOne: Position;
    tileTwo: Position;
    tileTypeCount: number;
}): Result => {
    let points = 0;
    let currentBoard = tryMove({ board, tileOne, tileTwo });

    if (!currentBoard) {
        return { points };
    }

    let positionsForRemove = findMatches(currentBoard);

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
    }

    return { points };
};
