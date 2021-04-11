import React from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'

const WalkingDetailsScreen = ({ route }) => {
    const { name, day, locations, time, currentTime, date } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <Text> Lets Goooooo</Text>
            <Text> {name} </Text>
            <Text> {day} </Text>
            <Text> {time} </Text>
            <Text> {currentTime} </Text>
            <Text> {date} </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
});

export default WalkingDetailsScreen

