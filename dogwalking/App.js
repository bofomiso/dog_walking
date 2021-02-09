import 'react-native-gesture-handler';
import HomeScreen from './src/HomeScreen';
import ProfileScreen from './src/ProfileScreen';
import WalkingScreen from './src/WalkingScreen';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
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
          name='Walk'
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
    </NavigationContainer>
  );
}

export default App;
