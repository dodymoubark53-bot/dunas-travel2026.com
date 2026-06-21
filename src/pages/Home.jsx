import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaStar, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fadeInUp, staggerContainer } from "../animations/variants";
import Button from "../components/ui/Button";
import TourCard from "../components/tour/TourCard";
import { tours } from "../data/tours";
import { services } from "../data/services";
import { transportation } from "../data/transportation";
import { useCurrency } from "../context/CurrencyContext";

const destinationsData = [
  {
    id: "egypt",
    name: "Egypt",
    desc: "Pharaohs & Wonders",
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "turkey",
    name: "Turkey",
    desc: "East Meets West",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "jordan",
    name: "Jordan",
    desc: "Desert & Ancient Ruins",
    image: "https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "morocco",
    name: "Morocco",
    desc: "Colors & Culture",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "greece",
    name: "Greece",
    desc: "Myths & Blue Horizons",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dubai",
    name: "Dubai",
    desc: "Luxury & Skylines",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tunisia",
    name: "Tunisia",
    desc: "Sahara & Sea",
    image: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "holy-land",
    name: "Holy Land",
    desc: "Faith & History",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80",
  },
];

const Home = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const [activeDestination, setActiveDestination] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isAllToursPopupOpen, setIsAllToursPopupOpen] = useState(false);

  // Transportation State
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [resForm, setResForm] = useState({
    vehicle: "",
    date: "",
    time: "",
    adults: 1,
    children: 0,
    pickup: "",
    dropoff: "",
    name: "",
    phone: "",
    email: "",
  });
  const [resSuccess, setResSuccess] = useState(false);

  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const todayStr = getTodayString();

  const handleResSubmit = (e) => {
    e.preventDefault();
    if (resForm.date && resForm.date < todayStr) {
      return;
    }
    setResSuccess(true);
    setTimeout(() => setResSuccess(false), 5000);
    setResForm({
      vehicle: "",
      date: "",
      time: "",
      adults: 1,
      children: 0,
      pickup: "",
      dropoff: "",
      name: "",
      phone: "",
      email: "",
    });
  };

  const handleHomeReserveClick = (vehicleId) => {
    setResForm((prev) => ({ ...prev, vehicle: vehicleId }));
    const element = document.getElementById("home-reservation-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredVehicles =
    vehicleFilter === "all"
      ? transportation
      : transportation.filter((v) => v.category === vehicleFilter);

  const galleryImages = [
    {
      src: "/imgs/gallery/ephesus & the aegean coast.jpg",
      dest: "Turkey",
      tag: "Tour",
    },
    {
      src: "/imgs/gallery/grand tour of turkey.jpg",
      dest: "Turkey",
      tag: "Tour",
    },
    { src: "/imgs/gallery/1.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/2.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/3.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/4.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/5.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/6.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/7.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/8.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/9.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/10.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/11.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/12.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/13.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/14.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/15.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/16.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/17.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/18.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/19.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/20.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/21.jpeg", dest: "Gallery", tag: "Photo" },
    { src: "/imgs/gallery/22.jpeg", dest: "Gallery", tag: "Photo" },
  ];

  const openLightbox = (index) => {
    setActiveGalleryIndex(index);
    setIsLightboxOpen(true);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveGalleryIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveGalleryIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const featuredHotels = services
    .filter((s) => s.category === "hotels")
    .slice(0, 2);
  const availableSafaris = services
    .filter((s) => s.category === "safari")
    .slice(0, 2);

  const activeTours = activeDestination
    ? tours.filter((t) => t.destination === activeDestination)
    : [];

  const featuredToursList = [
    tours.find((t) => t.destination === "egypt"),
    tours.find((t) => t.destination === "turkey"),
    tours.find(
      (t) =>
        t.destination === "jordan" &&
        t.id !== tours.find((x) => x.destination === "jordan")?.id,
    ),
    tours.find(
      (t) =>
        t.destination === "morocco" &&
        t.id !== tours.find((x) => x.destination === "morocco")?.id,
    ),
    tours.find((t) => t.destination === "tunisia"),
  ].filter(Boolean);

  const handleDestinationClick = (id) => {
    setActiveDestination((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>
          {t(
            "home.metaTitle",
            "Dunas Travel | Award-Winning Experiences in Egypt, Jordan, Turkey & Tunisia",
          )}
        </title>
        <meta
          name="description"
          content={t(
            "home.metaDesc",
            "Experience true luxury with Dunas Travel — curated journeys through the timeless wonders of Egypt, Jordan, Turkey, and Tunisia.",
          )}
        />
        <meta property="og:title" content="Dunas Travel" />
        <meta
          property="og:description"
          content="Premium luxury travel agency — Egypt, Jordan, Turkey & Tunisia"
        />
        <meta property="og:image" content="/dunas-travel-logo.png" />
        <link rel="icon" type="image/png" href="/dunas-travel-logo.png" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.jpg"
            alt="Luxury Travel Hero"
            className="w-full h-full object-cover"
            fetchpriority="high"
          />
          <div className="absolute inset-0"></div>
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-6 text-center mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block font-body text-gold-500 tracking-[0.2em] uppercase text-sm mb-4"
          >
            {t("home.award")}
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-display-xl text-ivory-50 mb-6 max-w-4xl mx-auto drop-shadow-lg whitespace-pre-line"
          >
            {t("home.heroTitle")}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-body-lg text-ivory-300 mb-8 max-w-2xl mx-auto"
          >
            {t("home.heroDesc", "Curating ultra-luxury, personalized itineraries through the timeless wonders of Egypt, Jordan, Turkey, and Tunisia. Experience the world's most captivating destinations in unparalleled style.")}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/destinations">
              <Button
                variant="gold-glow"
                className="w-full sm:w-auto px-8 py-4 text-lg"
              >
                {t("home.exploreDest")}
              </Button>
            </Link>
            <Link to="/tailor-a-tour">
              <Button
                variant="glass"
                className="w-full sm:w-auto px-8 py-4 text-lg"
              >
                {t("home.tailorTour")}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About the Company */}
      <section className="py-12 bg-ivory-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <span className="text-gold-500 uppercase tracking-widest text-caption block mb-4">
                {t("home.whoWeAre", "WHO WE ARE")}
              </span>
              <h2 className="text-display-lg text-obsidian-900 mb-6">
                {t("home.aboutTitle", "Crafting Journeys, Creating Memories")}
              </h2>
              <p className="text-body-lg text-obsidian-700 mb-8 leading-relaxed">
                {t(
                  "home.aboutDesc",
                  "Dunas Travel is a premium luxury travel agency specializing in Egypt, Jordan, Turkey, and Tunisia. Our passion is crafting highly curated tours, exclusive safaris, boutique cruises, and hand-picked hotel experiences for discerning travelers who seek the extraordinary. Let us transform your travel dreams into timeless memories.",
                )}
              </p>
              <Link to="/about">
                <Button variant="outline-gold" className="px-8 py-3">
                  {t("home.learnMore", "Learn More About Us")}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <img
                src="/images/crafting-journeys.jpg"
                alt="Crafting Journeys"
                className="w-full h-[300px] lg:h-[480px] object-cover rounded-[16px] shadow-[0_0_40px_rgba(245,166,35,0.25)] transition-transform duration-400 ease hover:-translate-y-[8px]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destinations & Their Tours */}
      <section className="py-10 bg-[#1d1da3]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-gold-500 uppercase tracking-widest text-caption block mb-4">
              {t("home.discoverMagic")}
            </span>
            <h2 className="text-display-lg text-ivory-50">
              {t("home.destTitle")}
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinationsData.map((dest) => {
              const tourCount = tours.filter(
                (t) => t.destination === dest.id,
              ).length;
              const isActive = activeDestination === dest.id;

              return (
                <motion.div
                  key={dest.id}
                  onClick={() => handleDestinationClick(dest.id)}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 0 32px rgba(245,166,35,0.22)",
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className={`relative h-[300px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 ${isActive ? "ring-2 ring-gold-500 shadow-[0_0_20px_rgba(245,166,35,0.4)] scale-[1.02]" : "hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(245,166,35,0.2)]"}`}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover cinematic-transition group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${isActive ? "bg-obsidian-900/40" : "bg-obsidian-900/60 group-hover:bg-obsidian-900/40"}`}
                  ></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-display-lg text-ivory-50 mb-2">
                      {t(`nav.${dest.id === 'holy-land' ? 'holyland' : dest.id}`, dest.name)}
                    </h3>
                    <p className="text-body-lg text-gold-500 font-medium mb-4">
                      {t(`dest.${dest.id === 'holy-land' ? 'holyland' : dest.id}.subtitle`, t(`data.${dest.desc}`, dest.desc))}
                    </p>
                    <span className="text-caption text-ivory-300 uppercase tracking-wider bg-obsidian-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-ivory-50/10">
                      {tourCount} {t("home.toursAvailable")}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {activeDestination && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-12">
                  <h3 className="text-display-md text-ivory-50 mb-8 text-center capitalize">
                    {t(
                      `nav.${activeDestination === 'holy-land' ? 'holyland' : activeDestination}`,
                      activeDestination.charAt(0).toUpperCase() + activeDestination.slice(1)
                    )}{" "}
                    {t("nav.tours")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeTours.map((tour) => (
                      <TourCard key={tour.id} tour={tour} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-12 bg-ivory-100 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold-500 uppercase tracking-widest text-caption block mb-4">
              {t("home.handpicked", "HANDPICKED FOR YOU")}
            </span>
            <h2 className="text-display-lg text-obsidian-900">
              {t("home.lovedJourneys", "Our Most Loved Journeys")}
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory no-scrollbar w-full px-4 md:px-0">
            {featuredToursList.map((tData, idx) => (
              <motion.div
                key={tData.id}
                className="min-w-[320px] md:min-w-[400px] snap-center shrink-0 group relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 h-[450px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 0 32px rgba(245,166,35,0.22)",
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <img
                  src={tData.images[0]}
                  alt={tData.title}
                  className="w-full h-full object-cover cinematic-transition group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-obsidian-900/20 to-transparent"></div>

                <div className="absolute top-4 left-4 bg-gold-500/90 backdrop-blur-sm text-obsidian-900 text-caption font-bold px-3 py-1 rounded shadow-md uppercase">
                  {t(`nav.${tData.destination === 'holy-land' ? 'holyland' : tData.destination}`, tData.destination)}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-display-md text-ivory-50 mb-2 leading-tight">
                      {t(`data.${tData.title}`, tData.title)}
                    </h3>

                    <div className="flex items-center justify-between text-caption text-ivory-300 mb-4">
                      <span>{t(`data.${tData.duration}`, tData.duration)}</span>
                      <span className="text-gold-500 font-semibold">
                        {formatPrice(tData.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-gold-500 mb-4">
                      {[...Array(Math.floor(tData.rating))].map((_, i) => (
                        <FaStar key={i} size={12} />
                      ))}
                      <span className="text-ivory-50 ml-1 text-xs">
                        ({tData.reviewCount})
                      </span>
                    </div>

                    <Link
                      to={`/tours/${tData.slug}`}
                      className="block opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <Button variant="outline-gold" className="w-full py-2">
                        {t("home.viewTour", "View Tour")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              variant="gold-glow"
              className="px-8 py-3"
              onClick={() => setIsAllToursPopupOpen(true)}
            >
              {t("home.exploreAllTours", "Explore All Tours")}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Hotels & Safaris */}
      <section className="py-12 bg-obsidian-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold-500 uppercase tracking-widest text-caption block mb-4">
              {t("home.premiumSelection")}
            </span>
            <h2 className="text-display-lg text-obsidian-900">
              {t("home.exclusiveServices")}
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Featured Hotels */}
            <div>
              <h3 className="text-display-sm text-obsidian-900 mb-6 pb-4 border-b border-obsidian-900/10">
                {t("home.featuredHotels")}
              </h3>
              <div className="flex flex-col gap-6">
                {featuredHotels.map((hotel) => (
                  <motion.div
                    key={hotel.id}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 0 32px rgba(245,166,35,0.22)",
                      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className="flex flex-col sm:flex-row bg-ivory-50 rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-shadow border border-obsidian-900/5 group"
                  >
                    <div className="w-full sm:w-2/5 h-40 sm:h-auto relative overflow-hidden">
                      <div className="absolute top-3 left-3 z-10 bg-gold-500 text-obsidian-900 text-[10px] uppercase font-bold px-2 py-1 rounded shadow-md">
                        {t(`data.${hotel.location}`, hotel.location) ||
                          hotel.location}
                      </div>
                      <img
                        src={hotel.images[0]}
                        alt={hotel.title}
                        className="w-full h-full object-cover cinematic-transition group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-full sm:w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-display text-obsidian-900 mb-2 line-clamp-1 group-hover:text-gold-500 transition-colors">
                          {t(`data.${hotel.title}`, hotel.title) || hotel.title}
                        </h4>
                        <p className="text-sm text-obsidian-500 line-clamp-2">
                          {t(`data.${hotel.shortDesc}`, hotel.shortDesc) ||
                            hotel.shortDesc}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div>
                          <span className="block text-xs text-obsidian-300 uppercase tracking-wider">
                            {t("home.perNight")}
                          </span>
                          <span className="text-lg font-semibold text-obsidian-900">
                            {formatPrice(hotel.price)}
                          </span>
                        </div>
                        <Link to={`/services/hotels/${hotel.slug}`}>
                          <Button
                            variant="outline-gold"
                            className="px-4 py-1.5 text-sm"
                          >
                            {t("home.viewHotel")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Available Safaris */}
            <div>
              <h3 className="text-display-sm text-obsidian-900 mb-6 pb-4 border-b border-obsidian-900/10">
                {t("home.availableSafaris")}
              </h3>
              <div className="flex flex-col gap-6">
                {availableSafaris.map((safari) => (
                  <motion.div
                    key={safari.id}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 0 32px rgba(245,166,35,0.22)",
                      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className="flex flex-col sm:flex-row bg-ivory-50 rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-shadow border border-obsidian-900/5 group"
                  >
                    <div className="w-full sm:w-2/5 h-40 sm:h-auto relative overflow-hidden">
                      <div className="absolute top-3 left-3 z-10 bg-gold-500 text-obsidian-900 text-[10px] uppercase font-bold px-2 py-1 rounded shadow-md">
                        {t(`data.${safari.location}`, safari.location) ||
                          safari.location}
                      </div>
                      <img
                        src={safari.images[0]}
                        alt={safari.title}
                        className="w-full h-full object-cover cinematic-transition group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-full sm:w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-display text-obsidian-900 mb-2 line-clamp-1 group-hover:text-gold-500 transition-colors">
                          {t(`data.${safari.title}`, safari.title) ||
                            safari.title}
                        </h4>
                        <p className="text-sm text-obsidian-500 line-clamp-2">
                          {t(`data.${safari.shortDesc}`, safari.shortDesc) ||
                            safari.shortDesc}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div>
                          <span className="block text-xs text-obsidian-300 uppercase tracking-wider">
                            {t("home.duration")}
                          </span>
                          <span className="text-sm font-medium text-obsidian-700">
                            {safari.duration
                              ? t(`data.${safari.duration}`, safari.duration) ||
                              safari.duration
                              : "Full Day"}
                          </span>
                        </div>
                        <Link to={`/services/safari/${safari.slug}`}>
                          <Button
                            variant="outline-gold"
                            className="px-4 py-1.5 text-sm"
                          >
                            {t("home.viewSafari")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link to="/services">
              <Button variant="gold-glow" className="px-8 py-3">
                {t("home.viewAll")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Transportation & Transfers */}
      <section className="py-12 bg-ivory-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold-500 uppercase tracking-widest text-caption block mb-4"
            >
              GET AROUND IN STYLE
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-display-lg text-obsidian-900 mb-6"
            >
              Premium Transportation Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-body-lg text-obsidian-700 max-w-2xl mx-auto"
            >
              Luxury vehicles and professional drivers — available across Egypt,
              Jordan, Turkey & Tunisia
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-1 bg-gold-500 mx-auto mt-6"
            ></motion.div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["all", "bus", "coaster", "private"].map((tab) => (
              <button
                key={tab}
                onClick={() => setVehicleFilter(tab)}
                className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium tracking-wide ${vehicleFilter === tab
                  ? "bg-gold-500 text-obsidian-900 border-gold-500 shadow-[0_0_15px_rgba(245,166,35,0.4)]"
                  : "bg-transparent text-obsidian-700 border-obsidian-900/20 hover:border-gold-500 hover:text-gold-500"
                  }`}
              >
                {tab === "all"
                  ? t("home.allVehicles", "All")
                  : tab === "bus"
                    ? t("home.buses", "Buses")
                    : tab === "coaster"
                      ? t("home.coasters", "Coasters")
                      : t("home.privateVehicles", "Private Vehicles")}
              </button>
            ))}
          </div>

          {/* Vehicles Strip */}
          <div className="w-full relative overflow-hidden mb-12">
            <div
              className="flex gallery-strip w-max"
              style={{
                animation: "scrollStrip 80s linear infinite",
                gap: "16px",
              }}
            >
              {Array.from({ length: 4 })
                .flatMap(() => filteredVehicles)
                .map((vehicle, idx) => (
                  <div
                    key={`${vehicle.id}-${idx}`}
                    className="flex-shrink-0 flex flex-col rounded-[16px] overflow-hidden group relative w-[280px] h-[220px] md:h-[380px] transition-all duration-[350ms] ease-out hover:scale-[1.08] hover:-translate-y-[12px] hover:shadow-[0_12px_40px_rgba(245,166,35,0.35)] hover:z-10"
                  >
                    <img
                      src={vehicle.heroImage || vehicle.image}
                      alt={vehicle.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent"></div>

                    <div className="absolute top-4 left-4 bg-gold-500 text-obsidian-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-md">
                      {vehicle.category === 'bus' ? t('transportation.filter.buses', 'Buses') :
                        vehicle.category === 'coaster' ? t('transportation.filter.coasters', 'Coaster Vehicles') :
                          t('transportation.filter.private', 'Private Vehicles')}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end">
                      <h3 className="font-display text-xl text-ivory-50 mb-1 drop-shadow-md">
                        {vehicle.name}
                      </h3>
                      <div className="flex items-center text-xs text-ivory-300 mb-3 gap-1">
                        <svg
                          className="w-4 h-4 text-gold-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        {vehicle.seats}{" "}
                        {t("transportation.seatsCount", "Seats")}
                      </div>

                      <div className="flex items-center justify-between mb-4 border-t border-ivory-50/20 pt-3 mt-1">
                        <span className="text-xs text-ivory-300 uppercase tracking-wider">
                          {t("tourCard.from", "From")}
                        </span>
                        <span className="text-lg font-semibold text-gold-500">
                          {formatPrice(vehicle.pricePerDay)}
                          <span className="text-xs text-ivory-300 font-normal">
                            {" "}
                            / {t("transportation.day", "day")}
                          </span>
                        </span>
                      </div>

                      <button
                        onClick={() => handleHomeReserveClick(vehicle.id)}
                        className="w-full py-2 text-sm font-semibold text-gold-500 hover:text-obsidian-900 hover:bg-gold-500 transition-colors border border-gold-500 rounded-lg flex items-center justify-center bg-obsidian-900/40 backdrop-blur-sm cursor-pointer outline-none"
                      >
                        {t("transportation.reserveNow", "Reserve Now")}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Reservation Form */}
          <motion.div
            id="home-reservation-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto glass-dark rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden bg-obsidian-900 border border-[rgba(245,166,35,0.2)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>

            <div className="relative z-10">
              <div className="text-center mb-10">
                <h3 className="text-display-md text-ivory-50 mb-2">
                  {t("home.bookTransfer", "Book Your Transfer")}
                </h3>
                <p className="text-body-md text-ivory-300">
                  {t(
                    "home.bookTransferDesc",
                    "Fill out the details below and our concierge will confirm your reservation.",
                  )}
                </p>
              </div>

              {resSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-sage-500/20 text-sage-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-display text-ivory-50 mb-2">
                    {t("home.resSuccess", "Reservation Received")}
                  </h4>
                  <p className="text-ivory-300">
                    {t(
                      "home.resSuccessDesc",
                      "We will contact you shortly to confirm the details.",
                    )}
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleResSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Select Vehicle */}
                  <div className="md:col-span-2">
                    <label className="block text-caption text-ivory-300 uppercase tracking-widest mb-2">
                      {t("home.selectVehicle", "Select Vehicle *")}
                    </label>
                    <select
                      required
                      value={resForm.vehicle}
                      onChange={(e) =>
                        setResForm({ ...resForm, vehicle: e.target.value })
                      }
                      className="w-full bg-obsidian-900/50 border border-ivory-50/10 rounded-lg p-3 text-ivory-50 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                    >
                      <option value="">
                        {t("home.chooseVehicle", "Choose a vehicle")}
                      </option>
                      {transportation.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} ({v.seats}{" "}
                          {t("transportation.seatsCount", "Seats")}) - {formatPrice(v.pricePerDay)}/{t("transportation.day", "day")}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time */}
                  <div>
                    <label className="block text-caption text-ivory-300 uppercase tracking-widest mb-2">
                      {t("home.tripDate", "Trip Date *")}
                    </label>
                    <input
                      type="date"
                      required
                      value={resForm.date}
                      min={todayStr}
                      onChange={(e) =>
                        setResForm({ ...resForm, date: e.target.value })
                      }
                      className="w-full bg-obsidian-900/50 border border-ivory-50/10 rounded-lg p-3 text-ivory-50 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-caption text-ivory-300 uppercase tracking-widest mb-2">
                      {t("home.pickupTime", "Pick Up Time *")}
                    </label>
                    <input
                      type="time"
                      required
                      value={resForm.time}
                      onChange={(e) =>
                        setResForm({ ...resForm, time: e.target.value })
                      }
                      className="w-full bg-obsidian-900/50 border border-ivory-50/10 rounded-lg p-3 text-ivory-50 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all [color-scheme:dark]"
                    />
                  </div>

                  {/* Passengers */}
                  <div>
                    <label className="block text-caption text-ivory-300 uppercase tracking-widest mb-2">
                      {t("home.adultsCount", "Adults *")}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      required
                      value={resForm.adults}
                      onChange={(e) =>
                        setResForm({ ...resForm, adults: e.target.value })
                      }
                      className="w-full bg-obsidian-900/50 border border-ivory-50/10 rounded-lg p-3 text-ivory-50 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-caption text-ivory-300 uppercase tracking-widest mb-2">
                      {t("home.childrenCount", "Children (0-20)")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={resForm.children}
                      onChange={(e) =>
                        setResForm({ ...resForm, children: e.target.value })
                      }
                      className="w-full bg-obsidian-900/50 border border-ivory-50/10 rounded-lg p-3 text-ivory-50 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                    />
                  </div>

                  {/* Locations */}
                  <div>
                    <label className="block text-caption text-ivory-300 uppercase tracking-widest mb-2">
                      {t("home.pickupLocation", "Pick Up Location *")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t(
                        "home.pickupPlaceholder",
                        "Hotel, Airport, etc.",
                      )}
                      value={resForm.pickup}
                      onChange={(e) =>
                        setResForm({ ...resForm, pickup: e.target.value })
                      }
                      className="w-full bg-obsidian-900/50 border border-ivory-50/10 rounded-lg p-3 text-ivory-50 placeholder-ivory-300/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-caption text-ivory-300 uppercase tracking-widest mb-2">
                      {t("home.dropoffLocation", "Drop Off Location *")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t(
                        "home.dropoffPlaceholder",
                        "Hotel, Airport, etc.",
                      )}
                      value={resForm.dropoff}
                      onChange={(e) =>
                        setResForm({ ...resForm, dropoff: e.target.value })
                      }
                      className="w-full bg-obsidian-900/50 border border-ivory-50/10 rounded-lg p-3 text-ivory-50 placeholder-ivory-300/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-caption text-ivory-300 uppercase tracking-widest mb-2">
                        {t("contact.fullName", "Full Name *")}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={resForm.name}
                        onChange={(e) =>
                          setResForm({ ...resForm, name: e.target.value })
                        }
                        className="w-full bg-obsidian-900/50 border border-ivory-50/10 rounded-lg p-3 text-ivory-50 placeholder-ivory-300/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-caption text-ivory-300 uppercase tracking-widest mb-2">
                        {t("contact.phoneNumber", "Phone Number *")}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+1 234 567 890"
                        value={resForm.phone}
                        onChange={(e) =>
                          setResForm({ ...resForm, phone: e.target.value })
                        }
                        className="w-full bg-obsidian-900/50 border border-ivory-50/10 rounded-lg p-3 text-ivory-50 placeholder-ivory-300/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-caption text-ivory-300 uppercase tracking-widest mb-2">
                        {t("contact.email", "Email *")}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={resForm.email}
                        onChange={(e) =>
                          setResForm({ ...resForm, email: e.target.value })
                        }
                        className="w-full bg-obsidian-900/50 border border-ivory-50/10 rounded-lg p-3 text-ivory-50 placeholder-ivory-300/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-center mt-6 pt-6 border-t border-ivory-50/10">
                    <Button
                      variant="gold-glow"
                      type="submit"
                      className="w-full md:w-auto px-12 py-4 text-lg rounded-full"
                    >
                      {t("home.reserveNow", "Reserve Now")}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-10 bg-[#1E3A8A] overflow-hidden">
        <style>
          {`
            @keyframes scrollStrip {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .gallery-strip:hover {
              animation-play-state: paused;
            }
          `}
        </style>
        <div className="container mx-auto px-6 mb-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-caption block mb-4"
          >
            {t("home.galleryLabel", "CAPTURED MOMENTS")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-display-lg text-ivory-50"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("home.galleryHeading", "A Glimpse Into Your Journey")}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-gold-500 mx-auto mt-6"
          ></motion.div>
        </div>

        <div className="w-full mt-10 relative">
          <div
            className="flex gallery-strip w-max"
            style={{
              animation: "scrollStrip 80s linear infinite",
              gap: "16px",
            }}
          >
            {[...galleryImages, ...galleryImages].map((img, idx) => {
              const originalIndex = idx % galleryImages.length;
              return (
                <div
                  key={idx}
                  className="flex-shrink-0 cursor-pointer overflow-hidden rounded-[12px] group relative transition-all duration-[350ms] ease-out hover:scale-[1.08] hover:-translate-y-[12px] hover:shadow-[0_12px_40px_rgba(245,166,35,0.35)] hover:z-10"
                  onClick={() => openLightbox(originalIndex)}
                >
                  <img
                    src={img.src}
                    alt={img.dest}
                    loading="lazy"
                    className="h-[220px] md:h-[380px] w-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trusted Partners / Logos Section */}
      <section className="py-[50px] px-[20px] bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 gap-6 md:flex md:items-center md:justify-center bg-white rounded-[12px] shadow-[0_2px_16px_rgba(0,0,0,0.08)] p-6 md:p-[30px_40px]">
            {[
              { src: "/imgs/logos/logo1.jpeg", alt: "Logo 1" },
              { src: "/imgs/logos/logo2.png", alt: "Logo 2" },
              { src: "/imgs/logos/logo3.png", alt: "Logo 3" },
              { src: "/imgs/logos/logo4.png", alt: "Logo 4" },
              { src: "/imgs/logos/logo5.png", alt: "Logo 5" },
            ].map((logo, idx) => (
              <div
                key={idx}
                className={`flex-1 flex justify-center items-center min-h-[110px] px-6 ${idx < 4 ? "border-r-0 md:border-r border-[#e0e0e0]" : "border-0"
                  }`}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-[90px] w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-12 lg:py-16 bg-obsidian-900 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=compress&cs=tinysrgb&w=1600&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/60 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-ivory-50 mb-6 drop-shadow-lg">
              {t("home.ctaTitle", "Your Next Adventure Awaits")}
            </h2>
            <p className="text-body-lg text-ivory-300 mb-10 max-w-xl mx-auto drop-shadow-md">
              {t(
                "home.ctaDesc",
                "Let us craft a journey tailored entirely to you",
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contact">
                <Button
                  variant="gold-glow"
                  className="px-8 py-4 text-lg w-full sm:w-auto"
                >
                  {t("home.ctaStart", "Start Planning")}
                </Button>
              </Link>
              <Button
                variant="glass"
                className="px-8 py-4 text-lg w-full sm:w-auto"
                onClick={() => setIsAllToursPopupOpen(true)}
              >
                {t("home.ctaBrowse", "Browse Tours")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-obsidian-900/95 flex items-center justify-center backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-ivory-50 hover:text-gold-500 transition-colors z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
            >
              <FaTimes size={32} />
            </button>

            <button
              className="absolute left-4 md:left-10 text-ivory-50 hover:text-gold-500 transition-colors z-[101] p-4"
              onClick={prevImage}
            >
              <FaChevronLeft size={40} />
            </button>

            <motion.img
              key={activeGalleryIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={galleryImages[activeGalleryIndex].src}
              alt={galleryImages[activeGalleryIndex].dest}
              className="max-w-[85vw] max-h-[85vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-md"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 md:right-10 text-ivory-50 hover:text-gold-500 transition-colors z-[101] p-4"
              onClick={nextImage}
            >
              <FaChevronRight size={40} />
            </button>

            <div className="absolute bottom-10 left-0 right-0 text-center text-ivory-50">
              <p className="font-display text-2xl mb-1">
                {t(
                  `data.${galleryImages[activeGalleryIndex].dest}`,
                  galleryImages[activeGalleryIndex].dest,
                )}
              </p>
              <p className="text-gold-500 tracking-widest text-xs uppercase">
                {t(
                  `data.${galleryImages[activeGalleryIndex].tag}`,
                  galleryImages[activeGalleryIndex].tag,
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Tours Popup Modal */}
      <AnimatePresence>
        {isAllToursPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
            onClick={() => setIsAllToursPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[16px] max-w-[1000px] w-[95%] md:w-[90%] max-h-[85vh] overflow-y-auto p-5 md:p-10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-2xl font-bold cursor-pointer text-gray-500 hover:text-black select-none z-[10000]"
                onClick={() => setIsAllToursPopupOpen(false)}
              >
                &times;
              </button>

              {/* Popup Title */}
              <h2 className="text-center font-display text-3xl font-semibold text-obsidian-900 mb-6">
                {t("home.allToursTitle", "All Tours")}
              </h2>

              {/* Tours Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {tours.map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-white rounded-[10px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col h-full text-left"
                  >
                    {/* Tour image on top */}
                    <div className="h-[180px] w-full overflow-hidden">
                      <img
                        src={tour.images[0]}
                        alt={t(`data.${tour.title}`, tour.title)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Tour name below image */}
                    <h3 className="font-semibold text-base text-obsidian-900 p-3 pb-1 line-clamp-2">
                      {t(`data.${tour.title}`, tour.title)}
                    </h3>

                    {/* Short description if available */}
                    {tour.description && (
                      <p className="text-[13px] text-gray-600 px-3 pb-3 flex-grow line-clamp-3">
                        {t(`data.${tour.description}`, tour.description)}
                      </p>
                    )}

                    {/* View Details button at the bottom */}
                    <div className="p-3 pt-0 mt-auto">
                      <Link to={`/tours/${tour.slug}`}>
                        <Button
                          variant="outline-gold"
                          className="w-full py-2 text-sm text-center"
                        >
                          {t("tourCard.viewDetails", "View Details")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;