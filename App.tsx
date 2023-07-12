import { View, StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "@routes/index";

import { AuthContext } from "@contexts/AuthContext";

import { THEME } from "./src/theme";
import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? (
        <AuthContext.Provider
          value={{
            id: "1",
            name: "Caio",
            email: "caio@email.com",
            avatar: "caio.png",
          }}
        >
          <Routes />
        </AuthContext.Provider>
      ) : (
        <Loading />
      )}
    </NativeBaseProvider>
  );
}
