import React from "react";
import { useContext } from "react";
import {
   Text, 
   View, 
   StyleSheet, 
   TouchableOpacity,
   SafeAreaView, 
} from "react-native";
import { AuthContext } from "../Navigation/AuthProvider";
import Divider from "../components/Divider"
import HorizontalDogList from "../components/HorizontalDogList";
import RecentWalk from "../components/RecentWalk";

const HomeScreen = ({ navigation }) => {
  
  const { logout } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.dogsText}> Your dogs</Text>
      <Divider/>
      <View style={styles.horizontal}>
        <HorizontalDogList/>
      </View>
      <Divider/>
      <Text style={styles.dogsText}>Recent walk</Text>
      <RecentWalk/>
      <TouchableOpacity onPress={() => navigation.navigate("Walks")}>
        <Text style={styles.text}> Look at your walks!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => logout()}>
        <Text style={styles.text}> Logout </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 20
  },
  circle: {
    width: 85,
    height: 85,
    borderRadius: 85 / 2,
    backgroundColor: '#D1D8Df',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // backgroundColor: 'black'
  },
  dogsText: {
    fontSize: 25,
    paddingTop: 5,
  },
});
export default HomeScreen;