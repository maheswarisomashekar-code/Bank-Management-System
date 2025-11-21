import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { BankContext } from '../context/BankContext';
import BalanceCard from '../components/BalanceCard';
import ActionButton from '../components/ActionButton';

export default function Home({ navigation }) {
  const { balance } = useContext(BankContext);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <BalanceCard balance={balance} />

      <ActionButton title="Deposit" onPress={() => navigation.navigate('Deposit')} />
      <ActionButton title="Withdraw" onPress={() => navigation.navigate('Withdraw')} />
      <ActionButton title="Transfer" onPress={() => navigation.navigate('Transfer')} />
      <ActionButton title="Payments & Recharge" onPress={() => navigation.navigate('Payments')} />
      <ActionButton title="Transactions" onPress={() => navigation.navigate('Transactions')} />
      <ActionButton title="Profile" onPress={() => navigation.navigate('Profile')} />
      <ActionButton title="Apply Loan" onPress={() => navigation.navigate('Loan')} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8faff' },
  title: { color: '#F8F9FA', fontSize: 26, fontWeight: 'bold', marginBottom: 20 , },
});
