
const Logo = ({ theme = 'dark', height = 60 }) => {
  return (
    <img
      src="/dunas-travel-logo.png"
      alt="Dunas Travel"
      className={`flex-shrink-0 object-contain ${theme === 'light' ? 'invert brightness-50' : ''}`}
      style={{ height: `${height}px`, width: 'auto' }}
    />
  );
};

export default Logo;