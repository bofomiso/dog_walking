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
import { DogContext } from "../Navigation/DogProvider"
import FastImage from "react-native-fast-image";

const WalkingListScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  function Walks() {
    const [walk, setWalk] = useState([]);
    const [dog, setDog] = useState([]);
    const { userDogs } = useContext(DogContext);
    const [pictureUri, setPictureUri] = useState([]);
    useEffect(() => {
      const subscriber = firestore()
      .collection("Walks")
      .where("user", "==", `${user.uid}`)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const walks = [];
        querySnapshot.forEach(documentSnapshot => {
          //setDog(dog => [...dog, documentSnapshot.get("name").toString()]);
          walks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setWalk(walks);
      });
      // firestore()
      //   .collection("Dogs")
      //   .where("user", "==", `${user.uid}`)
      //   .get()
      //   .then(querySnapshot => {
        //     querySnapshot.forEach(documentSnapshot => {
          //       let tempMap = new Map(pictureUri);
          //       tempMap[documentSnapshot.get("name")] = documentSnapshot.get("pictureUri");
          //       // console.log(documentSnapshot.get("name"));
          //       // console.log(tempMap);
          //       // console.log(documentSnapshot.data());
          //       setPictureUri(tempMap);
          //     })
          //   })
          return () => subscriber();
        }, []);
        let picUri = [];
        for(let i = 0; i < walk.length; i++) {
          for(let k = 0; k < userDogs.length; k++) {
            if(walk[i].name === userDogs[k].name) {
              picUri.push(userDogs[k].pictureUri);
            }
          }
        }
        // console.log(picUri);
    return (
      <FlatList
        data={walk}
        extraData={picUri}
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
                  <View>
                    <FastImage
                      source={{
                        uri: picUri[index],
                        priority: FastImage.priority.high
                      }}
                      style={styles.pictureContainer}
                    />
                  </View>
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
              {/* <Text>{pictureUri[index]}</Text> */}
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