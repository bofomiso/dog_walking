import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const HomeScreen = () => {
    return (
      <View style={styles.text}>
        <Text>Hello World</Text>
        <IconAntDesign name='stepforward' size={40} />
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