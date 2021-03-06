import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TasksScreen } from "../screens/tasks-screen";

const { Navigator, Screen } = createStackNavigator();

export function TasksNavigator() {
  return (
    <Navigator>
      <Screen
        name="tasks"
        component={TasksScreen}
        // options={{ title: "Engenharia de Software" }}
      />
    </Navigator>
  );
}
