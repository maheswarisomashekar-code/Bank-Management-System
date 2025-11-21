// frontend/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BankProvider } from './context/BankContext';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Deposit from './screens/Deposit';
import Withdraw from './screens/Withdraw';
import Transfer from './screens/Transfer';
import Payments from './screens/Payments';
import Transactions from './screens/Transactions';
import Profile from './screens/Profile';
import Loan from './screens/Loan';
import AccountAvengers from "./screens/AccountAvengers";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <BankProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AccountAvengers"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="AccountAvengers" component={AccountAvengers} />
    
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Deposit" component={Deposit} />
          <Stack.Screen name="Withdraw" component={Withdraw} />
          <Stack.Screen name="Transfer" component={Transfer} />
          <Stack.Screen name="Payments" component={Payments} />
          <Stack.Screen name="Transactions" component={Transactions} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Loan" component={Loan} />

        </Stack.Navigator>
      </NavigationContainer>
    </BankProvider>
  );
}
