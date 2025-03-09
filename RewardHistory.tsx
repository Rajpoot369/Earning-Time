import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface RewardHistoryProps {
  balance: number;
}

export default function RewardHistory({ balance }: RewardHistoryProps) {
  const mockHistory = [
    { id: 1, title: 'Daily Bonus', amount: 1.00, timestamp: '2 hours ago' },
    { id: 2, title: 'Watch Streak Bonus', amount: 0.50, timestamp: '5 hours ago' },
    { id: 3, title: 'Advertisement View', amount: 0.25, timestamp: '1 day ago' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Earning History</Text>
      
      {mockHistory.map(item => (
        <View key={item.id} style={styles.historyItem}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="cash-plus" size={24} color="#4C6FFF" />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
          <Text style={styles.amount}>+${item.amount.toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  timestamp: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 2,
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#40C057',
  },
});