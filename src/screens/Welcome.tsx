import React, { useCallback, useState } from "react";
import { Text, View, Pressable, Alert, ImageBackground } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { BlurView } from "expo-blur";

import { RootStackParamList } from "../../App";
import { userStorageServices } from "../storage/storage";
import { UserData } from "../types";
import { styles } from "../styles/styles";
import { NameInput } from "../components/NameInput";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

export const Welcome = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData>({
    playerName: `User-${Math.floor(Math.random() * 1000)}`,
    finishedLevel: 0,
    totalPoints: 0,
  });
  const [editName, setEditName] = useState(false);

  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const saveName = async (newName: string) => {
    try {
      if (!newName.trim()) {
        Alert.alert("Name cannot be empty.");
        return;
      }
      userStorageServices.saveUserData({ ...user, playerName: newName });
      setUser((prev) => ({ ...prev, playerName: newName }));
      setEditName(false);
    } catch (error) {
      console.error("Error changing user name:", error);
    }
  };

  const handleStartGame = () => {
    if (!user.playerName.trim()) {
      return;
    }
    navigation.navigate("Game", { levelId: user.finishedLevel });
  };

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const fetchUserData = async () => {
        try {
          const userData = await userStorageServices.getUserFromLocal();
          if (!active) return;
          if (userData) {
            setUser((prev) => ({ ...prev, ...userData }));
          } else {
            await userStorageServices.saveUserData(user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          SplashScreen.hideAsync();
        }
      };

      fetchUserData().finally(() => {
        setLoading(false);
      });

      return () => {
        active = false;
      };
    }, []),
  );

  if (loading) {
    return (
      <View style={styles.background}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/background-welcome.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <BlurView intensity={80} tint="default" style={styles.blurCard}>
        <Text style={styles.title}>Welcome!</Text>
        <NameInput
          playerName={user.playerName}
          saveName={saveName}
          editName={editName}
          setEditName={setEditName}
        />
        <View style={styles.flexBaseline}>
          <Text style={styles.subtitle}>Finished Level:</Text>
          <Text style={styles.subtitleValue}>{user.finishedLevel}</Text>
        </View>
        <View style={styles.flexBaseline}>
          <Text style={styles.subtitle}>Total Points:</Text>
          <Text style={styles.subtitleValue}>{user.totalPoints}</Text>
        </View>
        <Pressable
          style={
            !user.playerName.trim() || editName
              ? styles.buttonDisabled
              : styles.button
          }
          disabled={!user.playerName.trim() || editName}
          onPress={handleStartGame}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </Pressable>
      </BlurView>
    </ImageBackground>
  );
};
