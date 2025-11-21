import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { BankContext } from '../context/BankContext';

export default function Loan() {
  const { user, setBalance, setTransactions } = useContext(BankContext);
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(''); // months
  const [emi, setEmi] = useState(0);

  // Simple EMI calculation
  const calculateEmi = (principal, months, rate = 0.12) => {
    const monthlyRate = rate / 12;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  };

  const handleLoan = async () => {
    if (!amount || !duration) return Alert.alert('Error', 'Enter amount and duration');

    const loanAmount = parseFloat(amount);
    const months = parseInt(duration);

    const calculatedEmi = calculateEmi(loanAmount, months);
    setEmi(calculatedEmi.toFixed(2));

    try {
      const res = await fetch('http://10.198.71.168:3000/loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, amount: loanAmount }),
      });

      const data = await res.json();
      if (res.status !== 200) return Alert.alert('Error', data.message);

      // Update balance
      setBalance(data.balance);

      // Add transaction locally
      setTransactions(prev => [
        { id: Date.now(), userId: user.id, type: 'Loan', amount: loanAmount, note: `Loan approved for ${months} months, EMI ₹${calculatedEmi.toFixed(2)}`, date: new Date().toISOString() },
        ...prev
      ]);

      Alert.alert('Success', `Loan approved! Monthly EMI: ₹${calculatedEmi.toFixed(2)}`);
      setAmount('');
      setDuration('');
    } catch (err) {
      Alert.alert('Error', 'Server not running or network issue');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply for Loan</Text>

      <TextInput
        placeholder="Loan Amount"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        placeholder="Duration (Months)"
        keyboardType="numeric"
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
      />

      <TouchableOpacity style={styles.button} onPress={handleLoan}>
        <Text style={styles.buttonText}>Apply Loan</Text>
      </TouchableOpacity>

      {emi > 0 && (
        <Text style={styles.emiText}>Monthly EMI: ₹{emi}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0D1B2A' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F8F9FA', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#1B263B', color: '#F8F9FA', padding: 12, marginBottom: 15, borderRadius: 10 },
  button: { backgroundColor: '#FFC300', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#0D1B2A', fontWeight: 'bold', fontSize: 18 },
  emiText: { color: '#F8F9FA', fontSize: 18, marginTop: 10, textAlign: 'center' },
});
