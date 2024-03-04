import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import GeoFencing from '../screens/map/GeoFencing';
import Route from '../screens/map/Route';
import Maintenance from '../screens/map/Maintenance';
import Features from '../screens/map/Features';

interface MarkerData {
    make: string;
    model: string;
    latitude: string;
    longitude: string;
    speed: number;
    movement: number;
    ignition: number;
}

interface ProcessProps {
    marker: MarkerData | null;
}

const Process: React.FC<ProcessProps> = ({ marker }) => {
    const [location, setLocation] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string | null>(null);

    useEffect(() => {
        if (marker) {
            const fetchLocation = async () => {
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${parseFloat(marker.latitude)}&lon=${parseFloat(marker.longitude)}&zoom=18&addressdetails=1`);
                    const data = await response.json();
                    const { address } = data;
                    if (address && address.city) {
                        const location = address.road || address.suburb || address.ward;
                        const city = address.ward || address.town || address.village || address.hamlet || address.county || address.state;
                        const country = address.country;
                        const locationString = city ? `${location}, ${city}` : country;
                        setLocation(locationString);
                    } else {
                        setLocation(address.country || 'Location not available');
                    }
                } catch (error) {
                    console.error('Error fetching location:', error);
                    setLocation(null);
                }
            };
            fetchLocation();
        }
    }, [marker]);

    if (!marker) {
        return null;
    }

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{marker.make} - {marker.model}</Text>
                <TouchableOpacity onPress={() => setActiveTab(null)} style={styles.detailsContainer}>
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
                        <Text style={styles.infoText}>100 %</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="sign-direction" size={18} color="#c0392b" />
                        </View>
                        <Text style={styles.infoText}>{marker.movement === 0 ? "OFF" : "ON"}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="engine" size={18} color="green" />
                        </View>
                        <Text style={styles.infoText}>{marker.ignition === 1 ? "ON" : "OFF"}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.detailItem}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="location" size={18} color="black" />
                    </View>
                    <Text style={{ fontWeight: 'bold', color: '#2c3e50' }}>Location:</Text>
                    <Text style={styles.infoText}> {location || 'Loading...'}</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.bottomSection}>
                        <TouchableOpacity
                            style={[styles.bottomItem, activeTab === 'route' && styles.activeTab]}
                            onPress={() => handleTabPress('route')}
                        >
                            <MaterialIcons name="alt-route" size={24} color="green" />
                            <Text style={styles.bottomText}>Route</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.bottomItem, activeTab === 'geofencing' && styles.activeTab]}
                            onPress={() => handleTabPress('geofencing')}
                        >
                            <MaterialIcons name="fence" size={24} color="blue" />
                            <Text style={styles.bottomText}>Geofencing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.bottomItem, activeTab === 'maintenance' && styles.activeTab]}
                            onPress={() => handleTabPress('maintenance')}
                        >
                            <MaterialIcons name="home-repair-service" size={24} color="green" />
                            <Text style={styles.bottomText}>Maintenance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.bottomItem, activeTab === 'features' && styles.activeTab]}
                            onPress={() => handleTabPress('features')}
                        >
                            <MaterialIcons name="directions-bus" size={24} color="green" />
                            <Text style={styles.bottomText}>Features</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            {activeTab === 'route' && <Route />}
            {activeTab === 'geofencing' && <GeoFencing />}
            {activeTab === 'maintenance' && <Maintenance />}
            {activeTab === 'features' && <Features />}
        </ScrollView>
    );
};

export default Process;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 6,
        elevation: 1,
        marginBottom: 24,
        paddingHorizontal: 20
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2c3e50',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    activeTab: {
        backgroundColor: '#e6f7ff',
        borderColor: '#1890ff',
    },
    iconContainer: {
        width: 32,
        height: 28,
        backgroundColor: '#fff',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        elevation: 3,
    },
    infoText: {
        fontSize: 14,
        color: '#34495e'
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    bottomItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    bottomText: {
        marginTop: 5,
        textAlign: 'center',
    },
});
