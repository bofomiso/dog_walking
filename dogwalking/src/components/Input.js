import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Input({ placeholder, onChangeText, value, onBlur, keyboardType}) {
    return(
        <View style={styles.input}>
            <TextInput
                style={styles.inputText}
                placeholder={placeholder}
                placeholderTextColor='#D1D8DF'
                onChangeText={onChangeText}
                value={value}
                onBlur={onBlur}
                keyboardType={keyboardType}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: 330,
        backgroundColor: '#505050',
        borderRadius: 25,
        height: 50,
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        padding: 15
      },
      inputText: {
        height: 50,
        color: '#D1D8DF'
      },
});