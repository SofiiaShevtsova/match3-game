import { Dispatch, FC, useEffect, useRef, useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/styles";

type NameInputProps = {
  playerName: string;
  saveName: (newName: string) => void;
  editName: boolean;
  setEditName: Dispatch<React.SetStateAction<boolean>>;
};

export const NameInput: FC<NameInputProps> = ({
  playerName,
  saveName,
  editName,
  setEditName,
}) => {
  const [userName, setUserName] = useState(playerName);
  const inputRef = useRef<TextInput>(null);

  const changeName = async (newName: string) => {
    setUserName(newName);
  };

  useEffect(() => {
    if (editName) {
      inputRef.current?.focus();
    }
  }, [editName]);

  return (
    <View style={styles.flexCenter}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={userName}
        onChangeText={changeName}
        onBlur={() => saveName(userName)}
        editable={editName}
      />
      <Pressable
        style={editName ? styles.iconBtnActive : styles.iconBtn}
        onPress={() => setEditName((prev) => !prev)}
      >
        <Ionicons name="pencil" color={"white"} size={24} />
      </Pressable>
    </View>
  );
};
