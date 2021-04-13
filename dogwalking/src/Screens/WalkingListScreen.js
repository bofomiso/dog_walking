import React, { useState, useEffect, useContext } from "react"
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  TouchableOpacity,
} from "react-native"
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../Navigation/AuthProvider";
import Divider from "../components/Divider";
 
const WalkingListScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  function Walks() {
    const [walk, setWalk] = useState([]);
    useEffect(() => {
      const subscriber = firestore()
      .collection("Walks")
      .where("user", "==", `${user.uid}`)
      .onSnapshot((querySnapshot) => {
        const walks = [];
        querySnapshot.forEach(documentSnapshot => {
          walks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setWalk(walks);
      });
      return () => subscriber();
    }, []);
    return (
      <FlatList
        data={walk}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity onPress={
              () => navigation.navigate("WalkDetails", {
                name: item.name,
                day: item.dayOfWeek,
                locations: item.locations,
                time: item.time,
                currentTime: item.timeOfDay,
                date: item.date,
              })}>
              <Text>{item.name}</Text>
              <Text>{item.time}</Text>
            </TouchableOpacity>
            <Divider/>
          </View>
        )}
      />

    )
  }
return (
  <View>
    <Walks></Walks>
  </View>
)
}

const styles = StyleSheet.create({})


export default WalkingListScreen