import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ActionButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#3282B8',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  text: { color: '#F8F9FA', fontWeight: 'bold', fontSize: 16 },
});
