import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  licenseNumber: string;
}

const DriverCard: React.FC<{ driver: Driver }> = ({ driver }) => {
  return (
    <TouchableOpacity style={styles.card}>
      {/* Avatar */}
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
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://192.168.100.115:8000/api/v1/driver/all');
        setDrivers(response.data.drivers);
      } catch (error) {
        console.error('Error fetching drivers:', error.message);
      }
    };

    fetchDrivers();
  }, []);

  const handleAddDriver = () => {
    // Define the logic to navigate to the screen for adding a driver
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Drivers</Text>
        <TouchableOpacity onPress={handleAddDriver}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Driver List */}
      <FlatList
        data={drivers}
        renderItem={({ item }) => <DriverCard driver={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});

export default DriversScreen;
