import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type RootStackParamList = {
    Home: undefined;
  };
  
  type LoginScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  };

const NewPasswordScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [verify, setVerify] = useState('');

    const handleSubmit = () => {
        // Implement your logic to submit the new password
        console.log('Submitting new password:', { password });
        navigation.navigate('Home')
    };

    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            </View>
            <View style={styles.textHeader}>
                <Text style={styles.header}>Change Password</Text>
                <Text style={styles.subHeader}>Please enter new password</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="lock" size={16} color="black" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="New Password"
                        secureTextEntry
                    />
                </View>
                <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="lock" size={16} color="black" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setVerify}
                        value={verify}
                        placeholder="Verify Password"
                        secureTextEntry
                    />
                </View>
                
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
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

export default NewPasswordScreen;
