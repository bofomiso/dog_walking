import React, { createContext, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export const DogContext = createContext();

export const DogProvider = ({ children }) => {
  const [userDogs, setUserDogs] = useState({});
  return (
    <DogContext.Provider
      value={{
        userDogs,
        setUserDogs,
      }}
    >
        {children}
    </DogContext.Provider>
  )
}