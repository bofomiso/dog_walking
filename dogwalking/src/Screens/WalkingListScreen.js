import React, { useState, useEffect, useContext } from "react"
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList, 
} from "react-native"
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../Navigation/AuthProvider";

const WalkingListScreen = () => {
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
            <Text>{item.name}</Text>
            <Text>{item.time} </Text>

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