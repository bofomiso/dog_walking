import React, { useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal,
  TouchableOpacity, 
} from 'react-native'

export default function DogModal({isVisible, toggleModal}) {
  return (
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
            <Text> Hello World! </Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text> close </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 55,
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
});
