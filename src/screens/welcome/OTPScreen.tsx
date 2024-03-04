import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    NewPassword: undefined;
    OTP: undefined;
};

type OTPScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'OTP'>;
}; 

const OTPScreen: React.FC<OTPScreenProps> = ({ navigation }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next box if the current one has a value
        if (value && index < newOtp.length - 1 && inputs.current[index + 1]) {
            inputs.current[index + 1]?.focus();
        }
    }

    const handleVerify = () => {
        const enteredOTP = otp.join('');
        const validOTP = '1234'; // Replace this with your valid OTP
        if (enteredOTP === validOTP) {
            // Valid OTP, show alert and navigate to enter new password screen
            Alert.alert('Success', 'OTP is valid!', [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('NewPassword')
                    }
                }
            ]);
        } else {
            // Invalid OTP, show alert
            Alert.alert('Error', 'Invalid OTP. Please try again.');
            // Clear OTP fields
            setOtp(['', '', '', '']);
            // Focus on the first OTP input field
            if (inputs.current[0]) {
                inputs.current[0]?.focus();
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter OTP Code</Text>
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.box}
                        maxLength={1}
                        keyboardType="numeric"
                        onChangeText={(value) => handleOtpChange(value, index)}
                        value={digit}
                        ref={(input) => {
                            inputs.current[index] = input;
                        }}
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    )
}

export default OTPScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        borderWidth: 2,
        borderColor: '#007bff',
        width: 50,
        height: 50,
        marginHorizontal: 5,
        textAlign: 'center',
        fontSize: 24,
    },
    verifyButton: {
        width: 'auto',
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
