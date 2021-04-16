import React, { useState,useContext } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    Alert 
} from 'react-native'
import { LocationContext } from "../Navigation/LocationProvider";
import useSaveMap from "../Hooks/useSaveMap";
import useTimer from "../Hooks/useTimer";
import { dateHelper } from "../utils/Helpers";

export default function WalkingButton({ dogName }) {
  const { 
    startTracking, 
    stopTracking, 
    recording, 
    setCurrentTime, 
    setCurrentDate, 
    setDay,
    setLocations,
    setPrevLatLng,
  } = useContext(LocationContext);
  const [disableButton, setDisableButton] =  useState(true);
  const { time, handleStart, handlePause, handleResume, handleReset, } = useTimer();
  const [saveMap] = useSaveMap();
  const formattedTime = (time) => {
    const getSeconds = `0${(time % 60)}`.slice(-2)
    const minutes = `${Math.floor(time / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2)
    return `${getHours}:${getMinutes}:${getSeconds}`
  }
  return (
    <>
      <View style={styles.stopWatchContainer}> 
        <Text style={styles.clockText}> {formattedTime(time)}</Text>
      </View>
      <View style={styles.row}>
        {recording ? (
          <TouchableOpacity
          style={styles.circle} 
          onPress={() => {
            setDisableButton(false);
            stopTracking();
            handlePause();
          }}
          >
            <Text style={styles.text}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
          style={styles.circle} 
          onPress={() => {
            if(typeof dogName == 'undefined') {
              Alert.alert("You need to pick a dog before you can start a walk");
            }
            else{
              dateHelper(setCurrentDate, setCurrentTime, setDay);
              startTracking();
              //calcDistance();
              handleStart();
            }
          }}
            >
              <Text style={styles.text}>Start</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.circle} 
            disabled={disableButton ? true : false}
            onPress={() => {
              if(typeof dogName == 'undefined') {
                Alert.alert("You did not pick a dog");
              }
              else{
                //saveMap(dogName, formattedTime(time));
                setLocations([]);
                setPrevLatLng(0.00);
                handleReset();
              }
            }}
          >
            <Text style={styles.text}>Save Walk </Text>
          </TouchableOpacity>
          </View>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      backgroundColor: '#1f6aba',
      alignItems: 'center',        
      justifyContent: 'center',
  },
  text: {
      color: 'white',
      fontSize: 15
  },
  row: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: 10,
  },
  stopWatchContainer: {
    // backgroundColor: '#1f6aba',
    padding: 5,
    borderRadius: 5,
    // width: 200,
    alignItems: 'center',
    marginBottom: 10
    
  },
  clockText: {
    fontSize: 25,
    color: "black",
  },

});


