import React, { FC, useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Board, TileType } from "../game/types";
import { styles } from "../styles/styles";

type Direction = "RIGHT" | "LEFT" | "DOWN" | "UP";

type BoardCardProps = {
  board: Board;
  tileSize: number;
};

type TileProps = {
  position: { row: number; col: number };
  type: TileType;
  size: number;
  id: string;
  handleSwipe: ({
    direction,
    position,
  }: {
    direction: Direction;
    position: { row: number; col: number };
  }) => void;
};

type TileViewProps = {
  type: TileType;
  size: number;
};

const TileView: FC<TileViewProps> = ({ type, size }) => {
  switch (type) {
    case "circle":
      return <View style={styles.circleTile} />;

    case "square":
      return <View style={styles.squareTile} />;

    case "triangle":
      return <Ionicons name="triangle" size={size} color="#9b59b6" />;

    case "diamond":
      return <Ionicons name="diamond" size={size} color="#3498db" />;

    default:
      return <Ionicons name="heart" size={size} color="#e74c3c" />;
  }
};

const Tile: FC<TileProps> = ({ position, type, size, id, handleSwipe }) => {
  const panGesture = Gesture.Pan().onEnd((event) => {
    const { translationX, translationY } = event;
    const threshold = 20;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > threshold) {
        runOnJS(handleSwipe)({ direction: "RIGHT", position });
      } else if (translationX < -threshold) {
        runOnJS(handleSwipe)({ direction: "LEFT", position });
      }
    } else {
      if (translationY > threshold) {
        runOnJS(handleSwipe)({ direction: "DOWN", position });
      } else if (translationY < -threshold) {
        runOnJS(handleSwipe)({ direction: "UP", position });
      }
    }
  });

  return (
    <GestureDetector key={id} gesture={panGesture}>
      <View
        key={id}
        style={{
          ...styles.tile,
          height: size,
          width: size,
        }}
      >
        <TileView type={type} size={size} />
      </View>
    </GestureDetector>
  );
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
