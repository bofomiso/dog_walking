import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, 
  Text, 
  View, 
  Image, 
} from 'react-native'
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../Navigation/AuthProvider";

export default function RecentWalk() {
  const { user } = useContext(AuthContext);
    const [recentWalk, setRecentWalk] = useState([]);
    const [pictureUri, setPictureUri] = useState(null);
    const [dog, setDog] = useState("");
    useEffect(() => {
      const subscriber = firestore()
      .collection("Walks")
      .where("user", "==", `${user.uid}`)
      .orderBy("createdAt", 'desc')
      .limit(1)
      .onSnapshot((querySnapshot) => {
        const walk = [];
        querySnapshot.forEach(documentSnapshot => {
          setDog(documentSnapshot.get("name").toString());
          walk.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setRecentWalk(walk);
      });
      return () => subscriber();
    }, []);
    firestore()
      .collection("Dogs")
      .where("user", "==", `${user.uid}`).where("name", "==", `${dog}`)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setPictureUri(documentSnapshot.get("pictureUri").toString());
        })
    })
  return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View>
            <Image
                source={{ uri: pictureUri }}
                style={styles.pictureContainer}
            />
            {recentWalk.map((item, key) => 
              <Text key={key} style={styles.name}>{ item.name }</Text>
            )}
          </View>
          <View style={styles.container}>
            <Text style={styles.underline}>Day</Text>
            {recentWalk.map((item, key) => 
              <Text key={key} style={styles.text}>{ item.dayOfWeek }</Text>
            )}
            <Text style={styles.underline}>Date</Text>
            {recentWalk.map((item, key) => 
            <Text key={key} style={styles.text}>{ item.date }</Text>
            )}
          </View>
          <View style={styles.container}>
            <Text style={styles.underline}>Distance</Text>
            {recentWalk.map((item, key) => 
            <Text key={key} style={styles.text}>{ item.distance.toFixed(2) } miles</Text>
            )}
            <Text style={styles.underline}>Time</Text>
            {recentWalk.map((item, key) => 
            <Text key={key} style={styles.text}>{ item.time }</Text>
            )}
          </View>
        </View>
        <View style={styles.cardContent}>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
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
    marginVertical: 4,
  },
  cardContent: {
    marginTop: '1%',
    marginBottom: '1%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  underline: {
    textDecorationLine: 'underline',
    color: '#D1D8DF'
  },
  pictureContainer: {
    width: 85,
    height: 85,
    borderRadius: 85/2,
  },
  name: {
    textAlign: 'center',
    color: '#D1D8Df'
  },
  container: {
    justifyContent: 'space-evenly'
  },
  text: {
    color: '#D1D8DF'
  }
});
