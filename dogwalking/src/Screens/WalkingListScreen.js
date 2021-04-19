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

const WalkingListScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [pictureUri, setPictureUri] = useState(null);
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
                dogName: item.name,
              })}>
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={styles.container}>
                    <Text style={styles.underline}>Name</Text>
                    <Text>{item.name}</Text>
                    <Text style={styles.underline}>Date</Text>
                    <Text>{item.date}</Text>
                  </View>
                  <View style={styles.container}>
                    <Text style={styles.underline}>Distance</Text>
                    <Text>0.00 Miles</Text>
                    <Text style={styles.underline}>Time</Text>
                    <Text>{item.time}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginTop: 5,
    marginBottom: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  container: {
    justifyContent: 'space-evenly'
  }
});


export default WalkingListScreen