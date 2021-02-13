import 'react-native-gesture-handler';
import React from 'react';
import BottomBarStack from './src/Navigation/BottomBarStack';
import Providers from './src/Navigation/Index';

function App() {
  return (
    // <BottomBarStack />
    <Providers />
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen 
    //       name='Home' 
    //       component={HomeScreen}
    //       options={{
    //         tabBarIcon: ({ color }) => (
    //          <FontAwesomeIcon name='home' color={color} size={25} />
    //         ),
    //       }} 
    //     />
    //     <Tab.Screen 
    //       name='Walk'
    //       component={WalkingScreen}
    //       options={{
    //         tabBarIcon: ({ color }) => (
    //           <FontAwesomeIcon name='paw' color={color} size={25} />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen 
    //       name='Profile' 
    //       component={ProfileScreen}
    //       options={{
    //         tabBarIcon: ({ color }) => (
    //           <FontAwesomeIcon name='user' color={color} size={25} />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen 
    //       name='Login'
    //       component={RegisterScreen}
    //     />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default App;
