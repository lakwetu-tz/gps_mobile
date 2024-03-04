import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

const GeoFencing = () => {
    const [routes, setRoutes] = useState([]);


    return (
        <View>
            {routes.length === 0 ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: 0, bottom: 0, paddingHorizontal: 0, }}>
                    <Text>No Areas Found Yet</Text>
                    <Button
                        title="Create GeoFence"
                        onPress={() => {
                        }}
                    />
                </View>
            ) : (
                <ScrollView>
                    <View></View>
                </ScrollView>
            )}
        </View>
    );
};

export default GeoFencing;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 10,
    },
    timelineItem: {
        marginBottom: 5,
    },
    timelineText: {
        fontSize: 16,
    },
});
