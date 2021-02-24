import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import DogImagePicker from "../components/DogImagePicker";

const AddDogScreen = () => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: "", age: "", breed: "" }}
        onSubmit={values => console.log(values)}
      >
        {(props) => (
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
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                placeholder="Age..."
                placeholderTextColor='#003f5c'
                onChangeText={props.handleChange("age")}
                value={props.values.age}
                onBlur={props.handleBlur("age")}
              />
            </View>
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
            <TouchableOpacity style={styles.dogButton}>
              <Text style={styles.text}> Add Dog </Text>
            </TouchableOpacity>
          </View>
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

