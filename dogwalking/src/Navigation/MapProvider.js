import React, { createContext, useContext, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [map, setMap] = useState([]);
  return (
    <MapContext.Provider
    value={{
      getMap: async () => {
        
      },
      createMap: async (locations, dogName, time, userId, currentDate, currentTime, day, distanceTraveled) => {
              //make request to firebase
              await firestore()
              .collection("Walks")
              .add({
                user: userId,
                name: dogName,
                time: time,
                locations: locations,
                date: currentDate,
                timeOfDay: currentTime,
                dayOfWeek: day,
                distance: distanceTraveled,
                createdAt: firestore.FieldValue.serverTimestamp(),
              })
      },
        }}
      >
          {children}
      </MapContext.Provider>
  )
}