import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DeviceCardProps {
    device: {
        id: string;
        imei: string;
        simCard: string;
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

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
    return (
        <View style={styles.card}>

            <View style={styles.content}>
                {/* Basic information header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.name}>{device.model}</Text>
                    <Text style={styles.description}>{device.imei}</Text>
                </View>

                {/* Content section */}
                <View style={styles.contentSection}>


                    {/* Location timeline */}
                    <View style={[styles.timelineContainer, { borderColor: device.color }]}>
                        <View style={styles.timeline}>

                            <Text style={styles.timelineText}>Location: {device.latitude}, {device.longitude}</Text>
                            <Text style={styles.timelineText}>Time: {device.created_at}</Text>
                            <Text style={styles.timelineText}>Speed: {device.speed} Km/h</Text>
                            <Text style={styles.timelineText}>Angle: {device.angle} C</Text>
                            <Text style={styles.timelineText}>Altitude: {device.altitude} ft</Text>
                        </View>
                    </View>

                    {/* Vehicle type image */}
                    <View >
                        <Image source={require("../../assets/images/haice.png")} style={styles.imageStyle} />
                    </View>
                </View>

                {/* Vehicle summary */}
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryText}>Ignition: {device.ignition ? "ON" : "OFF"}</Text>
                    <Text style={styles.summaryText}>Movement: {device.movement ? "ON" : "OFF"}</Text>
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

export default DeviceCard;
