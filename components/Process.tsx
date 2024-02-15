import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { MarkerData } from '../screens/home/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


interface ProcessProps {
    marker: MarkerData | null;
}

const Process: React.FC<ProcessProps> = ({ marker }) => {
    if (!marker) {
        return null; // If no marker is selected, don't render anything
    }

    console.log(marker.name)
    const getLocationString = (latitude: number, longitude: number) => {
        // Your logic to get the location string from latitude and longitude
        // This could involve reverse geocoding or using a library like Geolib
        return 'Amboseli, Kenya';
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{marker.name}</Text>
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="speedometer" size={18} color="#2c3e50" />
                    </View>

                    <Text style={styles.infoText}>{marker.speed} km/h</Text>
                </View>
                <View style={styles.detailItem}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="battery-charging-full" size={18} color="green" />
                    </View>

                    <Text style={styles.infoText}>{marker.battery} %</Text>
                </View>
                <View style={styles.detailItem}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="directions-car-filled" size={18} color="#c0392b" />
                    </View>

                    <Text style={styles.infoText}>{marker.trips}</Text>
                </View>
                <View style={styles.detailItem}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="engine" size={18} color="green" />
                    </View>

                    <Text style={styles.infoText}>{marker.ignited}</Text>
                </View>
            </View>
            <View style={styles.detailItem}>
                <View style={styles.iconContainer}>
                    <Ionicons name="location" size={18} color="black" />
                </View>

                <Text style={{ fontWeight: 'bold', color: '#2c3e50' }}>Location:</Text>
                <Text style={styles.infoText}> {getLocationString(marker.latitude, marker.longitude)}</Text>
            </View>


            <View style={styles.bottomSection}>
                <View style={styles.bottomItem}>
                    <MaterialIcons name="alt-route" size={36} color="green" />
                    <Text style={styles.bottomText}>Route</Text>
                </View>
                <View style={styles.bottomItem}>
                    <MaterialIcons name="fence" size={36} color="blue" />
                    <Text style={styles.bottomText}>GeoFencing</Text>
                </View>
                <View style={styles.bottomItem}>
                    <MaterialIcons name="home-repair-service" size={36} color="green" />
                    <Text style={styles.bottomText}>Maintenance</Text>
                </View>
                <View style={styles.bottomItem}>
                    <MaterialIcons name="directions-bus" size={36} color="green" />
                    <Text style={styles.bottomText}>Features</Text>
                </View>
            </View>
        </View>
    )
}

export default Process

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 1,
        paddingHorizontal: 20
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    iconContainer: {
        width: 26,
        height: 26,
        backgroundColor: '#fff',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        elevation: 3,
    },
    infoText: {
        fontSize: 16,
        color: '#34495e',
    },
    bottomSection: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 10,
        borderColor: 'green',
    },
    bottomItem: {
        alignItems: 'center',
        marginRight: 20,
    },
    bottomText: {
        marginTop: 5,
        textAlign: 'center',
    },
})