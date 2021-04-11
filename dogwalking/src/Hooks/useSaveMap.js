import React, { useContext } from "react";
import { LocationContext } from "../Navigation/LocationProvider";
import { MapContext } from "../Navigation/MapProvider";
import { AuthContext } from "../Navigation/AuthProvider";

export default () => {
  const { createMap } = useContext(MapContext);
  const { locations, 
      setLocations, 
      currentTime, 
      currentDate, 
      day 
  } = useContext(LocationContext);
  const { user } = useContext(AuthContext);

  const saveMap =  async (dogName, time) => {
        await createMap(locations, dogName, time, user.uid, currentDate, currentTime, day);
        setLocations([]);
  };

  return [saveMap];
};