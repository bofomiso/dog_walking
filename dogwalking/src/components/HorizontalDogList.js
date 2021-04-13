import React, { useState, useContext, useEffect} from "react"
import { 
    StyleSheet, 
    Text, 
    View,  
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native"
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../Navigation/AuthProvider";
import { useNavigation } from "@react-navigation/native";



export default function HorizontalDogList() {
  renderHeader = () => {
    return (
      <View>
        <TouchableOpacity 
          style={styles.circle} 
          onPress={() => navigation.navigate("Add Dog")}
        >
          <Text style={styles.plus}> + </Text>
        </TouchableOpacity>
        <Text style={styles.name}> Add Dog </Text>
      </View>
    );
  }
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  function DogsList() {
      const [dogs, setDogs] = useState([]);
      useEffect(() => {
        const subscriber = firestore()
          .collection("Dogs")
          .where("user", "==", `${user.uid}`)
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
          horizontal={true}
          ListHeaderComponent={renderHeader()}
          renderItem={({item}) => (
            <View style={styles.list}>
              <Image
                source={{ uri: item.pictureUri }}
                style={styles.pictureContainer}
              />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          )}
        />
      );
    }
  return (
    <DogsList></DogsList>
  )
}

const styles = StyleSheet.create({
  pictureContainer: {
    width: 85,
    height: 85,
    borderRadius: 85/2,
  },
  circle: {
    width: 85,
    height: 85,
    borderRadius: 85 / 2,
    backgroundColor: '#D1D8Df',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4
  },
  name: {
    textAlign: 'center'
  },
  plus: {
    fontSize: 25
  },
  list: {
    margin: 4
  }
})
