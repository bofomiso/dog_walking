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
import { formattedTime } from "../utils//FormattedTime";
import Distance from "../components/Distance";

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
    setDistanceTraveled,
  } = useContext(LocationContext);
  const [disableSave, setDisableSave] =  useState(true);
  const [disableStart, setDisableStart] = useState(false);
  const { time, handleStart, handlePause, handleResume, handleReset, } = useTimer();
  const [saveMap] = useSaveMap();
  const isDisabled = (isStart, isSave) => {
    setDisableStart(isStart);
    setDisableSave(isSave);
  } 
  return (
    <>
      <View style={styles.stopWatchContainer}> 
        <Text style={styles.clockText}>Time: {formattedTime(time)}</Text>
        <Distance/>
      </View>
      <View style={styles.row}>
          <TouchableOpacity
          style={[styles.circle, disableStart ? styles.disableButton : styles.circle]}
          disabled={disableStart ? true : false}
          onPress={() => {
            if(typeof dogName == 'undefined') {
              Alert.alert("You need to pick a dog before you can start a walk");
            }
            else{
              isDisabled(true, false);
              dateHelper(setCurrentDate, setCurrentTime, setDay);
              startTracking();
              handleStart();
            }
          }}
            >
              <Text style={styles.text}>Start</Text>
            </TouchableOpacity>
          {/* )} */}
          <TouchableOpacity 
            style={[styles.circle, disableSave ? styles.disableButton : styles.circle]} 
            disabled={disableSave? true : false}
            onPress={() => {
              if(typeof dogName == 'undefined') {
                Alert.alert("You did not pick a dog");
              }
              else{
                isDisabled(false, true);
                stopTracking();
                saveMap(dogName, formattedTime(time));
                // setLocations([]);
                // setPrevLatLng(0.00);
                // setDistanceTraveled(0.00);
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
      backgroundColor: '#fdd404',
      alignItems: 'center',        
      justifyContent: 'center',
  },
  disableButton: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#D1D8Df',
    alignItems: 'center',        
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 15
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: 10,
  },
  stopWatchContainer: {
    marginTop: '1%',
    marginBottom: '1%',
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  clockText: {
    fontSize: 15,
    color: "#FFFF",
  },

});


