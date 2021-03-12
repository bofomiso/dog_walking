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


const WhichDogScreen = () => {
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
            <TouchableOpacity>
              <Card>
                <Image
                  source={{ uri: item.pictureUri }}
                  style={styles.pictureContainer}
                />
                <View style={styles.row}>
                  <Text style={styles.cardText}> {item.name} </Text>
                  <Text style={styles.cardText}> {item.breed} </Text>
                  <Text style={styles.cardText}> Age: {item.age} </Text>
                </View>
              </Card>
            </TouchableOpacity>
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