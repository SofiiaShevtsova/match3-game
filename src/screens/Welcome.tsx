import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getUserData, saveUserData } from "../storage/storage";
import { UserData } from "../game/types";

export const Welcome = () => {
  const [user, setUser] = useState<UserData>({
    playerName: `User-${Math.floor(Math.random() * 1000)}`,
    currentLevel: 1,
    totalPoints: 0,
  });
  const [editName, setEditName] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const changeName = async (newName: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      playerName: newName,
    }));
  };

  const saveName = async (newName: string) => {
    try {
      if (!newName.trim()) {
        Alert.alert("Name cannot be empty.");
        return;
      }
      saveUserData({ ...user, playerName: newName });
      setEditName(false);
    } catch (error) {
      console.error("Error changing user name:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        if (userData) {
          setUser((prev) => ({ ...prev, ...userData }));
        } else {
          await saveUserData(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (editName) {
      inputRef.current?.focus();
    }
  }, [editName]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.flexRow}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={user.playerName}
          onChangeText={changeName}
          onBlur={() => saveName(user.playerName)}
          editable={editName}
        />
        <Pressable
          style={editName ? styles.iconBtnActive : styles.iconBtn}
          onPress={() => setEditName((prev) => !prev)}
        >
          <Ionicons name="pencil" color={"white"} size={24} />
        </Pressable>
      </View>
      <Text style={styles.subtitle}>Level: {user.currentLevel}</Text>
      <Text style={styles.subtitle}>Points: {user.totalPoints}</Text>
      <Pressable
        style={
          !user.playerName.trim() || editName
            ? styles.buttonDisabled
            : styles.button
        }
        disabled={!user.playerName.trim() || editName}
        onPress={() => console.log("Start Game pressed")}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: 250,
  },
  buttonDisabled: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    width: 250,
  },
  iconBtn: {
    backgroundColor: "gray",
    padding: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBtnActive: {
    backgroundColor: "blue",
    padding: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
