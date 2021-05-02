import React, {useState} from "react";
import {
  Text, 
  View,
  StyleSheet,
  Image,
  TouchableOpacity
 } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

export default function Card({ name, age, breed, pictureUri, setDog }) {
  const navigation = useNavigation();
  return (
    <View style={styles.card}> 
      <TouchableOpacity onPress={
        () => {
          setDog(name); 
          navigation.navigate("Walking", { dog: name, pictureUri: pictureUri })}}>
        <View style={styles.cardContent}>
            <FastImage
              source={{ 
                uri: pictureUri, 
                priority: FastImage.priority.low
              }}
              style={styles.pictureContainer}
            />
              <View style={styles.row}>
                <Text style={styles.cardText}> {name} </Text>
                <Text style={styles.cardText}> {breed} </Text>
                <Text style={styles.cardText}> Age: {age} </Text>
              </View>
        </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
    flexWrap: 'wrap',
    marginHorizontal: 18,
    marginVertical: 20,
    flexDirection: 'row'
  },
  cardText: {
    fontSize: 20,
    padding: 5,
    color: '#D1D8DF'
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