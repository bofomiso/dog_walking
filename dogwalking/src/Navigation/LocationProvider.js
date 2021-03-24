import React, { createContext, useState } from "react";
import { State } from "react-native-gesture-handler";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null); //current location being read
  const [recording, setRecording] = useState(false); 
  const [locations, setLocations] = useState([]); 
  return (
    <LocationContext.Provider
      value={{
        recording,
        setRecording,
        locations,
        setLocations,
        currentLocation, 
        setCurrentLocation,
        addLocation: (location, tracking) => {
          setCurrentLocation(location);
          //console.log(currentLocation);
          if(tracking) {
            //console.log("Hello");
            setLocations(locations => [...locations, location]);
            // setLocations(currentLocation);
            // locations: [...state.locations, locations];
          }
          // else{
          //   setLocations([]);
          // }

        },
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