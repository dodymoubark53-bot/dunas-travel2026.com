import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingContact from './FloatingContact';
import BackgroundMusic from '../ui/BackgroundMusic';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Trusted Partners Logos - White Background */}
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-center text-obsidian-900 text-xl sm:text-2xl font-bold mb-10">Trusted Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 lg:gap-16 items-center justify-items-center">
            {[
              { src: "https://res.cloudinary.com/degbrq3ck/image/upload/w_400,h_240,c_limit,q_auto,f_auto/v1783033035/dunas-travel-logo-removebg-preview_mjfl90.png", alt: "Logo 1" },
              { src: "https://res.cloudinary.com/degbrq3ck/image/upload/w_400,h_240,c_limit,q_auto,f_auto/v1783033441/logo20_f5rfsz.png", alt: "Logo 2" },
              { src: "https://res.cloudinary.com/degbrq3ck/image/upload/w_400,h_240,c_limit,q_auto,f_auto/v1783033442/logo3_sk0tns.png", alt: "Logo 3" },
              { src: "https://res.cloudinary.com/degbrq3ck/image/upload/w_400,h_240,c_limit,q_auto,f_auto/v1783033442/logo4_tso9ey.png", alt: "Logo 4" },
              { src: "https://res.cloudinary.com/degbrq3ck/image/upload/w_400,h_240,c_limit,q_auto,f_auto/v1783033440/logo5_qpuki9.png", alt: "Logo 5" },
              { src: "https://res.cloudinary.com/degbrq3ck/image/upload/v1783074195/drilldown-removebg-preview_z9np4k.png", alt: "Logo 6" },
            ].map((logo, idx) => (
              <div key={idx} className="flex items-center justify-center w-full h-28 select-none">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-20 md:max-h-24 max-w-[180px] md:max-w-[220px] w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
      <BackgroundMusic />
    </div>
  );
};

export default Layout;
