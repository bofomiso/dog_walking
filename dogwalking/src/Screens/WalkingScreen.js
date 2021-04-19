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
import Divider from "../components/Divider";
import Distance from "../components/Distance";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const WalkingScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused(); //keep track if screen is focused 
  const { recording, addLocation, setDistanceTraveled, setPrevLatLng } = useContext(LocationContext);
  const callback = useCallback(location => {
    addLocation(location, recording);
  }, [recording]);
  const [err] = useLocation(isFocused || recording, callback);
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Map/>
      <Divider/>
      <TouchableOpacity style={styles.chooseDog} onPress={() => navigation.navigate("Choose Dog")}>
        <Text style={styles.dogText}>Choose your dog</Text>
        <FontAwesome5  style={styles.icon} name="chevron-right" size={20}/>
      </TouchableOpacity>
      <Divider/>
      <View style={styles.showDog}>
        <View style={styles.circle}>
        </View>
        <Text styles={styles.dogText}> {route.params?.dog} It is </Text>
        {err ? <Text> Please enable location services</Text> : null}
      </View>
      <Divider/>
      <View style={styles.dogText}>
        <Distance/>
      </View>
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
  dogText: {
    fontSize: 15,
    marginTop: '1%',
    marginBottom: '1%',
    marginLeft: 10,
  },
  chooseDog: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginTop: '1%',
    marginBottom:'1%',
    marginRight: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#D1D8Df',
    marginTop: '1%',
    marginBottom: '1%',
    marginLeft: 10,
  },
  showDog: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default WalkingScreen;