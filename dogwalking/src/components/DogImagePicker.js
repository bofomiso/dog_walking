import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

export default function DogImagePicker() {
  const [imageSource, setImageSource] = useState(null);

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
            resiezeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
