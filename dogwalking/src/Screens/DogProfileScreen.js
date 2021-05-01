import React from "react";
import { StyleSheet,
   Text, 
   View,
   Image, 
} from "react-native";
import Divider from "../components/Divider";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const DogProfileScreen = ({ route }) => {
  const {
    name,
    age,
    breed,
    pictureUri,
    totalDistance,
    totalWalks,
  } = route.params;
  return (
      <View style={styles.container}>
        <View style ={styles.pictureContainer}>
          <Image
            source={{ uri: pictureUri }}
            style={styles.roundPicture}
          />
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>breed: </Text>
          <Text style={styles.text}>{breed}</Text>
        </View>
        <Divider/>
        <View style={styles.row}>
          <Text style={styles.text}>age: </Text>
          <Text style={styles.text}>{age} years old</Text>
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
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  roundPicture: {
    marginTop: '5%',
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
  },
  pictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 25,
    marginBottom: '2%'
  },
  text: {
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
  }
})

export default DogProfileScreen

