import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const HomeScreen = () => {
    return (
      <View style={styles.text}>
        <Text>Hello World</Text>
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