import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { BankContext } from '../context/BankContext';

export default function Payments() {
  const { user, setBalance } = useContext(BankContext);
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');

  const handlePayment = async (type) => {
    if (!amount) return Alert.alert('Error', 'Enter amount');
    const res = await fetch('http://10.198.71.168:3000/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, type, amount: parseFloat(amount), phoneNumber: phone }),
    });
    const data = await res.json();
    if (res.status !== 200) return Alert.alert('Error', data.message);
    setBalance(data.balance);
    Alert.alert('Success', `${type} of ₹${amount} successful`);
    setAmount(''); setPhone('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payments & Recharge</Text>
      <TextInput placeholder="Phone Number" keyboardType="phone-pad" style={styles.input} value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Amount" keyboardType="numeric" style={styles.input} value={amount} onChangeText={setAmount} />

      <TouchableOpacity style={styles.button} onPress={() => handlePayment('Bill Payment')}>
        <Text style={styles.buttonText}>Pay Bill</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePayment('Recharge')}>
        <Text style={styles.buttonText}>Mobile Recharge</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0D1B2A' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F8F9FA', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#1B263B', color: '#F8F9FA', padding: 12, marginBottom: 15, borderRadius: 10 },
  button: { backgroundColor: '#3BB54A', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 5 },
  buttonText: { color: '#F8F9FA', fontWeight: 'bold', fontSize: 18 },
});
