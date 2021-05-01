import React, { useContext } from "react";
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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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
      <Divider/>
      <TouchableOpacity style={styles.chooseWalk} onPress={() => navigation.navigate("Walks")}>
        <Text style={styles.text}> Look at your walks!</Text>
        <FontAwesome5  
          style={styles.icon}
          color='#fdd404' 
          name="chevron-right" 
          size={20}
        />
      </TouchableOpacity>
      <Divider/>
      <TouchableOpacity onPress={() => logout()}>
        <Text style={styles.text}> Logout </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030'
  },
  text: {
    fontSize: 15,
    marginTop: '1%',
    marginBottom: '1%',
    marginLeft: 10,
    color: '#D1D8Df'
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
    // color: '#FFFF',
    color: '#D1D8Df'
  },
  pictureContainer: {
    width: 85,
    height: 85,
    borderRadius: 85/2,
  },
  chooseWalk: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginTop: '1%',
    marginBottom:'1%',
    marginRight: 10,
  }
});
export default HomeScreen;