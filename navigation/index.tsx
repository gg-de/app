import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import NotFoundScreen from "../screens/NotFoundScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { headerConfig } from "./utils";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme, token
}: {
  colorScheme: ColorSchemeName;
  token: string;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator initialRouteName={token ? "Home" : "Login"} />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const AppStack = createStackNavigator();

function RootNavigator({
  initialRouteName
}: {
    initialRouteName: string;
  }) {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <AppStack.Screen name="Login" component={LoginScreen} />
      <AppStack.Screen
        name="Register"
        component={RegisterScreen}
        options={headerConfig("Cadastro")}
      />
      <AppStack.Screen name="Home" component={BottomTabNavigator} />
      <AppStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </AppStack.Navigator>
  );
}
