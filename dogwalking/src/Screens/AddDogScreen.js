import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import DogImagePicker from "../components/DogImagePicker";

const AddSchema = yup.object({
  name: yup
    .string()
    .required("name is required"),
  age: yup
    .number()
    .required("age is required"),
  breed: yup
    .string()
    .required("What breed is your dog?")
})

const AddDogScreen = () => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: "", age: "", breed: "" }}
        validationSchema={AddSchema}
        onSubmit={values => console.log(values)}
      >
        {(props) => (
          <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
          }}>
            <View style={styles.container}>
              <DogImagePicker />
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Name..."
                  placeholderTextColor='#003f5c'
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                  onBlur={props.handleBlur("name")}
                />
              </View>
              <Text style={styles.errorText}> {props.touched.name && props.errors.name} </Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Age..."
                  placeholderTextColor='#003f5c'
                  onChangeText={props.handleChange("age")}
                  value={props.values.age}
                  onBlur={props.handleBlur("age")}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.errorText}> {props.touched.age && props.errors.age} </Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Breed..."
                  placeholderTextColor='#003f5c'
                  onChangeText={props.handleChange("breed")}
                  value={props.values.password}
                  onBlur={props.handleBlur("breed")}
                />
              </View>
              <Text style={styles.errorText}> {props.touched.breed && props.errors.breed} </Text>
              <TouchableOpacity style={styles.dogButton}>
                <Text style={styles.text}> Add Dog </Text>
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
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  input: {
    width: 330,
    backgroundColor: '#D1D8Df',
    borderRadius: 25,
    height: 50,
    marginBottom: 5,
    marginTop: 5,
    justifyContent: 'center',
    padding: 20
  },
  dogButton: {
    width: 330,
    backgroundColor: '#2e71b8',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 16
  },
  inputText: {
    height: 50,
    color: 'black'
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
});

export default AddDogScreen;

