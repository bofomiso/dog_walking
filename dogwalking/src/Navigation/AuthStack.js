import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    return(
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen 
                name='Register'
                component={RegisterScreen}
            />
        </Stack.Navigator>
    );
}