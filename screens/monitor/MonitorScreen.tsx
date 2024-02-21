import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import VehicleCard from './Vehicle';
import DeviceCard from './Device';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const exploreTabs = [
  { id: '1', name: 'Vehicles', icon: 'car' },
  { id: '2', name: 'Devices', icon: 'location' },
];

const ExploreScreen = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [device, setDevice] = useState([]);
  const [selectedTab, setSelectedTab] = useState(exploreTabs[0].name);

  useEffect(() => {
    if (selectedTab == 'Device') {
      fetchDeviceData();
    } else {
      fetchVehicleData();
    }

  }, [selectedTab]);

  const fetchVehicleData = async () => {
    try {
      const response = await axios.get('http://gps-backend.imc.co.tz:8000/api/v1/vehicle/all');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

  const fetchDeviceData = async () => {
    try {
      const response = await axios.get('http://gps-backend.imc.co.tz:8000/api/v1/device/all');
      setDevice(response.data);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };


  const renderTabButton = ({ item }) => (
    <TouchableOpacity
      style={[styles.tabButton, selectedTab === item.name && styles.selectedTabButton]}
      onPress={() => setSelectedTab(item.name)}
    >
      <Ionicons name={item.icon} size={24} color={selectedTab === item.name ? '#0366d6' : '#6a737d'} />
      <Text style={[styles.tabButtonText, selectedTab === item.name && styles.selectedTabButtonText]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Driver')}>
        <View style={{ backgroundColor: '#fff', borderColor: 'gray', marginTop: 1 }}>
          <View style={{ paddingHorizontal: 24, marginBottom: 24, marginTop: 14, paddingLeft: 10, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <View style={{ backgroundColor: '#8B0000', padding: 8, borderRadius: 8 }}>
              <Ionicons name='people' size={25} color='white' />
            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Drivers</Text>
          </View>

        </View>

      </TouchableOpacity>

      <View style={styles.tabContainer}>
        <FlatList
          data={exploreTabs}
          renderItem={renderTabButton}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabList}
        />
      </View>

      {selectedTab === 'Vehicles' ? (
        <FlatList
          data={vehicles}
          renderItem={({ item }) => <VehicleCard vehicle={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <FlatList
          data={device}
          renderItem={({ item }) => (
            <DeviceCard device={item} />)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaecef',
  },
  tabList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 8,
  },
  selectedTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#0366d6',
  },
  tabButtonText: {
    marginLeft: 8,
    color: '#6a737d',
    fontSize: 16,
  },
  selectedTabButtonText: {
    fontWeight: 'bold',
    color: '#0366d6',
  },
  vehicleList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  flatListContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default ExploreScreen;