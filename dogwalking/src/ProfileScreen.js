import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ProfileScreen = () => {
    return (
      <View style={styles.text}>
        <Text>Profile Screen</Text>
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
export default ProfileScreen;