import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import AlertsScreen from '../screens/notification/NotificationsScreen';
import ProfileScreen from '../screens/account/ProfileScreen';
import DriverScreen from '../screens/monitor/Driver'
import MonitorScreen from '../screens/monitor/MonitorScreen';
import SplashScreen from '../screens/welcome/SplashScreen';
import PasswordScreen from '../screens/welcome/PasswordScreen';
import OTPScreen from '../screens/welcome/OTPScreen';
import NewPasswordScreen from '../screens/welcome/NewPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { useAuth } from '../context/AuthProvider'
import LoginScreen from '../screens/welcome/LoginScreen';
import SignupScreen from '../screens/welcome/SignupScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        activeTintColor: '#8B0000',
        inactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'car' : 'car-outline';
          }

          // You can return any component that you like here!
          return <Ionicons key={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Notifications" component={AlertsScreen} />
      <Tab.Screen name="Explore" component={MonitorScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { authData } = useAuth();
  return (
    <Stack.Navigator initialRouteName="Splash">
      {authData.token ? (
        <>
            <Stack.Screen name="MainTab" component={BottomNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Driver" component={DriverScreen} options={{ headerShown: false }} /> 
        </>

      ) : (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Password" component={PasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }} />
        </>

      )}

    </Stack.Navigator>

  );
}