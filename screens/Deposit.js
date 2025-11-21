import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { BankContext } from '../context/BankContext';

export default function Deposit({ navigation }) {
  const { user, setBalance, setTransactions } = useContext(BankContext);
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    if (!amount) return Alert.alert('Error', 'Enter amount');

    const res = await fetch('http://10.198.71.168:3000/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, type: 'Deposit', amount: parseFloat(amount) }),
    });
    const data = await res.json();
    if (res.status !== 200) return Alert.alert('Error', data.message);

    setBalance(data.balance);

    // Fetch updated transactions
    const txRes = await fetch(`http://10.198.71.168:3000/transactions/${user.id}`);
    const txData = await txRes.json();
    setTransactions(txData || []);

    Alert.alert('Success', `Deposited ₹${amount}`);
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deposit Money</Text>
      <TextInput placeholder="Amount" keyboardType="numeric" style={styles.input} value={amount} onChangeText={setAmount} />
      <TouchableOpacity style={styles.button} onPress={handleDeposit}>
        <Text style={styles.buttonText}>Deposit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0D1B2A' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F8F9FA', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#1B263B', color: '#F8F9FA', padding: 12, marginBottom: 15, borderRadius: 10 },
  button: { backgroundColor: '#3BB54A', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#F8F9FA', fontWeight: 'bold', fontSize: 18 },
});
