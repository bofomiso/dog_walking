import React, { useState, useRef } from "react";
import {
    StyleSheet, 
    Text, 
    View, 
} from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";
import { MapContext } from "../Navigation/MapProvider";
import useTimer from "../Hooks/useTimer";

export default function StopWatch({isStart, isReset, time }) {
  //const [time, setTime] = useState(0); //timer variable
  // const { time } =  useTimer();
  // const countRef = useRef(null);
  // const handleStart = () => {
  //   if(isStart = true) {
  //     countRef.current = setInterval(() => {
  //       setTime((time) => time + 1)
  //     }, 1000)
  //   }
  // }

  // const handlePause = () => {
  //   clearInterval(countRef.current);
    
  // }

  // const handleResume = () => {
  //   if(isStart = true) {
  //     countRef.current = setInterval(() => {
  //       setTime((time) => time + 1)
  //     }, 1000)
  //   }
  // }

  // const handleReset = () => {
  //   clearInterval(countRef.current);
  //   setTime(0);
  // }
  //console.log(time);
  const formattedTime = (time) => {
    const getSeconds = `0${(time % 60)}`.slice(-2)
    const minutes = `${Math.floor(time / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2)

    return `${getHours}:${getMinutes}:${getSeconds}`
  }
  return (
    <View style={styles.container}> 
      <Text style={styles.text}> {formattedTime(time)}</Text>
    </View>
    //   <Stopwatch
    //   laps
    //   msecs={false}
    //   start={isStart}
    //   reset={isReset}
    //   options={options}
    //   getTime={(time) => {
    //     console.log(time);
    //   }}
    // />
  )
}

const styles = StyleSheet.create({
  stopWatchContainer: {
    backgroundColor: '#1f6aba',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    marginBottom: 10
  },
  clockText: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },

})

const options = {
  container: {
    backgroundColor: '#1f6aba',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    marginBottom: 10
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};
