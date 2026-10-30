import React, { FC, useEffect } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  BounceOut,
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Direction, TileType } from "../types";
import { styles } from "../styles/styles";

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

export const Tile: FC<TileProps> = ({
  position,
  type,
  size,
  id,
  handleSwipe,
}) => {
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

  const x = useSharedValue(size * position.col);
  const y = useSharedValue(size * position.row);

  useEffect(() => {
    x.value = withTiming(size * position.col, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });

    y.value = withTiming(size * position.row, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });
  }, [position.row, position.col, size]);

  const animatedPosition = useAnimatedStyle(() => ({
    left: x.value,
    top: y.value,
  }));

  return (
    <GestureDetector key={id} gesture={panGesture}>
      <Animated.View
        key={id}
        style={[
          styles.tile,
          {
            height: size,
            width: size,
          },
          animatedPosition,
        ]}
        exiting={BounceOut.duration(150)}
      >
        <TileView type={type} size={size} />
      </Animated.View>
    </GestureDetector>
  );
};
