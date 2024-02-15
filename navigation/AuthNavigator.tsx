// AuthNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/welcome/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/welcome/SplashScreen';
import PasswordScreen from '../screens/welcome/PasswordScreen';
import OTPScreen from '../screens/welcome/OTPScreen';
import NewPasswordScreen from '../screens/welcome/NewPasswordScreen';
import HomeScreen from '../screens/home/HomeScreen';
import MonitorScreen from '../screens/monitor/MonitorScreen';
import AlertsScreen from '../screens/notification/NotificationsScreen';
import ProfileScreen from '../screens/account/ProfileScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Password" component={PasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Device" component={MonitorScreen} options={{headerShown: false}} />
            <Stack.Screen name="Alert" component={AlertsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
