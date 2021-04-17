import React, { useContext, useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native'
import Divider from "../components/Divider";
import MapView, { Polyline } from "react-native-maps";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../Navigation/AuthProvider";

const WalkingDetailsScreen = ({ route }) => {
  const { name, day, locations, time, currentTime, date } = route.params;
  const initialCoords = locations[0].coords;
  const { user } = useContext(AuthContext);
  // var pictureUri = "";
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
        <Text>{date} - {currentTime}</Text>
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
              coordinates={locations.map(loc => {
                const {latitude, longitude} = loc.coords;
                return {latitude, longitude}
              })}
            />
        </MapView>
        <View style={styles.details}>
          <Image
            source={{ uri: pictureUri }}
            style={styles.pictureContainer}
          />
          <Text style={styles.nameText}> Name: {name} </Text>
        </View>
        <Divider/>
        <Text style={styles.detailsText}>Distance: ---</Text>
        <Text style={styles.detailsText}>Time: {time}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginLeft: 15,
  },
  dayText: {
      fontSize: 30
  },
  mapView: {
      height: '50%',
  },
  details: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 30,
    textAlign: 'center'
  },
  detailsText: {
    fontSize: 30,
  },
  pictureContainer: {
    width: 85,
    height: 85,
    borderRadius: 85/2,
  },
});

export default WalkingDetailsScreen

