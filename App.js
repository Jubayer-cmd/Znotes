import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { PreferencesContext } from "./components/PreferencesContext";
import { darkTheme, lightTheme } from "./components/Themes";
import Home from "./Screen/Home";
import Login from "./Screen/Login";
import ManageAccount from "./Screen/ManageAccount";
import Notes from "./Screen/Notes";
import ResetPassword from "./Screen/ResetPassword";
import Signin from "./Screen/SignIn";
export default function App() {
  const Stack = createNativeStackNavigator();
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? darkTheme : lightTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );
  return (
    <PreferencesContext.Provider value={preferences}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={Signin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageAccount"
              component={ManageAccount}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="notes"
              component={Notes}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </PreferencesContext.Provider>
  );
}
