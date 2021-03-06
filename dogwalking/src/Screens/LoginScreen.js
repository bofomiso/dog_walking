import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import { AuthContext } from "../Navigation/AuthProvider";
import * as yup from "yup";

const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
})

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          login(values.email, values.password)
        }}
      >
        {(props) => (
          <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
          }}>
            <View style={styles.container}>
              <Text style={styles.logo}> Dog Walking </Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.input_Text}
                  placeholder="Email..."
                  placeholderTextColor="#D1D8Df"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
              </View>
              <Text style={styles.error_text}> {props.touched.email && props.errors.email} </Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.input_Text}
                  placeholder="Password..."
                  placeholderTextColor="#D1D8Df"
                  secureTextEntry
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  onBlur={props.handleBlur("password")}
                />
              </View>
              <Text style={styles.error_text}> {props.touched.password && props.errors.password} </Text>
              <TouchableOpacity style={styles.login_Button} onPress={props.handleSubmit}>
                <Text style={styles.login_text}> Login </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.signup_Text}> Sign up </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303030'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 40,
    color: '#D1D8Df'
  },
  input: {
    width: 330,
    backgroundColor: '#505050',
    borderRadius: 25,
    height: 50,
    marginBottom: 5,
    marginTop: 5,
    justifyContent: 'center',
    padding: 20
  },
  input_Text: {
    height: 50,
    color: '#D1D8Df'
  },
  login_Button: {
    width: 330,
    backgroundColor: '#fdd404',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  login_text: {
    color: 'black',
    fontSize: 16
  },
  signup_Text: {
    color: 'red',
    fontSize: 16,
  },
  error_text: {
    color: 'red',
    fontSize: 16,
  }
});
export default LoginScreen;