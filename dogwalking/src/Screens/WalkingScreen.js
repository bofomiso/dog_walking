import React, {useState} from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";
import DogModal from "../components/DogModal"

const WalkingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(state => !state)
  return (
    <View style={styles.text}>
      <Text>Walking Screen</Text>
      <TouchableOpacity 
        onPress={() => {setModalVisible(true)}}
      >
        <Text> Open Modal!</Text>
      </TouchableOpacity>
      <DogModal isVisible={modalVisible} toggleModal={toggleModal}></DogModal>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default WalkingScreen;