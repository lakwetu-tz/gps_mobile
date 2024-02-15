import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react';

const SearchBar = () => {
    return (
        <View>
            <TextInput placeholder="Search" style={styles.input} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
input: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
}, 
})