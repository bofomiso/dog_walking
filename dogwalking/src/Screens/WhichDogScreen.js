import React, { useState, useEffect } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  TouchableOpacity,
  Image, 
} from 'react-native'
import firestore from "@react-native-firebase/firestore";
import Card from "../components/Card"


const WhichDogScreen = ({ navigation, route }) => {
  const [dogName, setDogName] =  useState();
  const chooseDog = (dog) => {
    setDogName(dog);
  }; 
  function Dogs() {
    const [dogs, setDogs] = useState([]);
    useEffect(() => {
      const subscriber = firestore()
        .collection("Dogs")
        .onSnapshot((querySnapshot) => {
          const dogs = [];
          querySnapshot.forEach(documentSnapshot => {
            dogs.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setDogs(dogs);
        });
      return () => subscriber();
    }, []);
    return (
      <FlatList
        data={dogs}
        renderItem={({item}) => (
          <View>
              <Card
                name={item.name}
                age={item.age}
                breed={item.breed}
                pictureUri={item.pictureUri}
                setDog={chooseDog}
              >
              </Card>
          </View>
        )}
      />
    );
  }
  return (
      <View>
          <Dogs></Dogs>
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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