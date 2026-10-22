import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { Welcome } from "./src/screens/Welcome";
import { Game } from "./src/screens/Game";
import { Result } from "./src/screens/Result";

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  Welcome: undefined;
  Game: { levelId: number };
  Result: { levelId: number; points: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          EmilysCandy: require("./assets/fonts/EmilysCandy-Regular.ttf"),
          MainRegular: require("./assets/fonts/Gorditas-Regular.ttf"),
          MainBolt: require("./assets/fonts/Gorditas-Bold.ttf"),
        });
      } catch (e) {
        console.warn("Font loading error:", e);
      } finally {
        setFontsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
