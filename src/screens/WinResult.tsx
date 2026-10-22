import React, { FC, useEffect } from "react";
import { ImageBackground, Text, Pressable } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { styles } from "../styles/styles";

type WinResultScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WinResult"
>;

import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { userStorageServices } from "../storage/storage";

type WinResultProps = NativeStackScreenProps<RootStackParamList, "WinResult">;

export const WinResult: FC<WinResultProps> = ({ route }) => {
  const { levelId, points } = route.params;

  const navigation = useNavigation<WinResultScreenNavigationProp>();

  const handleNextLevel = () => {
    navigation.navigate("Game", { levelId: levelId + 1 });
  };

  const handleStartScreen = () => {
    navigation.navigate("Welcome");
  };

  useEffect(() => {
    userStorageServices.setLevel({
      finishedLevel: levelId + 1,
      points,
    });
  }, []);

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
      <Pressable style={styles.button} onPress={handleStartScreen}>
        <Text style={styles.buttonText}>Start Screen</Text>
      </Pressable>
    </ImageBackground>
  );
};
