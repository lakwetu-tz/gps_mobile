import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Define the type for the navigation stack
type AccessDeniedScreenProps = {
    Explore: undefined;
    Home: undefined;
};

// Define the type for the navigation prop of the DeviceCard component
type DeviceScreenProps = {
    navigation: StackNavigationProp<AccessDeniedScreenProps, 'Explore'>; // Ensure correct navigation prop type
};

// Define the DeviceCard component
const DeviceCard: React.FC<DeviceScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Access Denied</Text>
            <Text style={styles.message}>You do not have permission to access this content.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DeviceCard;
