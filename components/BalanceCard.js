import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BalanceCard({ balance }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Your Balance</Text>
      <Text style={styles.amount}>₹ {balance.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1B263B',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  label: { color: '#B0B0B0', fontSize: 16 },
  amount: { color: '#F8F9FA', fontSize: 28, fontWeight: 'bold', marginTop: 5 },
});
