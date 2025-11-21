import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TransactionItem({ transaction }) {
  return (
    <View style={styles.item}>
      <Text style={styles.type}>{transaction.type}</Text>
      <Text style={styles.amount}>₹ {transaction.amount.toFixed(2)}</Text>
      <Text style={styles.date}>{new Date(transaction.date).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#1B263B',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  type: { color: '#F8F9FA', fontWeight: 'bold', fontSize: 16 },
  amount: { color: '#3BB54A', fontSize: 16, marginTop: 5 },
  date: { color: '#B0B0B0', fontSize: 12, marginTop: 3 },
});
