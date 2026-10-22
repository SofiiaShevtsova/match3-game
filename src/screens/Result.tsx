import React, { FC } from "react";
import { ImageBackground, Text, Pressable } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { styles } from "../styles/styles";

type ResultScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Result"
>;

import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { userStorageServices } from "../storage/storage";

type ResultProps = NativeStackScreenProps<RootStackParamList, "Result">;

export const Result: FC<ResultProps> = ({ route }) => {
  const { levelId, points } = route.params;

  const navigation = useNavigation<ResultScreenNavigationProp>();

  const handleNextLevel = () => {
    navigation.navigate("Game", { levelId: levelId + 1 });
    userStorageServices.setLevel({
      finishedLevel: levelId + 1,
      points,
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.backgroundGame}
      resizeMode="cover"
    >
      <Text style={styles.title}>You win!</Text>
      <Text style={styles.subtitle}>Final Score: {points}</Text>
      <Pressable style={styles.button} onPress={handleNextLevel}>
        <Text style={styles.buttonText}>Next Level</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("Welcome");
        }}
      >
        <Text style={styles.buttonText}>Start Screen</Text>
      </Pressable>
    </ImageBackground>
  );
};
