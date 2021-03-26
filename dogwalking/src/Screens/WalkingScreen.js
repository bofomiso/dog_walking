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

const WalkingScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused(); //keep track if screen is focused 
  const { recording, addLocation } = useContext(LocationContext);
  const callback = useCallback(location => {
    addLocation(location, recording);
  }, [recording]);
  //console.log(recording);
  const [err] = useLocation(isFocused || recording, callback);
  const [StopwatchStart, setStopwatchStart] = useState(false); //start stopwatch
  const [StopwatchReset, setStopwatchReset] = useState(false); //reset stopwatch
  const StartWatch = (isStart) => {
    setStopwatchStart(isStart);
  }; 
  const ResetWatch = (isReset) => {
    setStopwatchReset(isReset);
  }; 
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Map/>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Choose Dog")}>
          <Text style={styles.chooseDog}>Who are you taking?</Text>
        </TouchableOpacity>
        <Text> {route.params?.dog} it is </Text>
        {err ? <Text> Please enable location services</Text> : null}
        <StopWatch isStart={StopwatchStart} isReset={StopwatchReset}/>
      </View>

        <WalkingButton isStart={StartWatch} isReset={ResetWatch}/>
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
  }


});
export default WalkingScreen;