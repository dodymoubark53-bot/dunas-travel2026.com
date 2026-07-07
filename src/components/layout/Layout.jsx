import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingContact from './FloatingContact';
import BackgroundMusic from '../ui/BackgroundMusic';

const Layout = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <FloatingContact />
      <BackgroundMusic />
    </div>
  );
};

export default Layout;
