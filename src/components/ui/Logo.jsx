const Logo = ({ height = 60 }) => {
  return (
    <img
      src="/dunas-travel-logo.png"
      alt="Dunas Travel"
      className="flex-shrink-0 object-contain"
      style={{ height: `${height}px`, width: 'auto' }}
    />
  );
};

export default Logo;
