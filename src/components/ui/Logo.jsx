const Logo = ({ height = 60 }) => {
  return (
    <img
      src="https://res.cloudinary.com/degbrq3ck/image/upload/v1783033035/dunas-travel-logo-removebg-preview_mjfl90.png"
      alt="Dunas Travel"
      className="flex-shrink-0 object-contain"
      style={{ height: `${height}px`, width: 'auto' }}
    />
  );
};

export default Logo;
