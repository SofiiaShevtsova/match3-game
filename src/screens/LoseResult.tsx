import React, { FC } from "react";
import { ImageBackground, Text, Pressable } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { styles } from "../styles/styles";

type LoseResultScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LoseResult"
>;

import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type LoseResultProps = NativeStackScreenProps<RootStackParamList, "LoseResult">;

export const LoseResult: FC<LoseResultProps> = ({ route }) => {
  const { levelId, points } = route.params;

  const navigation = useNavigation<LoseResultScreenNavigationProp>();

  const handlerReloadLevel = () => {
    navigation.replace("Game", { levelId: levelId });
  };

  const handleStartScreen = () => {
    navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.backgroundGame}
      resizeMode="cover"
    >
      <Text style={styles.title}>You can't resolve this level</Text>
      <Text style={styles.subtitle}>Final Score: {points}</Text>
      <Pressable style={styles.button} onPress={handlerReloadLevel}>
        <Text style={styles.buttonText}>Reload Level</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleStartScreen}>
        <Text style={styles.buttonText}>Start Screen</Text>
      </Pressable>
    </ImageBackground>
  );
};
