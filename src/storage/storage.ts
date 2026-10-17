import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserData } from "../game/types";

export const saveUserData = async ({
  playerName,
  finishedLevel,
  totalPoints,
}: UserData) => {
  try {
    const userData = { playerName, finishedLevel, totalPoints };
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const userDataString = await AsyncStorage.getItem("userData");
    if (userDataString) {
      return JSON.parse(userDataString);
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};
