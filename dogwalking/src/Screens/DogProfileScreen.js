import React from "react";
import { StyleSheet,
   Text, 
   View,
   Alert,
   TouchableOpacity
} from "react-native";
import Divider from "../components/Divider";
import FastImage from "react-native-fast-image";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

const DogProfileScreen = ({ navigation,route }) => {
  const {
    name,
    age,
    breed,
    pictureUri,
    totalDistance,
    totalWalks,
    dogId,
    userId
  } = route.params;
  return (
      <View style={styles.container}>
        <View style ={styles.pictureContainer}>
          <FastImage
            source={{ 
              uri: pictureUri,
              priority: FastImage.priority.high  
            }}
            style={styles.roundPicture}
          />
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Breed: </Text>
          <Text style={styles.text}>{breed}</Text>
        </View>
        <Divider/>
        <View style={styles.row}>
          <Text style={styles.text}>Age: </Text>
          <Text style={styles.text}>{age} years</Text>
        </View>
        <Divider/>
        <View style={styles.row}>
          <Text style={styles.text}>Total Distance: </Text>
          <Text style={styles.text}>{totalDistance}</Text>
        </View>
        <Divider/>
        <View style={styles.row}>
          <Text style={styles.text}>Total Walks: </Text>
          <Text style={styles.text}>{totalWalks}</Text>
        </View>
        <Divider/>
        <View style={styles.deleteView}>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => {
              Alert.alert(
                `${name}`,
                "Are you sure you want to delete " + `${name}` +
                ". All his walks will be delete as well.",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  {
                    text: "Delete",
                    onPress: async () =>
                      await firestore()
                      .collection('Dogs')
                      .doc(`${dogId}`+`${name}`)
                      .delete()
                      .then(async () => {
                        const collectionReference = await firestore()
                          .collection("Walks")
                          .where("user", "==", `${userId}`).where("name", "==", `${name}`)
                          .get()
                        const batch = firestore().batch()
                        collectionReference.forEach(documentSnapshot => {
                          batch.delete(documentSnapshot.ref);
                        });
                        await batch.commit();
                        let picRef = storage().ref(`${dogId}`+`${name}`)
                        picRef.delete();
                        navigation.navigate("Home");
                      }) 
                  }
                ]
              )
            }}
          >
            <Text style={styles.deleteText}>Delete Dog</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
  },
  roundPicture: {
    marginTop: '10%',
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
  },
  pictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 30,
    marginVertical: '2%',
    color: '#D1D8Df'
  },
  text: {
    fontSize: 20,
    color: '#D1D8Df',
    marginVertical: '1%'
  },
  row: {
    flexDirection: 'row',
  },
  underline: {
    textDecorationLine: 'underline',
    color: '#D1D8DF',
    fontSize: 20,
  },
  deleteView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  deleteButton: {
    width: 330,
    backgroundColor: '#fdd404',
    borderRadius: 25,
    height: 50,
    marginVertical: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 15,
  }
})

export default DogProfileScreen

