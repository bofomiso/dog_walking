import React, { useContext } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
} from 'react-native'
import { LocationContext } from "../Navigation/LocationProvider";

export default function WalkingButton() {
  const { startTracking, stopTracking, recording } = useContext(LocationContext);
  console.log(recording);
  return (
      <>
        {recording ? (
          <TouchableOpacity style={styles.circle} onPress={stopTracking}>
                  <Text style={styles.text}>Stop</Text>
          </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.circle} onPress={startTracking}>

                <Text style={styles.text}>Start</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.circle}>
              <Text style={styles.text}>Save Walk </Text>
          </TouchableOpacity>
      </>
  );
};

const styles = StyleSheet.create({
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
  }
});
