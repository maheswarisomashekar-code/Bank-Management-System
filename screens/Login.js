import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Animated } from 'react-native';
import { BankContext } from '../context/BankContext';

export default function Login({ navigation }) {
  const { setUser, setBalance, setTransactions } = useContext(BankContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = new Animated.Value(0);

  Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://10.198.71.168:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!data.success) return Alert.alert('Error', data.message);

      const user = data.user;
      setUser(user);
      setBalance(user.balance || 0);
      setTransactions(user.transactions || []);
      navigation.replace('Home');
    } catch (err) {
      Alert.alert('Error', 'Server not running or network issue');
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Welcome to BankFi 🛡️</Text>

      {/* Buttons to choose flow */}
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.optionText}>Create New Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => {}}>
          <Text style={styles.optionText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Login Form */}
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0D1B2A' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#F8F9FA', marginBottom: 20, textAlign: 'center' },
  optionContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  optionButton: { flex: 1, backgroundColor: '#3282B8', padding: 12, borderRadius: 10, marginHorizontal: 5, alignItems: 'center' },
  optionText: { color: '#F8F9FA', fontWeight: 'bold', fontSize: 16 },
  input: { backgroundColor: '#1B263B', color: '#F8F9FA', padding: 12, marginBottom: 15, borderRadius: 10 },
  button: { backgroundColor: '#3BB54A', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#F8F9FA', fontSize: 18, fontWeight: 'bold' },
});
