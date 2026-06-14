import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 backdrop-blur-sm">
      <button
        onClick={() => setCurrency('USD')}
        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
          currency === 'USD'
            ? 'bg-gold-500 text-obsidian-900 shadow-sm'
            : 'text-white/70 hover:text-white hover:bg-white/5'
        }`}
      >
        $ USD
      </button>
      <button
        onClick={() => setCurrency('EUR')}
        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
          currency === 'EUR'
            ? 'bg-gold-500 text-obsidian-900 shadow-sm'
            : 'text-white/70 hover:text-white hover:bg-white/5'
        }`}
      >
        € EUR
      </button>
    </div>
  );
};

export default CurrencySelector;
