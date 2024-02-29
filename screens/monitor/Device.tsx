import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type AccessDeniedScreenProps = {
    Explore: undefined;
    Home: undefined;
};

type deviceScreenProps =  {
    navigation:StackNavigationProp<AccessDeniedScreenProps, 'Explore'>
}

const DeviceCard: React.FC<deviceScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* <Image src={require('../../assets/images/logo.png')} style={styles.image} /> */}
            <Text style={styles.title}>Access Denied</Text>
            <Text style={styles.message}>You do not have permission to access this content.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
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
