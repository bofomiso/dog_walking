import React, { useState,useContext } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
} from 'react-native'
import { LocationContext } from "../Navigation/LocationProvider";

export default function WalkingButton({ isStart, isReset }) {
  const { startTracking, stopTracking, recording, setLocations } = useContext(LocationContext);
  const [disableButton, setDisableButton] =  useState(true);
  return (
      <>
      <View style={styles.row}>
        {recording ? (
          <TouchableOpacity
            style={styles.circle} 
            onPress={() => {
              setDisableButton(false);
              stopTracking();
              isStart(false);
              isReset(false);
            }}
          >
            <Text style={styles.text}>Stop</Text>
          </TouchableOpacity>
        ) : (
            <TouchableOpacity
              style={styles.circle} 
              onPress={() => {
                startTracking();
                isStart(true);
                isReset(false);
              }}
            >
              <Text style={styles.text}>Start</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.circle} 
            disabled={disableButton ? true : false}
            onPress={() => {
              setLocations([]);
              isReset(true);
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
});

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};
