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
  const medal = () => {
    
  }
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
})

export default DogProfileScreen

