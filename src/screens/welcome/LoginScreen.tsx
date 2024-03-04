import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider'; // Import AuthContext
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';


type RootStackParamList = {
    Login: undefined;
    Password: undefined;
    Home: undefined;
    Signup: undefined ;
};

type LoginScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFocusedPhoneNumber, setIsFocusedPhoneNumber] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const phoneNumberInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const { setAuthData } = useContext(AuthContext); // Access setAuthData from AuthContext

    const handleLogin = () => {
        setLoading(true);
        console.log(`${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/user/login/user, phone: ${phoneNumber} password: ${password}`)
        axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/user/login/user`, {
            phone: phoneNumber,
            password: password
        })
        .then(response => {
            setLoading(false);
            const { accessToken, id } = response.data;

            setAuthData({ token: accessToken, id });
        })
        .catch(error => {
            setLoading(false);
            // Handle error
            console.error('Login error:', error);
            Alert.alert('Error', 'Login failed. Please check your credentials.');
        });
    };

    const handleFocus = (inputRef: React.RefObject<TextInput>, setFocused: React.Dispatch<React.SetStateAction<boolean>>) => {
        setFocused(true);
        inputRef.current?.focus();
    };

    const handleBlur = (setFocused: React.Dispatch<React.SetStateAction<boolean>>) => {
        setFocused(false);
    };


    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            </View>
            <View style={styles.textHeader}>
                <Text style={styles.header}>Welcome Back</Text>
                <Text style={styles.subHeader}>Sign to Continue</Text>
            </View>
            <View style={styles.inputContainer}>
                <Animated.View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="phone" size={16} color="black" style={styles.icon} />
                    <TextInput
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        style={[styles.input, { borderColor: isFocusedPhoneNumber ? '#007bff' : '#ccc' }]}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        onFocus={() => handleFocus(phoneNumberInputRef, setIsFocusedPhoneNumber)}
                        onBlur={() => handleBlur(setIsFocusedPhoneNumber)}
                    />
                </Animated.View>
                <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="lock" size={16} color="black" style={styles.icon} />
                    <TextInput
                        onChangeText={setPassword}
                        style={[styles.input, { borderColor: isFocusedPassword ? '#007bff' : '#ccc' }]}
                        value={password}
                        onFocus={() => handleFocus(passwordInputRef, setIsFocusedPassword)}
                        onBlur={() => handleBlur(setIsFocusedPassword)}
                        placeholder="Password"
                        secureTextEntry
                    ></TextInput>
                </View>
                <Text onPress={() =>  navigation.navigate('Password')} style={styles.forgotPassword}>Forgot your password?</Text>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.registerButtonText}>Join us</Text>
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
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
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
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerButton: {
        width: '100%',
        backgroundColor: 'black',
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

export default LoginScreen;