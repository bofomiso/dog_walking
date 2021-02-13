import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';


const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ email: '', password: ''}}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {(props) => (
                    <View style={styles.container}>
                        <Text style={styles.logo}> Dog Walking </Text>
                        <View style={styles.input}>
                            <TextInput 
                                style={styles.input_Text}
                                placeholder='Email...'
                                placeholderTextColor='#003f5c'
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                            />
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                style={styles.input_Text}
                                placeholder='Password...'
                                placeholderTextColor='#003f5c'
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />
                        </View>
                        <TouchableOpacity style={styles.login_Button} onPress={props.handleSubmit}>
                            <Text style={styles.login_text}> Login </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.signup_Text}> Sign up </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
                // <Text style={styles.logo}> Dog Walking </Text>
                // <View style={styles.input}> 
                //     <TextInput 
                //         style={styles.input_Text} 
                //         placeholder='Email...'
                //         placeholderTextColor='#003f5c'
                //     />
                // </View>
                // <View style={styles.input}>
                //     <TextInput 
                //         style={styles.input_Text}
                //         placeholder='Password...'
                //         placeholderTextColor='#003f5c'
                //         secureTextEntry
                //     />
                // </View>
                // <TouchableOpacity style={styles.login_Button}>
                //     <Text style={styles.login_text}> Login </Text>
                // </TouchableOpacity>
                // <TouchableOpacity>
                //     <Text style={styles.signup_Text}> Sign up</Text>
                // </TouchableOpacity>
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
export default LoginScreen;