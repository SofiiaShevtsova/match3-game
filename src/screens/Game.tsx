import React, { FC, useMemo, useState } from "react";
import { View, Text, ImageBackground, useWindowDimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { RootStackParamList } from "../../App";
import { styles } from "../styles/styles";
import { levels } from "../levels/levels";
import { createBoard } from "../game/board";
import { BoardCard } from "../components/BoardCard";

type GameProps = NativeStackScreenProps<RootStackParamList, "Game">;

export const Game: FC<GameProps> = ({ route }) => {
  const { levelId } = route.params;
  const level = levels[levelId];
  const [points, setPoints] = useState(0);
  const [movesLeft, setMovesLeft] = useState(level?.moves || 0);

  const board = useMemo(() => {
    if (!level) {
      return null;
    }
    return createBoard({
      tileTypeCount: level.tileTypeCount,
      rowsCount: level.rowsCount,
      colCount: level.colCount,
    });
  }, [levelId]);

  const { width } = useWindowDimensions();

  const tileSize = Math.floor((width - 20) / level.colCount);

  const changePoints = (delta: number) => {
    setPoints((prev) => prev + delta);
  };

  const changeMovesLeft = () => {
    setMovesLeft((prev) => prev - 1);
  };
  if (!level || !board) {
    return (
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.backgroundGame}
        resizeMode="cover"
      >
        <Text style={styles.title}>Level not found</Text>
      </ImageBackground>
    );
  }

  if (points >= level.goal) {
    return (
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.backgroundGame}
        resizeMode="cover"
      >
        <Text style={styles.title}>You win!</Text>
        <Text style={styles.subtitle}>Final Score: {points}</Text>
      </ImageBackground>
    );
  }

  if (movesLeft <= 0) {
    return (
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.backgroundGame}
        resizeMode="cover"
      >
        <Text style={styles.title}>You can't resolve this level</Text>
        <Text style={styles.subtitle}>Final Score: {points}</Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.backgroundGame}
      resizeMode="cover"
    >
      <Text style={styles.title}>Level {levelId + 1}</Text>
      <View style={styles.flexCenter}>
        <Text style={styles.subtitle}>
          Points: <Text style={styles.subtitleValue}>{points}</Text>
        </Text>
        <Text style={styles.subtitle}>
          Goal: <Text style={styles.subtitleValue}>{level.goal}</Text>
        </Text>
        <Text style={styles.subtitle}>
          Moves Left: <Text style={styles.subtitleValue}>{movesLeft}</Text>
        </Text>
      </View>
      <GestureHandlerRootView style={{ width: "100%" }}>
        <BoardCard
          board={board}
          tileSize={tileSize}
          changeMovesLeft={changeMovesLeft}
          changePoints={changePoints}
          tileTypeCount={level.tileTypeCount}
        />
      </GestureHandlerRootView>
    </ImageBackground>
  );
};
