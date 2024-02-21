import React from 'react';
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

                            <Text style={styles.timelineText}>Location: {vehicle.latitude}, {vehicle.longitude}</Text>
                            <Text style={styles.timelineText}>Time: {vehicle.created_at}</Text>
                            <Text style={styles.timelineText}>Speed: {vehicle.speed} Km/h</Text>
                            <Text style={styles.timelineText}>Angle: {vehicle.angle} C</Text>
                            <Text style={styles.timelineText}>Altitude: {vehicle.altitude} ft</Text>
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
        paddingLeft: 16,
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
});

export default VehicleCard;
