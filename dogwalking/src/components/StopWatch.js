import React, { useState } from "react";
import {
    StyleSheet, 
    Text, 
    View, 
} from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";

export default function StopWatch({isStart, isReset}) {
  return (
      <Stopwatch
      laps
      msecs={false}
      start={isStart}
      reset={isReset}
      options={options}
      // getTime={(time) => {
      //   console.log(time);
      // }}
    />
  )
}

const styles = StyleSheet.create({})

const options = {
  container: {
    backgroundColor: '#1f6aba',
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
