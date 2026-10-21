import React, { FC, useState } from "react";
import { View } from "react-native";

import { Board } from "../game/types";
import { styles } from "../styles/styles";
import { Direction, Tile } from "./Tile";

type BoardCardProps = {
  board: Board;
  tileSize: number;
};

export const BoardCard: FC<BoardCardProps> = ({ board, tileSize }) => {
  const [currentBoard, setCurrentBoard] = useState(board);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwipe = ({
    direction,
    position,
  }: {
    direction: Direction;
    position: { row: number; col: number };
  }) => {
    if (isAnimating) return;

    // TODO: додай логіку переміщення плиток
    console.log("Swipe:", direction, position);
  };

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
                position={{ row: rowInd, col: colIndex }}
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
