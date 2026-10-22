import React, { FC } from "react";
import { View } from "react-native";

import { Board } from "../types";
import { styles } from "../styles/styles";
import { Tile } from "./Tile";
import { useBoardGame } from "../hooks/useBoardGame";

type BoardCardProps = {
  board: Board;
  tileSize: number;
  tileTypeCount: number;
  changePoints: (delta: number) => void;
  changeMovesLeft: (currentPoints: number) => void;
};

export const BoardCard: FC<BoardCardProps> = ({
  board,
  tileSize,
  tileTypeCount,
  changePoints,
  changeMovesLeft,
}) => {
  const { currentBoard, handleSwipe } = useBoardGame({
    board,
    tileTypeCount,
    changePoints,
    changeMovesLeft,
  });

  return (
    <View style={styles.boardCard}>
      {currentBoard.map((column, colIndex) => (
        <View key={colIndex}>
          {column.map((tile, rowInd) =>
            tile ? (
              <Tile
                key={tile.id}
                id={tile.id.toString()}
                type={tile.type}
                size={tileSize}
                handleSwipe={handleSwipe}
                position={{
                  row: rowInd,
                  col: colIndex,
                }}
              />
            ) : (
              <View
                key={`empty-${rowInd}-${colIndex}`}
                style={{
                  ...styles.tile,
                  height: tileSize,
                  width: tileSize,
                }}
              />
            ),
          )}
        </View>
      ))}
    </View>
  );
};
