import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllExpenses, ManageExpense, RecentExpenses } from "./src/screens";
import { GlobalStyles } from "./src/constants";
import { Calendar, Hourglass, Plus } from "lucide-react-native";
import { IconButton } from "./src/components";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => (
  <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: GlobalStyles.colors.white,
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      sceneStyle: {
        backgroundColor: GlobalStyles.colors.primary700,
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon={<Plus color={tintColor} size={24} />}
          onPress={() => navigation.navigate("ManageExpense")}
          styles={{ marginRight: 16 }}
        />
      ),
    })}
  >
    <BottomTabs.Screen
      name="RecentExpenses"
      component={RecentExpenses}
      options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({ color, size }) => (
          <Hourglass color={color} size={size} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="AllExpenses"
      component={AllExpenses}
      options={{
        title: "All Expenses",
        tabBarLabel: "All Expenses",
        tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
      }}
    />
  </BottomTabs.Navigator>
);

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: GlobalStyles.colors.primary700,
            },
            headerBackTitle: "Back",
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
