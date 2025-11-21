import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BankContext } from '../context/BankContext';

export default function Profile({ navigation }) {
  const { user, setUser, setBalance, setTransactions } = useContext(BankContext);

  const handleLogout = () => {
    setUser(null);
    setBalance(0);
    setTransactions([]);
    Alert.alert('Logged Out', 'You have been logged out');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Username: {user.username}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0D1B2A' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F8F9FA', marginBottom: 20, textAlign: 'center' },
  info: { color: '#F8F9FA', fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: '#E63946', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#F8F9FA', fontWeight: 'bold', fontSize: 18 },
});
