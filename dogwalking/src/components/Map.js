import React, { useContext, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native"; 
import MapView, { Polyline } from "react-native-maps";
import { LocationContext } from "../Navigation/LocationProvider"


export default function Map() {
  const { currentLocation, locations } = useContext(LocationContext)

  if(!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200}} />;
  }
  return (
    <MapView
      style={styles.mapView}
      showsUserLocation
      followsUserLocation={true}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.0777,
        longitudeDelta: 0.0333,
      }}
    >
      <Polyline 
        coordinates={locations.map(loc => {
          const {latitude, longitude} = loc.coords;
          return {latitude, longitude}
        })}
      />
    </MapView>
  )
}

const styles = StyleSheet.create({
  mapView: {
    height: '50%'
  }
});