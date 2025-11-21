// frontend/context/BankContext.js
import React, { createContext, useState } from 'react';

export const BankContext = createContext();

export const BankProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  return (
    <BankContext.Provider
      value={{
        user,
        setUser,
        balance,
        setBalance,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};
