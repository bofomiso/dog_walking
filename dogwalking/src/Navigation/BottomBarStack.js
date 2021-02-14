import 'react-native-gesture-handler';
import HomeScreen from '../HomeScreen';
import WalkingScreen from '../WalkingScreen';
import ProfileScreen from '../ProfileScreen';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function BottomBarStack() {
    return (
        <Tab.Navigator>
          <Tab.Screen 
            name='Home' 
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
               <FontAwesomeIcon name='home' color={color} size={25} />
              ),
            }} 
        />
        <Tab.Screen 
            name='Walking' 
            component={WalkingScreen}
            options={{
              tabBarIcon: ({ color }) => (
               <FontAwesomeIcon name='paw' color={color} size={25} />
              ),
            }} 
        />
        <Tab.Screen 
            name='Profile' 
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color }) => (
               <FontAwesomeIcon name='user' color={color} size={25} />
              ),
            }} 
        />
        </Tab.Navigator>
    );
}