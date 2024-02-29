import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

const Maintenance = () => {
    const [routes, setRoutes] = useState([]);


    return (
        <View>
            {routes.length === 0 ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: 0, bottom: 0, paddingHorizontal: 0, }}>
                    <Text>No Maintenance Record</Text>
                    <Button
                        title="Create Record"
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

export default Maintenance;

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
