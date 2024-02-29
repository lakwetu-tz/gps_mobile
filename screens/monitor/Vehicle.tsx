import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface VehicleCardProps {
    vehicle: {
        id: string;
        vin: string;
        deviceId: string;
        plate: string;
        color: string;
        model: string;
        status: string;
        latitude?: string;
        longitude?: string;
        altitude?: string;
        angle?: string;
        speed?: string;
        ignition?: number;
        movement?: number;
        created_at?: string;
    };
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
    const [location, setLocation] = useState<string | null>(null);

    let eta = new Date(vehicle.created_at); // Assuming vehicle.eta is the ETA in Date format

    // Add 3 hours to ETA
    eta.setHours(eta.getHours() + 3);

    // Format the new ETA as a string
    const formattedEta = eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    function bearing(angle: number) {
        let bearing = '';
        if (angle >= 0 && angle < 22.5) {
            bearing = 'Facing North';
        } else if (angle >= 22.5 && angle < 67.5) {
            bearing = 'Facing North East';
        } else if (angle >= 67.5 && angle < 112.5) {
            bearing = 'Facing East';
        } else if (angle >= 112.5 && angle < 157.5) {
            bearing = 'Facing South East';
        } else if (angle >= 157.5 && angle < 202.5) {
            bearing = 'Facing South';
        } else if (angle >= 202.5 && angle < 247.5) {
            bearing = 'Facing South West';
        } else if (angle >= 247.5 && angle < 292.5) {
            bearing = 'Facing West';
        } else if (angle >= 292.5 && angle < 337.5) {
            bearing = 'Facing North West';
        } else if (angle >= 337.5 && angle <= 360) {
            bearing = 'Facing North';
        }

        return bearing
    }

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${parseFloat(vehicle.latitude)}&lon=${parseFloat(vehicle.longitude)}&zoom=18&addressdetails=1`);
                const data = await response.json();
                const { address } = data;
                // Check if address exists and has city property
                if (address && address.city) {

                    const location = address.road || address.suburb || address.ward;

                    const city = address.ward || address.town || address.village || address.hamlet || address.county || address.state;
                    const country = address.country;


                    const locationString = city ? `${location}, ${city}` : country;
                    setLocation(locationString);
                } else {
                    // Handle the case where city is not available
                    setLocation(address.country || 'Location not available');
                }
            } catch (error) {
                console.error('Error fetching location:', error);
                setLocation(null);
            }
        };
        fetchLocation();
    }, [vehicle]);

    return (
        <View style={styles.card}>

            <View style={styles.content}>
                {/* Basic information header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.name}>{vehicle.model}</Text>
                    <Text style={styles.description}>{vehicle.plate}</Text>
                </View>

                {/* Content section */}
                <View style={styles.contentSection}>


                    {/* Location timeline */}
                    <View style={[styles.timelineContainer, { borderColor: vehicle.color }]}>
                        <View style={styles.timeline}>

                            <View style={styles.iconRow}>
                                <Ionicons name="location-outline" size={20} color="#6a737d" />
                                <Text style={styles.timelineText}> {location}</Text>
                            </View>
                            <View style={styles.iconRow}>
                                <Ionicons name="time-outline" size={20} color="#6a737d" />
                                <Text style={styles.timelineText}> {formattedEta}</Text>
                            </View>
                            <View style={styles.iconRow}>
                                <Ionicons name="speedometer-outline" size={20} color="#6a737d" />
                                <Text style={styles.timelineText}> {vehicle.speed} Km/h</Text>
                            </View>
                            <View style={styles.iconRow}>
                                <Ionicons name="compass-outline" size={20} color="#6a737d" />
                                <Text style={styles.timelineText}> {bearing(parseFloat(vehicle.angle))}</Text>
                            </View>
                            <View style={styles.iconRow}>
                                <Ionicons name="navigate-outline" size={20} color="#6a737d" />
                                <Text style={styles.timelineText}> {vehicle.altitude} ft</Text>
                            </View>
                        </View>
                    </View>

                    {/* Vehicle type image */}
                    <View >
                        <Image source={require("../../assets/images/haice.png")} style={styles.imageStyle} />
                    </View>
                </View>

                {/* Vehicle summary */}
                <View style={styles.summaryContainer}>
                    <View>
                        <Text style={styles.summaryText}>
                            Ignition: {vehicle.ignition === 1 ? "ON" : "OFF"}
                        </Text>
                    </View>

                    <Text style={styles.summaryText}>Movement: {vehicle.movement ? "ON" : "OFF"}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },


    content: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        color: '#6a737d',
        backgroundColor: 'yellow',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderColor: 'black',
        shadowColor: 'gray'
    },
    contentSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    imageStyle: {
        width: 120,
        height: 120,
    },
    timelineContainer: {
        flex: 1,
        borderLeftWidth: 4,
        paddingLeft: 12,
    },
    timelinePoint: {
        position: 'absolute',
        left: 24,
        top: 0,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#6a737d',
    },
    timeline: {
        marginTop: 8,
    },
    timelineText: {
        marginBottom: 4,
        color: '#6a737d',
    },
    summaryContainer: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    summaryText: {
        color: '#6a737d',
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default VehicleCard;
