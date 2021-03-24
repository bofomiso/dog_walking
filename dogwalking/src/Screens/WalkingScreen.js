import React, { useContext, useCallback }  from "react";
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

const WalkingScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused(); //keep track if screen is focused 
  const { recording, addLocation } = useContext(LocationContext);
  const callback = useCallback(location => {
    addLocation(location, recording);
  }, [recording]);
  //console.log(recording);
  const [err] = useLocation(isFocused || recording, callback);
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Map/>
      <View style={styles.text}>
        <TouchableOpacity onPress={() => navigation.navigate("Choose Dog")}>
          <Text>Pick your dog!</Text>
        </TouchableOpacity>
        <Text>This is the dog you chose {route.params?.dog} </Text>
        {err ? <Text> Please enable location services</Text> : null}
        <WalkingButton/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default WalkingScreen;