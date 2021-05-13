import React, { createContext, useState, useContext } from "react";
import firestore from "@react-native-firebase/firestore";

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
        startTracking: () => {
          setRecording(true);
        },
        stopTracking: () => {
          setRecording(false);
        },
        saveMap: async (dogName, time, dogUid, userUid) => {
          await firestore()
          .collection("Walks")
          .add({
            dogUid: dogUid,
            user: userUid,
            name: dogName,
            time: time,
            locations: locations,
            date: currentDate,
            timeOfDay: currentTime,
            dayOfWeek: day,
            distance: distanceTraveled,
            createdAt: firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            firestore().collection("Dogs")
            .doc(`${dogUid}`+`${dogName}`)
            .update({
              totalDistance: firestore.FieldValue.increment(Number(distanceTraveled.toFixed(2))),
              totalWalks: firestore.FieldValue.increment(1),
            })
          })
        },
        resetValues: () => {
          setLocations([]);
          setPrevLatLng(0.00);
          setDistanceTraveled(0.00);
        }
      }}
    >
        {children}
    </LocationContext.Provider>
  );
};