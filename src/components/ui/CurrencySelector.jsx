import { useCurrency } from '../../context/CurrencyContext';

const CurrencySelector = ({ light }) => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={`inline-flex items-center rounded-full p-0.5 ${light ? 'bg-obsidian-50 border border-obsidian-200' : 'bg-white/5 border border-white/10 backdrop-blur-sm'}`}>
      <button
        onClick={() => setCurrency('USD')}
        className={`currency-btn px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
          currency === 'USD'
            ? 'bg-gold-500 text-obsidian-900 shadow-sm'
            : light
              ? 'text-obsidian-400 hover:text-obsidian-900 hover:bg-obsidian-100'
              : 'text-white/70 hover:text-white hover:bg-white/5'
        }`}
      >
        $ USD
      </button>
      <button
        onClick={() => setCurrency('EUR')}
        className={`currency-btn px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
          currency === 'EUR'
            ? 'bg-gold-500 text-obsidian-900 shadow-sm'
            : light
              ? 'text-obsidian-400 hover:text-obsidian-900 hover:bg-obsidian-100'
              : 'text-white/70 hover:text-white hover:bg-white/5'
        }`}
      >
        € EUR
      </button>
    </div>
  );
};

export default CurrencySelector;
