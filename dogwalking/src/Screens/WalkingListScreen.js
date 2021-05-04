import React, { useState, useEffect, useContext } from "react"
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native"
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../Navigation/AuthProvider";

const WalkingListScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  function Walks() {
    const [walk, setWalk] = useState([]);
    const [dog, setDog] = useState([]);
    const [pictureUri, setPictureUri] = useState([]);
    var curDog;
    useEffect(() => {
      const subscriber = firestore()
      .collection("Walks")
      .where("user", "==", `${user.uid}`)
      .onSnapshot((querySnapshot) => {
        const walks = [];
        querySnapshot.forEach(documentSnapshot => {
          //check for array later
          // setDog(documentSnapshot.get("name").toString());
          // setDog(dog => [...dog, documentSnapshot.get("name").toString()]);
          walks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setWalk(walks);
      });
      return () => subscriber();
    }, []);
    // for(let i = 0; i < dog.length; i++) {
    //   console.log(i);
    //   curDog = dog[i];
    //   console.log(curDog);
    //   firestore()
    //   .collection("Dogs")
    //   .where("user", "==", `${user.uid}`).where("name", "==", `${curDog}`)
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(documentSnapshot => {
    //       setPictureUri(pictureUri => [...pictureUri, documentSnapshot.get("pictureUri").toString()]);
    //     })
    //   })
    // }
    return (
      <FlatList
        data={walk}
        extraData={pictureUri}
        renderItem={({item, index}) => (
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
                distance: item.distance
              })}>
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={styles.container}>
                    <Text style={styles.underline}>Name</Text>
                    <Text style={styles.textColor}>{item.name}</Text>
                    <Text style={styles.underline}>Date</Text>
                    <Text style={styles.textColor}>{item.date}</Text>
                  </View>
                  <View style={styles.container}>
                    <Text style={styles.underline}>Distance</Text>
                    <Text style={styles.textColor}>{item.distance.toFixed(2)}</Text>
                    <Text style={styles.underline}>Time</Text>
                    <Text style={styles.textColor}>{item.time}</Text>
                  </View>
                </View>
              </View>
              <Text>{pictureUri[index]}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    )
  }
return (
  <View style={styles.backgroundContainer}>
    <Walks></Walks>
  </View>
)
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#303030'
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#505050',
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
    textDecorationLine: 'underline',
    color: '#D1D8Df'
  },
  container: {
    justifyContent: 'space-evenly'
  },
  textColor: {
    color: '#D1D8Df'
  },
  pictureContainer: {
    width: 85,
    height: 85,
    borderRadius: 85/2,
  },
});


export default WalkingListScreen