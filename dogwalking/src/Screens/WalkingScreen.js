import React from "react";
import { Text, View, StyleSheet } from "react-native";

const WalkingScreen = () => {
  return (
    <View style={styles.text}>
      <Text>Walking Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default WalkingScreen;