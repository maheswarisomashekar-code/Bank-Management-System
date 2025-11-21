import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await fetch('http://10.198.71.168:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.status !== 200) return Alert.alert('Error', data.message);
      Alert.alert('Success', 'Signup successful! Please login.');
      navigation.replace('Login');
    } catch (err) {
      Alert.alert('Error', 'Server not running or network issue');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BankFi Signup</Text>
      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signupText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0D1B2A' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#F8F9FA', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#1B263B', color: '#F8F9FA', padding: 12, marginBottom: 15, borderRadius: 10 },
  button: { backgroundColor: '#3282B8', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#F8F9FA', fontSize: 18, fontWeight: 'bold' },
  signupText: { color: '#B0B0B0', textAlign: 'center', marginTop: 10 }
});
