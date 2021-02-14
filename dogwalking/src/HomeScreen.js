import React from 'react';
import { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from './Navigation/AuthProvider';

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);
  return (
      <View style={styles.text}>
        <Text>Hello World</Text>
        <TouchableOpacity onPress={() => logout()}>
          <Text> Logout </Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    text: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
});
export default HomeScreen;