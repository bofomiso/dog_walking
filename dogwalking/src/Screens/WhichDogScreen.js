import React, { useState, useEffect, useContext } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
} from 'react-native'
import firestore from "@react-native-firebase/firestore";
import Card from "../components/Card"
import { AuthContext } from "../Navigation/AuthProvider";
import { DogContext } from "../Navigation/DogProvider";

const WhichDogScreen = ({ navigation, route }) => {
  const [dogName, setDogName] =  useState();
  const { user } = useContext(AuthContext);
  const { userDogs } = useContext(DogContext);
  const chooseDog = (dog) => {
    setDogName(dog);
  }; 
  function Dogs() {
    // const [dogs, setDogs] = useState([]);
    // useEffect(() => {
    //   const subscriber = firestore()
    //     .collection("Dogs")
    //     .where("user", "==", `${user.uid}` )
    //     .orderBy("createdAt", "asc")
    //     .onSnapshot((querySnapshot) => {
    //       const dogs = [];
    //       querySnapshot.forEach(documentSnapshot => {
    //         dogs.push({
    //           ...documentSnapshot.data(),
    //           key: documentSnapshot.id,
    //         });
    //       });
    //       setDogs(dogs);
    //     });
    //   return () => subscriber();
    // }, []);
    return (
      <FlatList
        data={userDogs}
        keyExtractor={item => item.dogUid}
        renderItem={({item}) => (
          <View>
              <Card
                name={item.name}
                age={item.age}
                breed={item.breed}
                pictureUri={item.pictureUri}
                setDog={chooseDog}
                dogUid={item.dogUid}
              >
              </Card>
          </View>
        )}
      />
    );
  }
  return (
      <View style={styles.container}>
          <Dogs></Dogs>
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#303030',
    },
  cardText: {
    fontSize: 20,
    padding: 5
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  pictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 100/2
  }
});

export default WhichDogScreen