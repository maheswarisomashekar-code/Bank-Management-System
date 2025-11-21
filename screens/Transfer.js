import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { BankContext } from '../context/BankContext';

export default function Transfer() {
  const { user, setBalance } = useContext(BankContext);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleTransfer = async () => {
    if (!amount || !recipient) return Alert.alert('Error', 'Enter amount and recipient');
    const res = await fetch('http://10.198.71.168:3000/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, type: 'Transfer', amount: parseFloat(amount), note: `To ${recipient}` }),
    });
    const data = await res.json();
    if (res.status !== 200) return Alert.alert('Error', data.message);
    setBalance(data.balance);
    Alert.alert('Success', `Transferred ₹${amount} to ${recipient}`);
    setAmount(''); setRecipient('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transfer Money</Text>
      <TextInput placeholder="Recipient Name" style={styles.input} value={recipient} onChangeText={setRecipient} />
      <TextInput placeholder="Amount" keyboardType="numeric" style={styles.input} value={amount} onChangeText={setAmount} />
      <TouchableOpacity style={styles.button} onPress={handleTransfer}>
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0D1B2A' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F8F9FA', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#1B263B', color: '#F8F9FA', padding: 12, marginBottom: 15, borderRadius: 10 },
  button: { backgroundColor: '#FFB703', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#0D1B2A', fontWeight: 'bold', fontSize: 18 },
});
