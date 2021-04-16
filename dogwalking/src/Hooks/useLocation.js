import { useState, useEffect } from "react";
import { 
  Accuracy, 
  requestPermissionsAsync, 
  watchPositionAsync 
} from "expo-location";

export default (tracking, callback) => {
  const [err, setErr] = useState(null); //determine if user allows location services 
    //useEffect will run start tracking if tracking is true.
    useEffect(() => {
      let subscriber;
      const startTracking = async () => {
        try {
          const { granted } = await requestPermissionsAsync();
          subscriber = await watchPositionAsync({
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000, //1 second
            distanceInterval: 10 //10 meters
          }, 
            //console.log(location);
            //addLocation(location);
            callback
          );
          if (!granted) {
            throw new Error('Location permission not granted');
          }
        } catch (e) {
          setErr(e);
        }
      };

      if(tracking) {
        startTracking();
      }
      else {
        if(subscriber) {
          subscriber.remove(); //stop tracking, user switches screen
        }
        subscriber = null;
      }
      return () => { //clean up function so watchPosAsync isn't getting called multiple times
        if(subscriber) {
          subscriber.remove();
        }  
      };
    }, [tracking, callback]);

    return [err];
};