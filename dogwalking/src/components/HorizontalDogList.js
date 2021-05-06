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
          .orderBy("createdAt", "asc")
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
            <View>
              <TouchableOpacity 
                onPress={() => navigation.navigate("Profile",
                {
                  name: item.name,
                  age: item.age,
                  breed: item.breed,
                  pictureUri: item.pictureUri,
                  totalDistance: item.totalDistance,
                  totalWalks: item.totalWalks,
                  dogId: item.dogUid,
                  userId: item.user
                }
                )}
              >
                <Image
                  source={{ uri: item.pictureUri }}
                  style={styles.pictureContainer}
                />
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
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
    borderRadius: 85 / 2,
    margin: 4,
  },
  circle: {
    width: 85,
    height: 85,
    borderRadius: 85 / 2,
    backgroundColor: '#505050',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4
  },
  name: {
    textAlign: 'center',
    color: '#D1D8Df'
  },
  plus: {
    fontSize: 25,
    color: '#D1D8Df'
  },
})
