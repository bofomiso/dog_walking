import 'react-native-gesture-handler';
import React from 'react';
import Providers from './src/Navigation/Index';
import { enableScreens } from 'react-native-screens';

enableScreens();

function App() {
  return (
    <Providers />
  );
}

export default App;
