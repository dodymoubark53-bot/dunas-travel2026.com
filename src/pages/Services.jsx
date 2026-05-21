import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, cardHover } from '../animations/variants';
import Button from '../components/ui/Button';
import { services as allServicesData } from '../data/services';
import { transportation } from '../data/transportation';

const Services = () => {
  const { t } = useTranslation();
  const { service } = useParams();

  const categories = [
    { id: 'hotels', title: t('nav.hotels', 'Luxury Hotels'), desc: t('data.Hand-picked 5-star accommodations offering unparalleled views and comfort.') },
    { id: 'safari', title: t('nav.safari', 'Desert Safari'), desc: t('data.Thrilling off-road adventures with premium SUVs and expert drivers.') },
    { id: 'camping', title: t('nav.camping', 'Glamping'), desc: t('data.Luxury tented camps under the stars with private chefs and amenities.') },
    { id: 'cruises', title: t('nav.cruises', 'Nile Cruises'), desc: t('data.Boutique Dahabiyas and luxury ships sailing the timeless river.') },
    { id: 'transportation', title: t('nav.transportation', 'Transportation'), desc: t('services.transportationShortDesc', 'Premium vehicles with professional drivers.') }
  ];

  const filteredServices = service ? allServicesData.filter(s => s.category === service) : allServicesData;

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{service ? `${t(`nav.${service}`, service.charAt(0).toUpperCase() + service.slice(1))} | ${t('services.seoServices', 'Luxury Services')}` : t('services.seoTitle', 'Our Services | Luxury Travel')}</title>
        <meta name="description" content={t('services.seoDesc', 'Discover our tailored luxury services including 5-star hotels, desert safaris, glamping, and private Nile cruises.')} />
      </Helmet>
      <section className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {service === 'safari' ? (
            <>
              <img
                src="https://images.unsplash.com/photo-1682687982185-531d09ec56fc?auto=format&fit=crop&w=1920&q=80"
                alt="Desert Safari Sunset"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div 
                className="absolute inset-0" 
                style={{ backgroundImage: 'linear-gradient(to bottom, rgba(15,13,11,0.3), rgba(15,13,11,0.65))' }}
              ></div>
            </>
          ) : service === 'cruises' ? (
            <>
              <img
                src="/imgs/nile cruises/img-20171013-wa0000(1).jpg"
                alt="Nile River Cruise Luxury Egypt Sunset"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div 
                className="absolute inset-0" 
                style={{ backgroundImage: 'linear-gradient(to bottom, rgba(15,13,11,0.3), rgba(15,13,11,0.65))' }}
              ></div>
            </>
          ) : service === 'camping' ? (
            <>
              <img
                src="https://images.unsplash.com/photo-1534777367038-9404f45b869a?auto=format&fit=crop&w=1920&q=80"
                alt="Luxury Desert Camping Starry Night"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div 
                className="absolute inset-0" 
                style={{ backgroundImage: 'linear-gradient(to bottom, rgba(15,13,11,0.3), rgba(15,13,11,0.65))' }}
              ></div>
            </>
          ) : service === 'hotels' ? (
            <>
              <img
                src="/imgs/hotels/16015431-external-view-kempinski-ishtar-dead-sea.jpg"
                alt="Luxury Hotel Exterior"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div 
                className="absolute inset-0" 
                style={{ backgroundImage: 'linear-gradient(to bottom, rgba(15,13,11,0.3), rgba(15,13,11,0.65))' }}
              ></div>
            </>
          ) : service === 'transportation' ? (
            <>
              <img
                src="https://images.unsplash.com/photo-1550355291-bbee04aed9c2?auto=format&fit=crop&w=1920&q=80"
                alt="Luxury Car Scenic Road"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div 
                className="absolute inset-0" 
                style={{ backgroundImage: 'linear-gradient(to bottom, rgba(15,13,11,0.3), rgba(15,13,11,0.65))' }}
              ></div>
            </>
          ) : (
            <>
              <img
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80"
                alt="Luxury Travel Resort Sunset"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div 
                className="absolute inset-0" 
                style={{ backgroundImage: 'linear-gradient(to bottom, rgba(15,13,11,0.4), rgba(15,13,11,0.7))' }}
              ></div>
            </>
          )}
        </div>
        <motion.div className="relative z-10 text-center px-6 mt-20" variants={staggerContainer} initial="hidden" animate="visible">
          <motion.span variants={fadeInUp} className="text-gold-500 uppercase tracking-widest text-caption block mb-4">{t('services.subtitle', 'Tailored Experiences')}</motion.span>
          <motion.h1 
            variants={fadeInUp} 
            className="text-display-xl text-ivory-50"
            style={['safari', 'cruises', 'camping', 'hotels', 'transportation'].includes(service) ? { fontFamily: "'Playfair Display', serif" } : {}}
          >
            {service === 'safari' ? t('nav.safari', 'Desert Safari') : 
             service === 'cruises' ? t('nav.cruises', 'Nile Cruises') :
             service === 'camping' ? t('nav.camping', 'Glamping') : 
             service === 'hotels' ? t('nav.hotels', 'Luxury Hotels') : 
             service === 'transportation' ? t('nav.transportation', 'Transportation') : t('services.ourServices', 'Our Services')}
          </motion.h1>
          {service === 'safari' ? (
            <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 mt-4 max-w-2xl mx-auto">
              {t('services.safariDesc', 'Embark on an unforgettable off-road adventure through shifting sands and majestic desert landscapes.')}
            </motion.p>
          ) : service === 'cruises' ? (
            <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 mt-4 max-w-2xl mx-auto">
              {t('services.cruisesDesc', 'Sail Through the Heart of Ancient Egypt')}
            </motion.p>
          ) : service === 'camping' ? (
            <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 mt-4 max-w-2xl mx-auto">
              {t('services.campingDesc', 'Experience luxury tented camps under the stars with private chefs and premium amenities.')}
            </motion.p>
          ) : service === 'hotels' ? (
            <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 mt-4 max-w-2xl mx-auto">
              {t('services.hotelsDesc', 'Hand-picked 5-star accommodations offering unparalleled views and absolute comfort.')}
            </motion.p>
          ) : service === 'transportation' ? (
            <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 mt-4 max-w-2xl mx-auto">
              {t('services.transportationDesc', 'Premium vehicles with professional drivers ensuring absolute comfort and safety.')}
            </motion.p>
          ) : service && (
            <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 mt-4 capitalize">
              {t('services.explore', 'Explore')} {t(`nav.${service}`, service)}
            </motion.p>
          )}
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-12">
        {/* Category Selector */}
        <div className="flex overflow-x-auto hide-scrollbar md:flex-wrap md:justify-center gap-4 mb-16 pb-4">
          <Link to="/services" className="shrink-0">
            <Button variant={!service ? 'gold-glow' : 'outline-gold'} className="px-6 py-2 text-sm">{t('services.allServices', 'All Services')}</Button>
          </Link>
          {categories.map(cat => (
            <Link key={cat.id} to={`/services/${cat.id}`} className="shrink-0">
              <Button variant={service === cat.id ? 'gold-glow' : 'outline-gold'} className="px-6 py-2 text-sm">{cat.title}</Button>
            </Link>
          ))}
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filteredServices.map((item) => (
              <motion.div 
                key={item.id} 
                variants={fadeInUp}
                className="bg-ivory-50 rounded-2xl overflow-hidden shadow-card group h-full flex flex-col transition-all"
              >
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-gold-500 text-obsidian-900 text-caption uppercase px-3 py-1 rounded-full shadow-md">{t(`data.${item.location}`, item.location)}</div>
                  <img src={item.images[0]} alt={t(`data.${item.title}`, item.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-caption text-obsidian-300 uppercase tracking-widest">{t(`nav.${item.category}`, item.category)}</span>
                    <div className="flex items-center text-gold-500 text-caption font-medium">
                      <span className="mr-1">★</span> {item.rating}
                    </div>
                  </div>
                  <h3 className="text-display-md text-obsidian-900 mb-3 text-xl line-clamp-1">{t(`data.${item.title}`, item.title)}</h3>
                  <p className="text-body-sm text-obsidian-500 line-clamp-2 mb-6">{t(`data.${item.shortDesc}`, item.shortDesc)}</p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-caption text-obsidian-300 block">{t('tourCard.from', 'From')}</span>
                      <span className="text-body-lg font-semibold text-obsidian-900">${item.price}</span>
                    </div>
                    <Link to={`/services/${item.category}/${item.slug}`}>
                      <Button variant="outline-gold" className="px-4 py-2 text-sm group-hover:bg-gold-500 group-hover:text-obsidian-900 group-hover:shadow-[0_0_15px_rgba(201,162,39,0.4)] transition-all">{t('tourCard.viewDetails', 'View Details')}</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}        {/* Transportation Section */}
        {(!service || service === 'transportation') && (
          <div className={!service ? "mt-20" : ""}>
            {!service && <h2 className="text-display-lg text-obsidian-900 mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>{t('nav.transportation', 'Transportation')}</h2>}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {transportation.map((item) => (
                <motion.div 
                   key={item.id} 
                  variants={fadeInUp}
                  className="bg-ivory-50 rounded-2xl overflow-hidden shadow-card group h-full flex flex-col transition-all"
                >
                  <div className="relative h-60 overflow-hidden">
                    <div className="absolute top-4 left-4 z-10 bg-gold-500 text-obsidian-900 text-caption uppercase px-3 py-1 rounded-full shadow-md">{t(`transportation.cat.${item.category}`, item.category)}</div>
                    <img src={item.heroImage || item.image} alt={t(`data.${item.name}`, item.name)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-caption text-obsidian-300 uppercase tracking-widest">{t('nav.transportation', 'Transportation')}</span>
                      <div className="flex items-center text-gold-500 text-caption font-medium">
                        <span className="mr-1">★</span> {item.rating}
                      </div>
                    </div>
                    <h3 className="text-display-md text-obsidian-900 mb-3 text-xl line-clamp-1">{t(`data.${item.name}`, item.name)}</h3>
                    <p className="text-body-sm text-obsidian-500 line-clamp-2 mb-6">
                      {item.seats} {t('transportation.seatsCount', 'Seats')} • {t(`data.${item.transmission}`, item.transmission)} • {item.doors} {t('transportation.doorsCount', 'Doors')}
                    </p>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-caption text-obsidian-300 block">{t('tourCard.from', 'From')}</span>
                        <span className="text-body-lg font-semibold text-obsidian-900">${item.pricePerDay}</span>
                      </div>
                      <Link to={`/transportation/${item.id}`}>
                        <Button variant="outline-gold" className="px-4 py-2 text-sm group-hover:bg-gold-500 group-hover:text-obsidian-900 group-hover:shadow-[0_0_15px_rgba(201,162,39,0.4)] transition-all">{t('tourCard.viewDetails', 'View Details')}</Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Services;
