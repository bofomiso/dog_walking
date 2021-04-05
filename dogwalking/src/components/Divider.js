import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Divider() {
    return (
        <View style={styles.divider}/>
    )
}

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    }
});
