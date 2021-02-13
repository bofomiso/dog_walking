import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';

const RegisterScreen = () => {
    return (
        <View style={styles.container}>
            <Text> RegisterScreen </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 50,
        marginBottom: 40
    },
    input: {
        width: 330,
        backgroundColor: '#D1D8Df',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20
    },
    input_Text: {
        height: 50,
        color: 'black'
    },
    login_Button: {
        width: 330,
        backgroundColor: '#2e71b8',
        borderRadius: 25,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 10,
    },
    login_text: {
        color: 'white',
        fontSize: 16
    },
    signup_Text: {
        color: 'red',
        fontSize: 16,
    }
    
});

export default RegisterScreen;