import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"

export default function DogImagePicker() {
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.circle} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    backgroundColor: '#D1D8Df',
    marginTop: 70,
    marginBottom: 20
  },
});
