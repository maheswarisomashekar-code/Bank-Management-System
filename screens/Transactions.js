import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { BankContext } from '../context/BankContext';
import TransactionItem from '../components/TransactionItem';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function Transactions() {
  const { transactions } = useContext(BankContext);
  const screenWidth = Dimensions.get('window').width - 40;

  const chartData = {
    labels: transactions.slice(0, 5).map(tx => new Date(tx.date).getDate().toString()),
    datasets: [{ data: transactions.slice(0, 5).map(tx => tx.amount) }],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Transaction History</Text>

      {transactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)}

      {transactions.length > 0 && (
        <LineChart
          data={chartData}
          width={screenWidth}
          height={220}
          yAxisLabel="₹"
          chartConfig={{
            backgroundColor: '#0D1B2A',
            backgroundGradientFrom: '#0D1B2A',
            backgroundGradientTo: '#1B263B',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(50,130,184, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(248,249,250, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 20, borderRadius: 16 }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1B2A' },
  title: { color: '#F8F9FA', fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
});
