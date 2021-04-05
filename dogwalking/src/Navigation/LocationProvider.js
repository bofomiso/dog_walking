import React, { createContext, useState } from "react";
import haversine from "haversine";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null); //current location being read
  const [recording, setRecording] = useState(false); 
  const [locations, setLocations] = useState([]);
  const [distanceTraveled, setDistanceTraveled] = useState(0);
  const [prevLatLng, setPrevLatLng] = useState({latitude: 0, longitude: 0});
  return (
    <LocationContext.Provider
      value={{
        recording,
        setRecording,
        locations,
        setLocations,
        currentLocation, 
        setCurrentLocation,
        distanceTraveled,
        setDistanceTraveled,
        prevLatLng,
        setPrevLatLng,
        addLocation: (location, tracking) => {
          const calcDistance = (latlng) => {
            prevlatlng = {latitude: location.coords.latitude, longitude: location.coords.longitude}; 
            return haversine(prevlatlng, latlng) || 0;
          } 
          setCurrentLocation(location);
          const latlng = {latitude: location.coords.latitude, longitude: location.coords.longitude}; // new latlng
          if(tracking) {
            setLocations(locations => [...locations, location]);
            //const temp = locations[locations.length-1];
            //setPrevLatLng(locations[locations.length-1].coords.latitude, locations[locations.length-1].coords.longitude);
            //console.log(currentLocation.coords.longitude);
            // setDistanceTraveled()

          }
          // else{
            //   setLocations([]);
            // }
            
          },
          // calcDistance: (newLatLng, prevLatLng) => {
            //     return (haversine(prevLatLng, newLatLng) || 0);
            // },
        startTracking: () => {
          setRecording(true);
        },
        stopTracking: () => {
          setRecording(false);
        }
        
        
      }}
    >
        {children}
    </LocationContext.Provider>
  );
};