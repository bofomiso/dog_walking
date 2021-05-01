import React, { useEffect, useContext } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
} from 'react-native'
import { LocationContext } from "../Navigation/LocationProvider";
import haversine from "haversine";

export default function Distance() {
  const { distanceTraveled, setDistanceTraveled, prevLatLng, curLatLng, calcDistance, recording, locations, setPrevLatLng } = useContext(LocationContext);
  useEffect(() => {
      const interval = setInterval(() => {
          if(recording){
              //removed distanceTraveled
              //0.00 + haversine
              // updated value + haversine
              if(locations.length > 0) {
                setPrevLatLng({latitude: locations[locations.length-1].coords.latitude, longitude: locations[locations.length-1].coords.longitude });
                setDistanceTraveled(distanceTraveled + haversine(prevLatLng, curLatLng, {unit: "mile"})|| 0);
              }
            }
          }, 1000);
          return () => clearInterval(interval);
    }, [setDistanceTraveled, distanceTraveled, prevLatLng, curLatLng, recording, locations, setPrevLatLng]);
  return (
        <Text style={styles.distanceText}>Distance: {distanceTraveled.toFixed(2)} miles</Text>
  )
}

const styles = StyleSheet.create({
  distanceText: {
    fontSize: 15,
    color: '#FFFF'
  },
})
