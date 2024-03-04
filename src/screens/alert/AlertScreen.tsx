import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const notificationsData = [
  { id: '1', type: 'Overspeeding', message: 'Vehicle exceeded speed limit', time: '2024-02-29T09:30:00' },
  { id: '2', type: 'Ignition', message: 'Vehicle ignition turned on', time: '2024-02-28T15:20:00' },
  { id: '3', type: 'Movement', message: 'Vehicle started moving', time: '2024-02-28T10:45:00' },
  { id: '4', type: 'Network', message: 'Lost connection to the device', time: '2024-02-27T20:15:00' },
];

const AlertScreen = () => {
  const renderNotificationItem = ({ item }: any) => (
    <View style={styles.notificationItem}>
      <Ionicons name={getIconName(item.type)} size={24} color="#0366d6" />
      <View style={styles.notificationContent}>
        <Text>{item.message}</Text>
        <Text style={styles.notificationTime}>{formatTime(item.time)}</Text>
      </View>
    </View>
  );

  const getIconName = (type: string) => {
    switch (type) {
      case 'Overspeeding':
        return 'speedometer';
      case 'Ignition':
        return 'power';
      case 'Movement':
        return 'car';
      case 'Network':
        return 'wifi';
      default:
        return 'information-circle';
    }
  };

  const formatTime = (time: string) => {
    // Assume 'time' is in ISO 8601 format (e.g., '2024-02-29T09:30:00')
    const notificationDate = new Date(time);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const notificationDateString =
      notificationDate.toDateString() === today.toDateString()
        ? 'Today'
        : notificationDate.toDateString() === yesterday.toDateString()
        ? 'Yesterday'
        : notificationDate.toLocaleDateString();
    const notificationTimeString = notificationDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${notificationDateString}, ${notificationTimeString}`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsData}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaecef',
  },
  notificationContent: {
    marginLeft: 16,
    flex: 1,
  },
  notificationTime: {
    color: '#6a737d',
    marginTop: 4,
  },
});

export default AlertScreen;