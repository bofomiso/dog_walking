import React, { createContext, useContext, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  return (
    <MapContext.Provider
    value={{
      createMap: async (locations, dogName, time, userId, currentDate, currentTime, day, distanceTraveled, dogUid) => {
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
        .then(() => {
          firestore()
            .collection("Dogs")
            .doc(`${dogUid}`+`${dogName}`)
            .update({
              totalDistance: firestore.FieldValue.increment(Number(distanceTraveled.toFixed(2))),
              totalWalks: firestore.FieldValue.increment(1),
            })
        })
      },
        }}
      >
          {children}
      </MapContext.Provider>
  )
}