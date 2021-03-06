import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { launchImageLibrary } from "react-native-image-picker";
import Input from "../components/Input";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { AuthContext } from "../Navigation/AuthProvider";
import { firebase } from "@react-native-firebase/auth";
import { Platform } from "react-native";

const AddSchema = yup.object({
  name: yup
    .string()
    .required("Name is required"),
  age: yup
    .number()
    .required("Age is required"),
  breed: yup
    .string()
    .required("What breed is your dog?"),
  // photo: yup
  //   .object()
  //   .required("A picture is required")
})

const AddDogScreen = ({navigation}) => {
  const [imageSource, setImageSource] = useState(null);
  const { user } = useContext(AuthContext);
  function selectImage() {
    let options = {
      quality: 1.0,
      maxWidth: 200,
      maxHeight: 200,
      mediaType: "photo",
      storageOptions: {
        skipBackup: true
        
      }
    };

    launchImageLibrary(options, response => {
      if(response.didCancel) {
        Alert.alert("You did not select a image");
      }
      else if(response.error) {
        console.log("ImagePicker Error: ", response.error);
      }
      else if(response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      }
      else {

        let source = { uri: response.uri };
        setImageSource(source.uri);
      }
    });
  }

  return (
    <View>
      <Formik
        initialValues={{ name: "", age: "", breed: "" }}
        validationSchema={AddSchema}
        onSubmit={(values) => {
          firestore()
            .collection("Dogs")
            .add({
              user: user.uid,
              name: values.name,
              age: values.age,
              breed: values.breed,
              pictureUri: imageSource,
            })
            .then(() => {
              console.log("User added!");
            });
            let imageName = user.uid + " " + values.name;
            let uri = imageSource;
            let uploadUri = Platform.OS === "ios" ? uri.replace("file://", '') : uri;
            storage()
              .ref(imageName)
              .putFile(uploadUri)
              .then((snapshot) => {
                console.log("Image has been uploaded");
              })

        }}
      >
        {(props) => (
          <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={() => {
              Keyboard.dismiss();
          }}>
            <View style={styles.container}>
              <View>
                {imageSource === null ? (
                  <TouchableOpacity onPress={selectImage}>
                    <View style={styles.circle}>
                      <Text> Add picture </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={selectImage}>
                    <Image
                      source={{ uri: imageSource }}
                      style={styles.circle}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.errorText}> {props.touched.name && props.errors.name} </Text>
                <Input
                  placeholder="Name.."
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                  onBlur={props.handleBlur("name")}
                >
                </Input>
                <Text style={styles.errorText}> {props.touched.name && props.errors.name} </Text>
                <Input
                  placeholder="Age.."
                  onChangeText={props.handleChange("age")}
                  value={props.values.age}
                  onBlur={props.handleBlur("age")}
                  keyboardType="numeric"
                >
                </Input>
                <Text style={styles.errorText}> {props.touched.age && props.errors.age} </Text>
                <Input
                  placeholder="Breed.."
                  onChangeText={props.handleChange("breed")}
                  value={props.values.breed}
                  onBlur={props.handleBlur("breed")}
                >
                </Input>
                <Text style={styles.errorText}> {props.touched.breed && props.errors.breed} </Text>
                <TouchableOpacity 
                  style={styles.dogButton} 
                  onPress={() => {props.handleSubmit(); navigation.navigate("Home")}}
                >
                  <Text style={styles.text}> Add Dog </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
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
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#D1D8Df',
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
  },
});

export default AddDogScreen;

