import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const notificationsData = [
  { id: '1', type: 'Issue', message: 'Your pull request was merged', time: '2 hours ago' },
  { id: '2', type: 'PullRequest', message: 'New issue opened', time: '3 hours ago' },
  { id: '3', type: 'Issue', message: 'Your comment received a reply', time: '5 hours ago' },
  { id: '4', type: 'PullRequest', message: 'Your pull request was approved', time: '10 hours ago' },
];

const NotificationScreen = () => {
  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Ionicons name={item.type === 'Issue' ? 'issue-opened' : 'git-pull-request'} size={24} color="#0366d6" />
      <View style={styles.notificationContent}>
        <Text>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

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

export default NotificationScreen;
