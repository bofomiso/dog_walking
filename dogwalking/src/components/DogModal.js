import React, { useState, useEffect} from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView 
} from 'react-native'
import firestore from "@react-native-firebase/firestore";

export default function DogModal({isVisible, toggleModal}) {
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
              <Text> dog name: {item.name} </Text>
              <Text style={styles.modalText}> dog breed: {item.breed} </Text>

            </TouchableOpacity>
          </View>
        )}
      />
    );

  }
  return (
    <SafeAreaView>
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          {toggleModal}
        }}    
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Dogs></Dogs>
            <TouchableOpacity onPress={toggleModal}>
              <Text> close </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: "25%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: "15%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    alignSelf: "flex-start",
    paddingBottom: 5,
  }
});
