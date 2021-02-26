import "react-native-gesture-handler";
import WalkingScreen from "../Screens/WalkingScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import HomeStack from "./HomeStack";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function BottomBarStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
         keyboardHidesTabBar: true
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Walking"
        component={WalkingScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="paw" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="user" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}