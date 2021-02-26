import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import AddDogScreen from "../Screens/AddDogScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Dog"
        component={AddDogScreen}
        options={{ 
          headerShown: Platform.OS === 'ios' ? true : false
        }}
      />
    </Stack.Navigator>
  );
}