import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState('USD');

  // Load selected currency from localStorage on mount
  useEffect(() => {
    const storedCurrency = localStorage.getItem('currency');
    if (storedCurrency === 'USD' || storedCurrency === 'EUR') {
      setCurrencyState(storedCurrency);
    }
  }, []);

  const setCurrency = (newCurrency) => {
    if (newCurrency === 'USD' || newCurrency === 'EUR') {
      setCurrencyState(newCurrency);
      localStorage.setItem('currency', newCurrency);
    }
  };

  const formatPrice = (amount) => {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) return '';

    if (currency === 'USD') {
      const formatted = numericAmount.toLocaleString('en-US', {
        minimumFractionDigits: numericAmount % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
      });
      return `$${formatted}`;
    } else {
      const converted = numericAmount * 0.92;
      const formatted = converted.toLocaleString('en-US', {
        minimumFractionDigits: converted % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
      });
      return `€${formatted}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
