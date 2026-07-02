import { useState, useRef, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaStar, FaTimes, FaChevronLeft, FaChevronRight, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import Button from "../components/ui/Button";
import TourCard from "../components/tour/TourCard";
import { tours } from "../data/tours";
import { turkeyTours } from "../data/turkeyTours";
import { multiCountryTours } from "../data/multiCountryTours";
import HieroglyphicName from "../components/home/HieroglyphicName";
import { useTurkeyPrograms } from "../hooks/useTurkeyPrograms";
import { useJordanPrograms } from "../hooks/useJordanPrograms";
import { useDubaiPrograms } from "../hooks/useDubaiPrograms";
import { useMoroccoPrograms } from "../hooks/useMoroccoPrograms";
import { transportation } from "../data/transportation";
import useScrollAnimations from "../hooks/useScrollAnimations";
import { useCurrency } from "../context/CurrencyContext";
import rawProgramData from "../data/programs.json";
const rawPrograms = rawProgramData.programs;

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
    id: "dubai",
    name: "Dubai",
    desc: "Luxury & Skylines",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
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
    desc: "Myths & Islands",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
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
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();
  const [activeDestination, setActiveDestination] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isAllToursPopupOpen, setIsAllToursPopupOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const nextGallery = () => setGalleryIndex((prev) => (prev + 1) % galleryCarousel.length);
  const prevGallery = () => setGalleryIndex((prev) => (prev - 1 + galleryCarousel.length) % galleryCarousel.length);

  useEffect(() => {
    const timer = setInterval(nextGallery, 4000);
    return () => clearInterval(timer);
  }, []);

  const turkeyPrograms = useTurkeyPrograms();
  const formattedTurkeyTours = turkeyPrograms.map((tp) => ({
    id: tp.id,
    slug: tp.slug,
    destination: "turkey",
    title: tp.title,
    description: tp.overview,
    duration: tp.duration,
    price: tp.raw?.price || 899,
    rating: 4.8,
    reviewCount: 120,
    images: tp.images,
    type: tp.raw?.type || "Cultural Tour",
    market: "Global",
    highlights: tp.highlights,
    code: tp.code
  }));

  const jordanPrograms = useJordanPrograms();
  const formattedJordanTours = jordanPrograms.map((jp) => ({
    id: jp.id,
    slug: jp.slug,
    destination: "jordan",
    title: jp.title,
    description: jp.overview,
    duration: jp.duration,
    price: jp.raw?.price || 899,
    rating: 4.8,
    reviewCount: 120,
    images: jp.images,
    type: jp.raw?.type || "Cultural Tour",
    market: "Global",
    highlights: jp.highlights,
    code: jp.code
  }));

  const dubaiPrograms = useDubaiPrograms();
  const formattedDubaiTours = dubaiPrograms.map((dp) => ({
    id: dp.id,
    slug: dp.slug,
    destination: "dubai",
    title: dp.title,
    description: dp.overview,
    duration: dp.duration,
    price: dp.raw?.price || 899,
    rating: 4.8,
    reviewCount: 120,
    images: dp.images,
    type: dp.raw?.type || "Dubai Tour",
    market: "Global",
    highlights: dp.highlights,
    code: dp.code
  }));

  const moroccoPrograms = useMoroccoPrograms();
  const formattedMoroccoTours = moroccoPrograms.map((mp) => ({
    id: mp.id,
    slug: mp.slug,
    destination: "morocco",
    title: mp.title,
    description: mp.overview,
    duration: mp.duration,
    price: mp.raw?.price || 899,
    rating: 4.8,
    reviewCount: 120,
    images: mp.images,
    type: mp.raw?.type || "Cultural Tour",
    market: "Global",
    highlights: mp.highlights,
    code: mp.code
  }));

  const allToursForMarquee = useMemo(() => {
    const combined = [];
    tours.forEach(tour => combined.push({ ...tour, description: tour.overview, link: `/tours/${tour.slug}` }));
    formattedTurkeyTours.forEach(t => combined.push({ ...t, link: `/programs/turkey/${t.slug}` }));
    formattedJordanTours.forEach(t => combined.push({ ...t, link: `/programs/jordan/${t.slug}` }));
    formattedDubaiTours.forEach(t => combined.push({ ...t, link: `/programs/dubai/${t.slug}` }));
    formattedMoroccoTours.forEach(t => combined.push({ ...t, link: `/programs/morocco/${t.slug}` }));
    multiCountryTours.forEach(tour => combined.push({
      id: tour.id, slug: tour.slug, destination: tour.destination,
      title: tour.title, description: tour.overview || tour.description,
      duration: tour.duration, price: tour.price, rating: tour.rating,
      reviewCount: tour.reviewCount, images: tour.images, type: tour.type,
      link: `/programs/multi-country/${tour.slug}`,
    }));
    turkeyTours.forEach(tour => combined.push({ ...tour, description: tour.overview, link: `/tours/${tour.slug}` }));
    return combined;
  }, [tours, formattedTurkeyTours, formattedJordanTours, formattedDubaiTours, formattedMoroccoTours]);

  // Hero Video State
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Search Form State
  const [searchDest, setSearchDest] = useState("all");
  const [searchTour, setSearchTour] = useState("");
  const [searchArrival, setSearchArrival] = useState("");
  const [searchDeparture, setSearchDeparture] = useState("");
  const [searchPeople, setSearchPeople] = useState(1);

  const destinations = [
    { id: "egypt", label: t("dest.egypt.title", "Egypt"), img: "/imgs/gallery/pharaohs & pyramid.jpg" },
    { id: "turkey", label: t("dest.turkey.title", "Turkey"), img: "/imgs/gallery/grand tour of turkey.jpg" },
    { id: "dubai", label: t("dest.dubai.title", "Dubai"), img: "/imgs/gallery/16.jpeg" },
    { id: "jordan", label: t("dest.jordan.title", "Jordan"), img: "/imgs/gallery/ultimate jordan grand tour.webp" },
    { id: "tunisia", label: t("dest.tunisia.title", "Tunisia"), img: "/imgs/gallery/3.jpeg" },
    { id: "morocco", label: t("dest.morocco.title", "Morocco"), img: "/imgs/gallery/14.jpeg" },
    { id: "greece", label: t("dest.greece.title", "Greece"), img: "/imgs/gallery/ephesus & the aegean coast.jpg" },
    { id: "holyland", label: t("dest.holyland.title", "Holy Land"), img: "/imgs/gallery/20.jpeg" },
  ];

  const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const TURKEY_IDS = ["REG-01", "IST-01", "REG-03", "REG-04", "REG-05", "REG-05-B", "REG-06", "REG-07", "REG-08", "REG-09", "REG-10", "REG-11", "REG-12", "REG-13", "REG-14"];
  const JORDAN_IDS = ["REG-15", "REG-16", "REG-17", "REG-18", "REG-19", "REG-20", "REG-21"];
  const DUBAI_IDS = ["REG-22", "REG-23", "REG-24", "REG-25", "REG-26", "REG-27", "REG-28", "HM001", "HM002"];
  const EGYPT_IDS = ["REG-29"];
  const MOROCCO_IDS = ["MRC-01"];

  const programCountry = (id) => {
    if (TURKEY_IDS.includes(id)) return "turkey";
    if (JORDAN_IDS.includes(id)) return "jordan";
    if (DUBAI_IDS.includes(id)) return "dubai";
    if (EGYPT_IDS.includes(id)) return "egypt";
    if (MOROCCO_IDS.includes(id)) return "morocco";
    return "turkey";
  };

  const allExtraTours = useMemo(() => ({
    turkey: turkeyTours,
  }), [turkeyTours]);

  const getToursForDest = (destId) => {
    const lang = i18n.language;
    const langMap = { pt: 'pt-BR', en: 'en', es: 'es', it: 'it', ar: 'ar' };
    const tourLang = langMap[lang] || 'en';
    const result = [];

    const addTour = (tour, baseUrl) => {
      const slug = tour.slug || slugify(tour.id + "-" + (tour.title || ""));
      result.push({ label: t(`tour.${tour.id}`, tour.title), url: `${baseUrl}/${slug}`, id: `tour-${slug}` });
    };

    const addProgram = (p, country) => {
      const slug = slugify(p.id + "-" + p.name.en);
      result.push({ label: p.name[lang] || p.name.en, url: `/programs/${country}/${slug}`, id: `prog-${p.id}` });
    };

    if (destId === "all") {
      tours.forEach((tour) => addTour(tour, "/tours"));
      rawPrograms.forEach((p) => addProgram(p, programCountry(p.id)));
      turkeyTours.forEach((tour) => addTour(tour, "/tours"));
      multiCountryTours.forEach((mc) => {
        const slug = mc.slug || slugify(mc.id + "-" + (mc.title || ""));
        result.push({ label: mc.title, url: `/programs/multi-country/${slug}`, id: `multi-${mc.id}` });
      });
      return result;
    }

    const filtered = tours.filter((t) => t.destination === destId && t.language === tourLang);
    const fallback = tours.filter((t) => t.destination === destId && t.language !== tourLang);
    const seen = new Set();
    [...filtered, ...fallback].forEach((tour) => {
      if (!seen.has(tour.id)) { seen.add(tour.id); addTour(tour, "/tours"); }
    });

    const extra = allExtraTours[destId];
    if (extra) {
      extra.forEach((tour) => addTour(tour, "/tours"));
    }

    if (destId === "turkey") {
      rawPrograms.filter((p) => TURKEY_IDS.includes(p.id)).forEach((p) => addProgram(p, "turkey"));
    }
    if (destId === "jordan") {
      rawPrograms.filter((p) => JORDAN_IDS.includes(p.id)).forEach((p) => addProgram(p, "jordan"));
    }
    if (destId === "dubai") {
      rawPrograms.filter((p) => DUBAI_IDS.includes(p.id)).forEach((p) => addProgram(p, "dubai"));
    }
    if (destId === "morocco") {
      rawPrograms.filter((p) => MOROCCO_IDS.includes(p.id)).forEach((p) => addProgram(p, "morocco"));
    }
    if (destId === "egypt") {
      rawPrograms.filter((p) => EGYPT_IDS.includes(p.id)).forEach((p) => addProgram(p, "egypt"));
    }
    return result;
  };

  const destTours = searchDest ? getToursForDest(searchDest) : [];

  const handleSearch = () => {
    if (searchTour) {
      const found = destTours.find((t) => t.id === searchTour);
      if (found) { window.location.href = found.url; return; }
    }
    if (searchDest && searchDest !== "all") {
      window.location.href = `/destinations/${searchDest}`;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

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

  useScrollAnimations();
  const isRtl = i18n.dir() === 'rtl';

  const filteredVehicles =
    vehicleFilter === "all"
      ? transportation
      : transportation.filter((v) => v.category === vehicleFilter);

  const galleryImages = [
    { src: "https://res.cloudinary.com/degbrq3ck/image/upload/v1783023886/3776ecde-249e-4183-9840-e9fd900ad96b_xvmumu.jpg", dest: "Gallery", tag: "Photo" },
    { src: "https://res.cloudinary.com/degbrq3ck/image/upload/v1783023877/2ec72126-709b-4c8d-8f7b-a592d212cc3b_czpoig.jpg", dest: "Gallery", tag: "Photo" },
    { src: "https://res.cloudinary.com/degbrq3ck/image/upload/v1783023865/80f6f47a-4938-4684-aaf1-b1e61d44dab6_n8vdtl.jpg", dest: "Gallery", tag: "Photo" },
    { src: "https://res.cloudinary.com/degbrq3ck/image/upload/v1783023927/dad14822-455c-419c-8627-32b3daebef90_akfw3l.jpg", dest: "Gallery", tag: "Photo" },
    { src: "https://res.cloudinary.com/degbrq3ck/image/upload/v1783024003/d34eeca3-6bc8-4a19-aa18-bf13404bb11b_n0f8zn.jpg", dest: "Gallery", tag: "Photo" },
    { src: "https://res.cloudinary.com/degbrq3ck/image/upload/v1783024053/66dc2b5e-f90d-424f-b9a7-4164b52f4e5a_eoqd3p.jpg", dest: "Gallery", tag: "Photo" },
    { src: "https://res.cloudinary.com/degbrq3ck/image/upload/v1783024062/071f261a-2ab6-48b5-a370-c47ad7889be3_immde1.jpg", dest: "Gallery", tag: "Photo" },
    { src: "https://res.cloudinary.com/degbrq3ck/image/upload/v1783024072/400a841d-18b7-4915-8483-f9a3346651cf_ocdouu.jpg", dest: "Gallery", tag: "Photo" },
    { src: "https://res.cloudinary.com/degbrq3ck/image/upload/v1783024090/9788c6d2-7046-4ce0-aa64-a0adcbe1a54d_omcrnc.jpg", dest: "Gallery", tag: "Photo" },
  ];
  const galleryCarousel = galleryImages.slice(0, 8);

  const videos = [
    { publicId: 'Despu%C3%A9s_de_una_intensa_jornada_en_Bogot%C3%A1__en_Dunas_Travel_compartimos_una_cena_exclusiva_con_nuestros_partners_estrat%C3%A9gicos._480P_SD_sv2pei' },
    { publicId: 'Somos_Dunas_Travel_Group__480P_SD_gxfsxm' },
    { publicId: 'VID-20260611-WA0001_az82kl' },
    { publicId: 'VID-20260623-WA0112_xmyc5z' },
    { publicId: 'VID-20260611-WA0000_mwgayg' },
    { publicId: '%EF%B8%8F_Viagem_inteligente_come%C3%A7a_no_planejamento_certo_480P_SD_s3dyjb' },
    { publicId: 'VID-20260623-WA0109_lxcv2r' },
    { publicId: 'Temos_grande_honra_em_receber_este_reconhecimento_da_Lusanova_como__Melhores_Parceiros_2025_._480P_SD_rgbhr5' },
  ];

  const cloudName = 'degbrq3ck';

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



  const activeTours = activeDestination
    ? activeDestination === "turkey"
      ? formattedTurkeyTours
      : activeDestination === "jordan"
        ? formattedJordanTours
        : activeDestination === "dubai"
          ? formattedDubaiTours
          : activeDestination === "morocco"
            ? formattedMoroccoTours
            : tours.filter((t) => t.destination === activeDestination)
    : [];

  const featuredToursList = [
    tours.find((t) => t.destination === "egypt"),
    formattedTurkeyTours[0] || tours.find((t) => t.destination === "turkey"),
    formattedJordanTours[0] || tours.find(
      (t) =>
        t.destination === "jordan" &&
        t.id !== tours.find((x) => x.destination === "jordan")?.id,
    ),
    formattedMoroccoTours[0] || tours.find(
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
      <section className="relative h-screen min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            fetchpriority="high"
            className="w-full h-full object-cover md:object-[center_30%]"
          >
            <source src="/imgs/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-obsidian-900/50"></div>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-20 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-obsidian-900/70 backdrop-blur-md border border-gold-500/30 flex items-center justify-center text-ivory-50 hover:text-gold-500 hover:bg-obsidian-900 transition-all shadow-lg"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
        </button>
      </section>

      {/* Search & Gallery Section */}
      <section className="relative w-full h-screen max-h-[900px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={galleryIndex}
              src={galleryCarousel[galleryIndex].src}
              alt=""
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-center"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/30 via-obsidian-900/20 to-obsidian-900/50"></div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevGallery}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white/30 flex items-center justify-center text-obsidian-900 hover:bg-[#F5A623] hover:text-white transition-all shadow-lg"
        >
          <FaChevronLeft size={18} />
        </button>
        <button
          onClick={nextGallery}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white/30 flex items-center justify-center text-obsidian-900 hover:bg-[#F5A623] hover:text-white transition-all shadow-lg"
        >
          <FaChevronRight size={18} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {galleryCarousel.map((_, i) => (
            <button
              key={i}
              onClick={() => setGalleryIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === galleryIndex ? 'bg-[#F5A623] w-6' : 'bg-white/60 hover:bg-white/90'}`}
            />
          ))}
        </div>

        {/* Search Content (overlay on image) */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          {/* Search Form */}
          <div className="w-full max-w-5xl">
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-4 sm:p-5 md:p-6 lg:p-8 border border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3">
                {/* Destination */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] sm:text-caption text-gold-400 uppercase tracking-wider mb-1 font-semibold">
                    {t('home.searchDest', 'Destination')}
                  </label>
                  <select
                    value={searchDest}
                    onChange={(e) => { setSearchDest(e.target.value); setSearchTour(""); }}
                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-white text-[13px] sm:text-body-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] appearance-none cursor-pointer [&>option]:text-obsidian-900 [&>option]:dark:text-ivory-100 [&>option]:dark:bg-obsidian-800"
                  >
                    <option value="all" className="text-obsidian-900 dark:text-ivory-100 dark:bg-obsidian-800">{t('home.searchAllDest', 'All Destinations')}</option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id} className="text-obsidian-900 dark:text-ivory-100 dark:bg-obsidian-800">{d.label}</option>
                    ))}
                  </select>
                </div>

                {/* Tour */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] sm:text-caption text-gold-400 uppercase tracking-wider mb-1 font-semibold">
                    {t('home.searchTour', 'Tour / Program')}
                  </label>
                  <select
                    value={searchTour}
                    onChange={(e) => setSearchTour(e.target.value)}
                    disabled={!searchDest}
                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-white text-[13px] sm:text-body-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&>option]:text-obsidian-900 [&>option]:dark:text-ivory-100 [&>option]:dark:bg-obsidian-800"
                  >
                    <option value="" className="text-obsidian-900 dark:text-ivory-100 dark:bg-obsidian-800">{t('home.searchAllTours', 'All Tours')}</option>
                    {destTours.map((t) => (
                      <option key={t.id} value={t.id} className="text-obsidian-900 dark:text-ivory-100 dark:bg-obsidian-800">{t.label}</option>
                    ))}
                  </select>
                </div>

                {/* Arrival */}
                <div>
                  <label className="block text-[10px] sm:text-caption text-gold-400 uppercase tracking-wider mb-1 font-semibold">
                    {t('home.searchArrival', 'Arrival')}
                  </label>
                  <input
                    type="date"
                    value={searchArrival}
                    min={todayStr}
                    onChange={(e) => setSearchArrival(e.target.value)}
                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-white text-[13px] sm:text-body-sm [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  />
                </div>

                {/* Departure */}
                <div>
                  <label className="block text-[10px] sm:text-caption text-gold-400 uppercase tracking-wider mb-1 font-semibold">
                    {t('home.searchDeparture', 'Departure')}
                  </label>
                  <input
                    type="date"
                    value={searchDeparture}
                    min={todayStr}
                    onChange={(e) => setSearchDeparture(e.target.value)}
                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-white text-[13px] sm:text-body-sm [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  />
                </div>

                {/* People + Search */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] sm:text-caption text-gold-400 uppercase tracking-wider mb-1 font-semibold">
                    {t('home.searchPeople', 'People')}
                  </label>
                  <div className="flex gap-1.5 sm:gap-2">
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={searchPeople}
                      onChange={(e) => setSearchPeople(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 sm:w-20 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-white text-[13px] sm:text-body-sm text-center focus:outline-none focus:ring-2 focus:ring-[#FF6B35] [color-scheme:dark]"
                    />
                    <button
                      onClick={handleSearch}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 font-semibold rounded-lg transition-all text-[13px] sm:text-body-sm whitespace-nowrap text-white"
                      style={{ background: 'linear-gradient(135deg, #FF6B35, #1E3A8A)' }}
                    >
                      {t('home.searchBtn', 'Search')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Destinations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-5 sm:mt-6 text-center w-full max-w-5xl"
          >
            <p className="text-gold-400 text-[10px] sm:text-caption uppercase tracking-widest mb-2 sm:mb-3 font-semibold drop-shadow-lg">
              {t('home.popularDests', 'Popular Destinations')}
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3">
              {destinations.slice(0, 6).map((d) => (
                <Link
                  key={d.id}
                  to={`/destinations/${d.id}`}
                  className="group flex items-center gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 hover:border-[#FF6B35]/60 rounded-full px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 transition-all"
                >
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden shrink-0 ring-1 ring-white/30">
                    <img src={d.img} alt="" className="w-full h-full object-cover" />
                  </span>
                  <span className="text-white/90 text-[11px] sm:text-body-sm font-medium group-hover:text-[#FF6B35] transition-colors">
                    {d.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Customize & Contact Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-3"
            >
              <Link
                to="/tailor-a-tour"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F5A623] to-[#C07D0A] text-[#1A1A2E] font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {t('home.customize', 'Customize Your Trip')}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg hover:bg-white/25 hover:scale-105 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('nav.contact', 'Contact Us')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About the Company */}
      <section className="py-12 bg-ivory-50 gsap-reveal">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
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
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
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
              const tourCount = dest.id === "turkey"
                ? formattedTurkeyTours.length
                : dest.id === "jordan"
                  ? formattedJordanTours.length
                  : dest.id === "dubai"
                    ? formattedDubaiTours.length
                    : dest.id === "morocco"
                      ? formattedMoroccoTours.length
                      : tours.filter((t) => t.destination === dest.id).length;
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
                    <p className="text-body-lg text-gold-500 font-medium mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(`dest.${dest.id === 'holy-land' ? 'holyland' : dest.id}.subtitle`, t(`data.${dest.desc}`, dest.desc)) }} />
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
                    {activeTours.slice(0, 6).map((tour) => (
                      <TourCard
                        key={tour.id}
                        tour={tour}
                        linkBase={activeDestination === "turkey" ? "/programs/turkey" : activeDestination === "jordan" ? "/programs/jordan" : activeDestination === "dubai" ? "/programs/dubai" : "/tours"}
                      />
                    ))}
                  </div>
                  {activeTours.length > 6 && (
                    <div className="flex justify-center mt-10">
                      <Link to={`/destinations/${activeDestination}`}>
                        <Button variant="outline-gold" className="px-8 py-3">
                          {t("home.viewAll", "View All")} {activeTours.length} {t("nav.tours", "Tours")}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* All Tours Marquee */}
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
        </div>

          <div className="overflow-hidden w-full">
            <div
              className="flex w-max"
              style={{
                animation: `${isRtl ? 'tourMarqueeRTL' : 'tourMarquee'} 200s linear infinite`,
                gap: "24px",
                paddingLeft: "24px",
              }}
              onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
            >
            {[...allToursForMarquee, ...allToursForMarquee].map((tData, idx) => (
              <Link
                key={`${tData.id}-${idx}`}
                to={tData.link}
                className="min-w-[320px] md:min-w-[400px] shrink-0 group relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 h-[450px] block"
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

                    <div className="block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Button variant="outline-gold" className="w-full py-2">
                        {t("home.viewTour", "View Tour")}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            variant="gold-glow"
            className="px-8 py-3"
            onClick={() => setIsAllToursPopupOpen(true)}
          >
            {t("home.exploreAllTours", "Explore All Tours")}
          </Button>
        </div>
      </section>



      <HieroglyphicName />

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
              {t('home.transportSub', 'GET AROUND IN STYLE')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-display-lg text-obsidian-900 mb-6"
            >
              {t('home.transportTitle', 'Premium Transportation Services')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-body-lg text-obsidian-700 max-w-2xl mx-auto"
            >
              {t('home.transportDesc', 'Luxury vehicles and professional drivers — available across Egypt, Jordan, Turkey & Tunisia')}
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
                animation: `${isRtl ? 'scrollStripRTL' : 'scrollStrip'} 80s linear infinite`,
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
            className="max-w-5xl mx-auto rounded-3xl p-8 md:p-12 relative overflow-hidden border border-[rgba(245,166,35,0.2)]"
            style={{ background: 'linear-gradient(180deg, rgb(10,25,105) 0%, rgb(6,29,93) 50%, rgb(10,21,53) 100%)', boxShadow: '0 0 40px rgba(10,25,105, 0.8)' }}
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
                      type="submit"
                      className="w-full md:w-auto px-12 py-4 text-lg rounded-full text-white hover:scale-105 transition-transform"
                      style={{ background: 'linear-gradient(180deg, rgb(10,25,105) 0%, rgb(6,29,93) 50%, rgb(10,21,53) 100%)', boxShadow: '0 0 20px rgba(10,25,105, 0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
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
            @keyframes scrollStripRTL {
              0%   { transform: translateX(0); }
              100% { transform: translateX(50%); }
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
              animation: `${isRtl ? 'scrollStripRTL' : 'scrollStrip'} 80s linear infinite`,
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
      <section className="py-[50px] px-[20px] bg-[#f8f8f8] dark:bg-[#1a1a30]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { src: "/imgs/logos/logo1.jpeg", alt: "Logo 1" },
              { src: "/imgs/logos/logo2.png", alt: "Logo 2" },
              { src: "/imgs/logos/logo3.png", alt: "Logo 3" },
              { src: "/imgs/logos/logo4.png", alt: "Logo 4" },
              { src: "/imgs/logos/logo5.png", alt: "Logo 5" },
              { src: "/imgs/logos/logo6.jpeg", alt: "Logo 6" },
            ].map((logo, idx) => (
              <div
                key={idx}
                className="logo-oval-bg bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all flex justify-center items-center h-[110px] w-[180px] p-5 hover:-translate-y-1"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Strip Section */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, rgb(10,25,105) 0%, rgb(6,29,93) 50%, rgb(10,21,53) 100%)' }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-gold-500 uppercase tracking-widest text-caption block mb-4">
              {t('home.videoSectionSub', 'Moments to Remember')}
            </span>
            <h2 className="text-display-lg text-ivory-50 font-display">
              {t('home.videoSectionTitle', 'Join Our Beautiful Journey')}
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </motion.div>

          <div className="overflow-hidden">
            <div className="flex gap-6 pb-4"
              style={{
                width: 'max-content',
                animation: `${isRtl ? 'marqueeVideoRTL' : 'marqueeVideo'} 40s linear infinite`,
              }}
              onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
            >
              {[...videos, ...videos, ...videos].map((video, idx) => (
                <motion.div
                  key={`${video.publicId}-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % videos.length) * 0.1 }}
                  onClick={() => setActiveVideo(video.publicId)}
                  className="min-w-[300px] md:min-w-[360px] shrink-0 relative rounded-2xl overflow-hidden cursor-pointer group h-[200px] md:h-[240px]"
                >
                  <img
                    src={`https://res.cloudinary.com/${cloudName}/video/upload/w_400,h_240,c_fill/${video.publicId}.jpg`}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-obsidian-900/40 group-hover:bg-obsidian-900/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gold-500/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-obsidian-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian-900/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 text-ivory-50 hover:text-gold-500 z-50 text-2xl"
            >
              <FaTimes />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
               className="w-full max-w-4xl aspect-video max-h-[75vh] rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://player.cloudinary.com/embed/?cloud_name=${cloudName}&public_id=${activeVideo}`}
                className="w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className={`absolute ${isRtl ? 'right-4 md:right-10' : 'left-4 md:left-10'} text-ivory-50 hover:text-gold-500 transition-colors z-[101] p-4`}
              onClick={isRtl ? nextImage : prevImage}
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
              className={`absolute ${isRtl ? 'left-4 md:left-10' : 'right-4 md:right-10'} text-ivory-50 hover:text-gold-500 transition-colors z-[101] p-4`}
              onClick={isRtl ? prevImage : nextImage}
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
                {allToursForMarquee.map((tour) => (
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
                      <Link to={tour.link}>
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