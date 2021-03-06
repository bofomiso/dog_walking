import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import WalkingScreen from "../Screens/WalkingScreen";
import WhichDogScreen from "../Screens/WhichDogScreen";


const Stack = createNativeStackNavigator();

export default function WalkingStack() {
  return (
    <Stack.Navigator initialRouteName="Walking">
      <Stack.Screen
        name="Walking"
        component={WalkingScreen}
        options={{
          headerStyle: {
            backgroundColor: '#303030'
          },
          headerTintColor: '#FFFF',
        }}
      />
      <Stack.Screen
        name="Choose Dog"
        component={WhichDogScreen}
        options={{ 
          headerShown: Platform.OS === 'ios' ? true : false,
          headerStyle: {
            backgroundColor: '#303030'
          },
          headerTintColor: '#FFFF',
        }}
      />
    </Stack.Navigator>
  );
}