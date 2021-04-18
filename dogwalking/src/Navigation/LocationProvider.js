import React, { createContext, useState } from "react";
import haversine from "haversine";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(""); //current location being read
  const [recording, setRecording] = useState(false); 
  const [locations, setLocations] = useState([]);
  const [distanceTraveled, setDistanceTraveled] = useState(0.00);
  const [prevLatLng, setPrevLatLng] = useState({});
  const [curLatLng, setCurLatLng] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [day, setDay] = useState("");
  return (
    <LocationContext.Provider
      value={{
        currentLocation, 
        setCurrentLocation,
        recording,
        setRecording,
        locations,
        setLocations,
        distanceTraveled,
        setDistanceTraveled,
        prevLatLng,
        setPrevLatLng,
        curLatLng,
        setCurLatLng,
        currentDate,
        setCurrentDate,
        currentTime,
        setCurrentTime,
        day,
        setDay,
        addLocation: (location, tracking) => {
          setCurrentLocation(location);
          if(tracking) {
            setLocations(locations => [...locations, location]);
            setCurLatLng({latitude: location.coords.latitude, longitude: location.coords.longitude})
          }
        },
        calcDistance: () => {
          setDistanceTraveled(distanceTraveled + haversine(prevLatLng, curLatLng, {unit: "mile"}) || 0);
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