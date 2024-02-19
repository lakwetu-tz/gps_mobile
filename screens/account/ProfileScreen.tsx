import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider'; // Import the useAuth hook to access the authentication context

const ProfileScreen: React.FC = () => {
    const { authData } = useAuth(); // Access authData from the context
    const [user, setUser] = useState<any>(null); // State to hold user data

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://gps-backend.imc.co.tz:8000/api/v1/user/get/${authData.id}`); // Use the id from authData
                setUser(response.data);  
            } catch (error) {
                console.error('Error fetching user data:', error);
            }

            
        };

        if (authData.id) {
            fetchUserData();
        }
    }, [authData.id]); 

    const handleLogout = () => {
        console.warn("log out")
    }

    return (
        <View style={styles.container}>
            {/* Profile Info */}
            <View style={styles.profileInfo}>
                <Image source={require("../../assets/images/avator.jpeg")} style={styles.profilePic} />
                {user && (
                    <>
                        <Text style={styles.userName}>{user.username}</Text>
                        <Text style={styles.userEmail}>{user.phone}</Text>
                    </>
                )}
            </View>

            {/* Options */}
            <View style={styles.options}>
                {/* Logout */}
                <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#6a737d" />
                    <Text style={styles.optionText}>Logout</Text>
                </TouchableOpacity>

                {/* Change Theme */}
                <TouchableOpacity style={styles.optionItem}>
                    <Ionicons name="color-palette-outline" size={24} color="#6a737d" />
                    <Text style={styles.optionText}>Change Theme</Text>
                </TouchableOpacity>

                {/* View Subscriptions */}
                <TouchableOpacity style={styles.optionItem}>
                    <Ionicons name="wallet-outline" size={24} color="#6a737d" />
                    <Text style={styles.optionText}>View Subscriptions</Text>
                </TouchableOpacity>

                {/* Update Profile */}
                <TouchableOpacity style={styles.optionItem}>
                    <Ionicons name="person-outline" size={24} color="#6a737d" />
                    <Text style={styles.optionText}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileInfo: {
        alignItems: 'center',
        marginBottom: 40,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userEmail: {
        color: '#6a737d',
    },
    options: {
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#6a737d',
    },
});

export default ProfileScreen;