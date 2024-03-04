import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

const Route = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}route/all`);
        // Ensure response.data.route is defined and not an empty array
        if (response.data?.route && response.data.route.length > 0) {
          setRoutes(response.data.route);
        } else {
          console.log('No routes found in the response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <View>
      {routes.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Text>No Routes Found Yet</Text>
          <Button
            title="Create Route"
            onPress={() => {
              // Handle create route action
            }}
          />
        </View>
      ) : (
        <ScrollView>
          {routes.map((route, index) => (
            <View key={index} style={styles.container}>
              <View style={styles.itemContainer}>
                <Text style={styles.title}>{route.name}</Text>
                <Text>{route.description}</Text>
              </View>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineText}>Start Location: {route.startLocation}</Text>
              </View>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineText}>End Location: {route.endLocation}</Text>
              </View>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineText}>Distance: {route.distance || 0} km</Text>
              </View>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineText}>Duration: {route.duration} minutes</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Route;

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timelineItem: {
    marginBottom: 5,
  },
  timelineText: {
    fontSize: 16,
  },
});
