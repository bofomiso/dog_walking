import React, { useState,useContext, useCallback }  from "react";
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView, 
} from "react-native";
import Map from "../components/Map";
import { LocationContext } from "../Navigation/LocationProvider"
import useLocation from "../Hooks/useLocation";
import{ useIsFocused } from "@react-navigation/native";
import WalkingButton from "../components/WalkingButton";
import StopWatch from "../components/StopWatch";
import Divider from "../components/Divider"
import { MapContext } from "../Navigation/MapProvider";


const WalkingScreen = ({ navigation, route }) => {
  let times;
  const isFocused = useIsFocused(); //keep track if screen is focused 
  const { recording, addLocation } = useContext(LocationContext);
  const callback = useCallback(location => {
    addLocation(location, recording);
  }, [recording]);
  const [err] = useLocation(isFocused || recording, callback);
  //console.log(currentTime);
  // console.log(currentDate);
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Map/>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Choose Dog")}>
          <Text style={styles.chooseDog}>Who are you taking?</Text>
        </TouchableOpacity>
      </View>
      <Divider/>
      <View style={styles.container}>
        <Text styles={styles.chooseDog}> {route.params?.dog} it is </Text>
        {err ? <Text> Please enable location services</Text> : null}
        {/* <StopWatch isStart={StopwatchStart} isReset={StopwatchReset} time={time} /> */}
      </View>
      <Divider/>
      <WalkingButton dogName={route.params?.dog} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: 10,
  },
  chooseDog: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default WalkingScreen;