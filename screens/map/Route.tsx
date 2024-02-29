import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import CreateRouteModal from '../../components/Modal';

const Route = ( ) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://gps-backend.imc.co.tz:8000/api/v1/route/all");
        setRoutes(response.data?.route);
        console.log(response.data?.route);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <View>
      {routes.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: 0, bottom: 0, paddingHorizontal: 0, }}>
          <Text>No Routes Found Yet</Text>
          <Button
            title="Create Route"
            onPress={() => {
              <CreateRouteModal visible={true}/>
            }}
          />
        </View>
      ) : (
        <ScrollView>
          {routes.map(route => (
            <View style={styles.container}>
              <View>
                <View style={{ marginBottom: 4 }}>
                <Text>{route.name}</Text>
                </View>
                
                <Text>{route.description}</Text>
              </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineText}>Start Location: {route.startLocation}</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineText}>End Location: {route.endLocation}</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineText}>Distance: {route.distance === null ? 0 : "loading..."} km</Text>
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
  timelineItem: {
    marginBottom: 5,
  },
  timelineText: {
    fontSize: 16,
  },
});
