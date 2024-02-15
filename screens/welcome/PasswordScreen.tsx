import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type RootStackParamList = {
    Password: undefined;
    OTP: undefined;
};

type PasswordScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Password'>;
};

const PasswordScreen: React.FC<PasswordScreenProps> = ({ navigation }) => {
    const [phone, setPhone] = useState('');

    const handleSubmit = () => {
        // Implement your logic to submit the new password
        console.log('Submitting new password:', { phone });
    };

    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            </View>
            <View style={styles.textHeader}>
                <Text style={styles.header}>Forget Password</Text>
                <Text style={styles.subHeader}>Please enter your phone number</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="phone" size={16} color="black" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhone}
                        value={phone}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                    />
                </View>
                
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('OTP')}>
                <Text style={styles.loginButtonText}>SignIn</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    logoContainer: {
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
    textHeader: {

        alignItems: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
    },
    forgotPassword: {
        marginLeft: 'auto',
        color: '#007bff',
        fontSize: 14
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#8B0000',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PasswordScreen;
