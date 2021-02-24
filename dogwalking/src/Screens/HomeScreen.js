import React from "react";
import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../Navigation/AuthProvider";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => logout()}>
        <Text style={styles.text}> Logout </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Add Dog")}>
        <Text style={styles.text}> Add Dog </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    padding: 5
  }
});
export default HomeScreen;