import React, { useContext } from "react";
import { Platform, Touchable, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import AddDogScreen from "../Screens/AddDogScreen";
import WalkingListScreen from "../Screens/WalkingListScreen";
import WalkingDetailScreen from "../Screens/WalkingDetailsScreen";
import FeatherIcons from "react-native-vector-icons/Feather"
import { AuthContext } from "../Navigation/AuthProvider";


const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity>
              <FeatherIcons 
                name="log-out"
                size={20}
                onPress={() => logout()}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Add Dog"
        component={AddDogScreen}
        options={{ 
          headerShown: Platform.OS === 'ios' ? true : false
        }}
      />
      <Stack.Screen 
        name="Walks"
        component={WalkingListScreen}
        options={{
          headerShown: Platform.OS === 'ios' ? true : false
        }}
      />
      <Stack.Screen
        name="WalkDetails"
        component={WalkingDetailScreen}
        options={({ route }) => ({ title: route.params.dogName})}
      />
    </Stack.Navigator>
  );
}