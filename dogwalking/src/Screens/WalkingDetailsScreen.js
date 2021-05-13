import React, { useContext, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  View, 
  Image 
} from 'react-native'
import Divider from "../components/Divider";
import MapView, { Polyline } from "react-native-maps";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../Navigation/AuthProvider";
import FastImage from "react-native-fast-image";

const WalkingDetailsScreen = ({ route }) => {
  const { name, day, locations, time, currentTime, date, distance } = route.params;
  const initialCoords = locations[0].coords;
  const { user } = useContext(AuthContext);
  const [pictureUri, setPictureUri] = useState(null);
  firestore()
    .collection("Dogs")
    .where("user", "==", `${user.uid}`).where("name", "==", `${name}`)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        setPictureUri(documentSnapshot.get("pictureUri").toString());
      })
    })
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.date}>{date} - {currentTime}</Text>
        <Text style={styles.dayText}>{day}'s walk</Text>
        <Divider/>
        <MapView
          style={styles.mapView}
          initialRegion={{
            ...initialCoords,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
          }}
        >
            <Polyline
              strokeColor='#fdd404' 
              coordinates={locations.map(loc => {
                const {latitude, longitude} = loc.coords;
                return {latitude, longitude}
              })}
            />
        </MapView>
        <Divider/>
        <View style={styles.details}>
          <FastImage
            source={{ 
              uri: pictureUri, 
              priority: FastImage.priority.high
            }}
            style={styles.pictureContainer}
          />
          <Text style={styles.nameText}> Name: {name} </Text>
        </View>
        <Divider/>
        <View style={styles.row}>
          <View style={styles.stats}>
            <Text style={styles.detailsText}>Distance</Text>
            <Text style={styles.results}>{distance.toFixed(2)} miles</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.detailsText}>Time</Text>
            <Text style={styles.results}>{time}</Text>
          </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#303030'
  },
  dayText: {
      fontSize: 30,
      marginBottom: '1%',
      marginLeft: '1%',
      color: '#D1D8Df'
  },
  mapView: {
      height: '50%',
      marginTop: "2%"
  },
  details: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#D1D8Df'
  },
  detailsText: {
    fontSize: 30,
    textDecorationLine: 'underline',
    color: '#D1D8Df'
  },
  pictureContainer: {
    width: 85,
    height: 85,
    borderRadius: 85/2,
    marginLeft: '1%'
  },
  date: {
    marginTop: '1%',
    marginLeft: '1%',
    color: '#D1D8Df'
  },
  row: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  stats: {
    justifyContent: 'space-evenly',
    marginTop: '1%',
  },
  results: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D1D8Df'
  },
});

export default WalkingDetailsScreen

