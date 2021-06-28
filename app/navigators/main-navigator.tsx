import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ClassNavigator } from "./class-navigator";
import { ClassesScreen } from "../screens/classes-screen";
import { TaskDetailScreen } from "../screens/task-detail-screen";
import { useStores } from "../store";
import { observer } from "mobx-react";
import { NewClassScreen } from "../screens/new-class-screen/new-class-screen";
import { UnderConstructionScreen } from "../screens/under-construction-screen/under-construction-screen";
import { JoinClassScreen } from "../screens/join-class-screen/join-class-screen";
import { NewTaskScreen } from "../screens/new-task-screen/new-task-screen";
import { IconButton } from "../components/icon-button";
import { SettingsScreen } from "../screens/settings-screen/settings-screen";
import { AboutScreen } from "../screens/about-screen/about-screen";
import { TaskCorrectionsScreen } from "../screens/task-corrections-screen";
import { CorrectTaskScreen } from "../screens/correct-task-screen";

export type MainNavigatorParamsList = {
  classes: undefined;
  class: undefined;
  taskDetail: undefined;
  taskCorrections: undefined;
  newTask: undefined;
  newClass: undefined;
  joinClass: undefined;
  underConstruction: undefined;
  settings: undefined;
  about: undefined;
  correctTask: {
    student_id: string;
  };
};

const { Navigator, Screen } = createStackNavigator<MainNavigatorParamsList>();

const MainNavigator = observer(() => {
  const { classesStore, drawerMenuStore } = useStores();

  return (
    <>
      <Navigator>
        <Screen
          name="classes"
          component={ClassesScreen}
          options={{
            title: "Turmas",
            headerLeft: () => (
              <IconButton
                icon="menu"
                preset="secondary"
                iconSize={24}
                marginLeft={2}
                onPress={() => drawerMenuStore.toggleMenu()}
              />
            ),
          }}
        />

        <Screen
          name="class"
          component={ClassNavigator}
          options={{
            title: classesStore.selectedClass
              ? classesStore.selectedClass.name
              : "Turma",
          }}
        />

        <Screen
          name="taskDetail"
          component={TaskDetailScreen}
          options={{ title: "Atividade" }}
        />

        <Screen
          name="newClass"
          component={NewClassScreen}
          options={{ title: "Nova turma" }}
        />

        <Screen
          name="joinClass"
          component={JoinClassScreen}
          options={{ title: "Ingressar em uma turma" }}
        />

        <Screen
          name="newTask"
          component={NewTaskScreen}
          options={{ title: "Nova Atividade" }}
        />

        <Screen
          name="settings"
          component={SettingsScreen}
          options={{ title: "Configurações" }}
        />

        <Screen
          name="about"
          component={AboutScreen}
          options={{ title: "Sobre o jogo" }}
        />

        <Screen
          name="taskCorrections"
          component={TaskCorrectionsScreen}
          options={{ title: "Correções" }}
        />

        <Screen
          name="correctTask"
          component={CorrectTaskScreen}
          options={{ title: "Corrigir" }}
        />

        <Screen
          name="underConstruction"
          component={UnderConstructionScreen}
          options={{ title: "Em construção" }}
        />
      </Navigator>
    </>
  );
});

export { MainNavigator };
