import React, { createContext, useState, useEffect } from "react";
import haversine from "haversine";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null); //current location being read
  const [recording, setRecording] = useState(false); 
  const [locations, setLocations] = useState([]);
  const [distanceTraveled, setDistanceTraveled] = useState(0);
  const [prevLatLng, setPrevLatLng] = useState({latitude: 0, longitude: 0});
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [day, setDay] = useState("");
  return (
    <LocationContext.Provider
      value={{
        recording,
        setRecording,
        locations,
        setLocations,
        currentLocation, 
        setCurrentLocation,
        currentDate,
        setCurrentDate,
        currentTime,
        setCurrentTime,
        day,
        setDay,
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
          //console.log("hello")
          // var date = new Date().getDate(); //get current day of the month
          // var month = new Date().getMonth() + 1; //get current Month
          // var year = new Date().getFullYear(); // get current Year
          // var hour = new Date().getHours();
          // var dayOfWeek = new Date().getDay();
          // var ampm = hour >= 12 ? "pm" : "am";
          // hour = hour % 12;
          // hour = hour ? hour : 12;
          // var min = new Date().getMinutes();
          // min = min < 10 ? "0" + min : min;

          // setCurrentDate(month + "/" + date + "/" + year);
          // // console.log(currentDate)
          // setCurrentTime(hour + ":" + min + " " + ampm);
          // console.log(currentTime);

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