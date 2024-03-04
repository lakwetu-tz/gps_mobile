import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, Image, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';

import { checkPasswordStrength } from '../../utils/getPassword'

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
};

type RegisterScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Signup'>;
};

const SignupScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [isFocusedPhoneNumber, setIsFocusedPhoneNumber] = useState(false);
    const [isFocusedUsername, setIsFocusedUsername] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedVerifyPassword, setIsFocusedVerifyPassword] = useState(false);
    const phoneNumberInputRef = useRef<TextInput>(null);
    const usernameInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const verifyPasswordInputRef = useRef<TextInput>(null);


    const handleRegister = () => {
        if (!phoneNumber || !username || !password || !verifyPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (password !== verifyPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        console.log(phoneNumber)
        console.log(username)
        console.log(password)
        console.log(verifyPassword)

        axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/user/register/user`, {
            phone: phoneNumber,
            username: username,
            password: password,
        })
            .then(response => {
                if (response.status === 200) {
                    Alert.alert('Success', 'Registration successful.');

                    navigation.navigate('Login')
                }

            })
            .catch(error => {
                console.error('Registration error:', error);
                Alert.alert('Error', 'Registration failed. Please try again.');
            });

    };

    const handleFocus = (inputRef: React.RefObject<TextInput>, setFocused: React.Dispatch<React.SetStateAction<boolean>>) => {
        setFocused(true);
        inputRef.current?.focus();
    };

    const handleBlur = (setFocused: React.Dispatch<React.SetStateAction<boolean>>) => {
        setFocused(false);
    };

    const handlePasswordChange = (password: string) => {
        const strengthMessage = checkPasswordStrength(password);
        setPasswordStrength(strengthMessage);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                {/* Back button */}
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#555" />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.header}>Join Us</Text>
                    <Text style={styles.subHeader}>Signup to Continue</Text>
                    <View style={styles.inputContainer}>
                        {/* <Animated.Text style={[styles.label, { opacity: isFocusedPhoneNumber ? 1 : 0.5 }]}>Phone Number</Animated.Text> */}
                        <TextInput
                            ref={phoneNumberInputRef}
                            style={[styles.input, { borderColor: isFocusedPhoneNumber ? '#007bff' : '#ccc' }]}
                            onChangeText={setPhoneNumber}
                            placeholder='e.g +255 xxx xxxx xx'
                            onFocus={() => handleFocus(phoneNumberInputRef, setIsFocusedPhoneNumber)}
                            onBlur={() => handleBlur(setIsFocusedPhoneNumber)}
                            value={phoneNumber}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        {/* <Animated.Text style={[styles.label, { opacity: isFocusedUsername ? 1 : 0.5 }]}>Username</Animated.Text> */}
                        <TextInput
                            ref={usernameInputRef}
                            placeholder='username'
                            style={[styles.input, { borderColor: isFocusedUsername ? '#007bff' : '#ccc' }]}
                            onChangeText={setUsername}
                            onFocus={() => handleFocus(usernameInputRef, setIsFocusedUsername)}
                            onBlur={() => handleBlur(setIsFocusedUsername)}
                            value={username}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        {/* <Animated.Text style={[styles.label, { opacity: isFocusedPassword ? 1 : 0.5 }]}>Password</Animated.Text> */}
                        <TextInput
                            ref={passwordInputRef}
                            style={[styles.input, { borderColor: isFocusedPassword ? '#007bff' : '#ccc' }]}
                            onChangeText={(text) => {
                                setPassword(text);
                                handlePasswordChange(text);
                            }}
                            placeholder='password'
                            onFocus={() => handleFocus(passwordInputRef, setIsFocusedPassword)}
                            onBlur={() => handleBlur(setIsFocusedPassword)}
                            value={password}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        {/* <Animated.Text style={[styles.label, { opacity: isFocusedVerifyPassword ? 1 : 0.5 }]}>Verify Password</Animated.Text> */}
                        <TextInput
                            ref={verifyPasswordInputRef}
                            style={[styles.input, { borderColor: isFocusedVerifyPassword ? '#007bff' : '#ccc' }]}
                            onChangeText={setVerifyPassword}
                            placeholder='Verify Password'
                            onFocus={() => handleFocus(verifyPasswordInputRef, setIsFocusedVerifyPassword)}
                            onBlur={() => handleBlur(setIsFocusedVerifyPassword)}
                            value={verifyPassword}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        paddingTop: 50,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    logoContainer: {
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        position: 'absolute',
        left: 10,
        top: 10,
        fontSize: 16,
        color: '#007bff',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
    },
    registerButton: {
        width: '100%',
        backgroundColor: '#8B0000',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SignupScreen;
