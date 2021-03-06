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
import { Platform } from "react-native";
import { DogBreeds } from "../utils/DogBreeds";
import RNPickerSelect from 'react-native-picker-select';
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
})

const AddDogScreen = ({navigation}) => {
  const [imageSource, setImageSource] = useState(null);
  const { user } = useContext(AuthContext);
  const breeds = DogBreeds();
  const dogUid = uuid.v4();

  // const dogCreation = async (value) => {
  //   try {
  //     await AsyncStorage.setItem("@dogKey", value)
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

  function selectImage() {
    let options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
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
    <View style={styles.screenContainer}>
      <Formik
        initialValues={{ name: "", age: "", breed: "" }}
        validationSchema={AddSchema}
        onSubmit={async(values) => {
          if(imageSource) {
            var uri = imageSource;
            var imageName = dogUid + values.name;
            var uploadUri = Platform.OS === "ios" ? uri.replace("file://", '') : uri;
            await storage()
            .ref(imageName)
            .putFile(uploadUri)
            .then(async (snapshot) => {
              console.log("Image has been uploaded");
              const url = await storage()
                .ref(imageName)
                .getDownloadURL();
              console.log(url);
                firestore()
                .collection("Dogs")
                .doc(`${dogUid}`+`${values.name}`)
                .set({
                  user: user.uid,
                  dogUid: dogUid,
                  name: values.name,
                  age: values.age,
                  breed: values.breed,
                  pictureUri: url,
                  totalWalks: 0,
                  totalDistance: 0.00,
                  createdAt: firestore.FieldValue.serverTimestamp(),
                })
                .then(() => {
                  console.log("Dog added!");                  
                    // console.log(created[1].createdAt);
                  // dogCreation(dogCreated);
                });
            })
          }
          else {
            var uri = await storage()
              .ref('default/default.png')
              .getDownloadURL();
              await firestore()
              .collection("Dogs")
              .add({
                user: user.uid,
                name: values.name,
                age: values.age,
                breed: values.breed,
                pictureUri: uri,
                totalWalks: 0,
                totalDistance: 0.00,
                createdAt: firestore.FieldValue.serverTimestamp(),
              })
              .then(() => {
                console.log("Dog added!");
              });
          }
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
                  <TouchableOpacity onPress={() => selectImage()}>
                    <View style={styles.circle}>
                      <Text style={styles.circleText}> Add picture </Text>
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
              <Text style={styles.errorText}> {props.touched.photo && props.errors.photo} </Text>
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
                <View style={styles.pickerContainer}>
                  <RNPickerSelect
                    onValueChange={(value, index) => {
                      props.setFieldTouched("breed", true)
                      props.setFieldValue("breed", value)
                    }}
                    placeholder={{label: "Breed...", value: ""}}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      ...pickerSelectStyles,
                      placeholder: {
                        color: '#D1D8DF',
                      }
                    }}
                    items={breeds.map((item, index) => (
                    {
                      label: item,
                      key: index,
                      value: item,
                    } 
                    ))}            
                  />
                </View>
                <Text style={styles.errorText}> {props.touched.breed && props.errors.breed} </Text>
                <TouchableOpacity 
                  style={styles.dogButton} 
                  onPress={() => {
                    props.handleSubmit(); 
                    navigation.navigate("Home");
                  }}
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 330,
    backgroundColor: '#505050',
    borderRadius: 25,
    height: 50,
    marginBottom: 5,
    marginTop: 5,
    padding: 15,
    color: '#D1D8DF'
  },
  inputAndroid: {
    width: 330,
    backgroundColor: '#505050',
    borderRadius: 25,
    height: 50,
    marginBottom: 5,
    marginTop: 5,
    padding: 15,
    color: '#D1D8DF'
  }
});

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#303030'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  dogButton: {
    width: 330,
    backgroundColor: '#fdd404',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'black',
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
    backgroundColor: '#505050',
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: '#D1D8DF',
  },
  imageContainer: {
    width: 300,
    height: 300,
  },
  pickerContainer: {
    justifyContent: 'center'
  }
});

export default AddDogScreen;

