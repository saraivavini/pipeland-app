import "react-native-gesture-handler";

if (typeof Intl === "undefined") {
  require("intl");
  require("intl/locale-data/jsonp/pt-BR");
  require("date-time-format-timezone");
}

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react";
import * as Linking from "expo-linking";

import theme from "./theme";
import { MainNavigator } from "./navigators/main-navigator";
import { createRootStore, RootStore, RootStoreProvider } from "./store";
import { AuthNavigator } from "./navigators/auth-navigator";
import { LoadingContainer } from "./components";

const prefix = Linking.createURL("/");

const App = observer(() => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        joinClass: "join-class/:class_id",
      },
    },
  };

  useEffect(() => {
    setRootStore(createRootStore());
  }, []);

  if (!rootStore) return null;

  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer linking={linking}>
            <LoadingContainer
              flex={1}
              width={"100%"}
              height={"100%"}
              isLoading={rootStore.sessionsStore.isLoading.loadSession}
            >
              {!!rootStore.sessionsStore.activeSession ? (
                <MainNavigator />
              ) : (
                <AuthNavigator />
              )}
            </LoadingContainer>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </RootStoreProvider>
  );
});

export default App;
