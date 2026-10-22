import AsyncStorage from "@react-native-async-storage/async-storage";

import { ChangeUserData, UserData } from "../types";

const USER_DATA_KEY = "userData";

class LocalStorageService {
  #userName = "";
  #points = 0;
  #level = 0;

  getUserFromLocal = async (): Promise<UserData | null> => {
    try {
      const userDataString = await AsyncStorage.getItem(USER_DATA_KEY);

      if (!userDataString) return null;

      const userData: UserData = JSON.parse(userDataString);

      this.#level = userData.finishedLevel;
      this.#points = userData.totalPoints;
      this.#userName = userData.playerName;

      return userData;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  };

  saveUserData = async ({
    playerName,
    finishedLevel,
    totalPoints,
  }: UserData): Promise<void> => {
    const userData: UserData = {
      playerName,
      finishedLevel,
      totalPoints,
    };

    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

      this.#userName = playerName;
      this.#level = finishedLevel;
      this.#points = totalPoints;
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  setLevel = async ({
    finishedLevel,
    points,
  }: ChangeUserData): Promise<void> => {
    try {
      const existingData = await AsyncStorage.getItem(USER_DATA_KEY);

      if (!existingData) {
        console.warn("User data not found.");
        return;
      }

      const userData: UserData = JSON.parse(existingData);

      const updatedUserData: UserData = {
        playerName: userData.playerName,
        finishedLevel,
        totalPoints: userData.totalPoints + points,
      };

      await AsyncStorage.setItem(
        USER_DATA_KEY,
        JSON.stringify(updatedUserData),
      );

      this.#userName = updatedUserData.playerName;
      this.#level = updatedUserData.finishedLevel;
      this.#points = updatedUserData.totalPoints;
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
}

export const userStorageServices = new LocalStorageService();
