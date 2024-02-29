import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView, TextInput, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios, { AxiosError, AxiosResponse }  from 'axios';
import { useNavigation } from '@react-navigation/native';
import { response } from 'express';
import { useAuth } from '../../context/AuthProvider';

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  licenseNumber: string;
}

interface ErrorResponse {
  message: string;
}


const DriverCard: React.FC<{ driver: Driver }> = ({ driver }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.avatarContainer}>
        <Image source={require('../../assets/images/avator.jpeg')} style={styles.avatar} />
      </View>
      {/* Name */}
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{driver.firstName} {driver.lastName}</Text>
        {/* Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text>License No.: </Text>
            <Text style={styles.detailText}>{driver.licenseNumber}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text>Phone No.: </Text>
            <Text style={styles.detailText}>{driver.phoneNumber}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DriversScreen: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigation = useNavigation();
  const [showModel, setShowModel] = useState<boolean>(false)

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [licenseNumber, setLicenseNumber] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { authData } = useAuth(); 
 
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://gps-backend.imc.co.tz:8000/api/v1/driver/all');
        setDrivers(response.data.drivers);
        setLoading(false); // Update loading state once data is fetched
      } catch (error) {
        console.error('Error fetching drivers:', error.message);
        setLoading(false);
        setError('Network error. Please check your internet connection.');
      }
    };

    fetchDrivers();
  }, []);

  const handleAddDriver = async() => {
    try {
      const response = await axios.post("http://gps-backend.imc.co.tz/api/v1/driver/create", {
        firstName,
        lastName,
        licenseNumber,
        phoneNumber,
        userId: authData.id
      });
      console.log('Adding driver:', response.data); // Log the response data
      setShowModel(false);
    } catch (error) {
      if ((error as AxiosError<ErrorResponse>).response && (error as AxiosError<ErrorResponse>).response?.data && (error as AxiosError<ErrorResponse>).response?.data.message) {
        setErrorMessage((error as AxiosError<ErrorResponse>).response.data.message);
      } else {
        setErrorMessage('An error occurred while adding the driver.');
      }
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Drivers</Text>
        <TouchableOpacity onPress={() => setShowModel(true)}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModel(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModel(false)}>
              <Ionicons name="close" size={24} color="#6a737d" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Driver</Text>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
          
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                onBlur={() => {
                  
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="License Number"
                value={licenseNumber}
                onChangeText={setLicenseNumber}
                onBlur={() => {
                  
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType='phone-pad'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onBlur={() => {
                  
                }}
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddDriver}>
              <Text style={styles.addButtonLabel}>Add Driver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading && <Text>Loading...</Text>}

      {!loading && drivers.length === 0 && (
        <View style={styles.noDriversContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#6a737d" />
          <Text style={styles.noDriversText}>No drivers found.</Text>
        </View>
      )}

      {/* Driver List */}
      {!loading && drivers.length > 0 && (
        <FlatList
          data={drivers}
          renderItem={({ item }) => <DriverCard driver={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 32
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 16,
  },
  noDriversContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noDriversText: {
    fontSize: 18,
    color: '#6a737d',
    textAlign: 'center',
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#CB2431', // GitHub's error color
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 32, // Add horizontal padding to match GitHub's style
    lineHeight: 24, // Adjust line height for better readability
  },

  // add driver section 
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    width: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#0366d6',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default DriversScreen;
