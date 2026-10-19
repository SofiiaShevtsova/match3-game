import { FC, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App";
import { styles } from "../styles/styles";
import { levels } from "../levels/levels";

type GameProps = NativeStackScreenProps<RootStackParamList, "Game">;

export const Game: FC<GameProps> = ({ route }) => {
  const { levelId } = route.params;
  const level = levels[levelId];
  const [points, setPoints] = useState(0);
  const [movesLeft, setMovesLeft] = useState(level.moves);

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.backgroundGame}
      resizeMode="cover"
    >
      <Text style={styles.title}>Level {levelId + 1}</Text>
      <View style={styles.flexCenter}>
        <Text style={styles.subtitle}>Points: {points}</Text>
        <Text style={styles.subtitle}>Goal: {level.goal}</Text>
        <Text style={styles.subtitle}>Moves Left: {movesLeft}</Text>
      </View>
      <View style={styles.boardCard}></View>
    </ImageBackground>
  );
};
