import React from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
} from "react-native";
import MapView from "react-native-maps";

const WalkingScreen = ({ navigation }) => {  
  return (
    <View style={{ flex: 1}}>
      <MapView
        style={{ flex: 0.6 }}
        showsUserLocation
        followsUserLocation={true}
        initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0333,
            longitudeDelta: 0.0333,
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Choose Dog")}>
        <Text>Pick your dog!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default WalkingScreen;