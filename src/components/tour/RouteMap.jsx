import { useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { fadeInUp } from '../../animations/variants';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const COORDINATES_DATABASE = {
  // Egypt
  "cairo": [30.0444, 31.2357],
  "giza": [29.9792, 31.1342],
  "pyramids": [29.9792, 31.1342],
  "sphinx": [29.9753, 31.1376],
  "luxor": [25.6872, 32.6396],
  "aswan": [24.0889, 32.8998],
  "alexandria": [31.2001, 29.9187],
  "hurghada": [27.2579, 33.8116],
  "sharm": [27.9158, 34.3299],
  "siwa": [29.2032, 25.5189],
  "abu simbel": [22.3372, 31.6258],
  "kom ombo": [24.4711, 32.9469],
  "edfu": [24.9781, 32.8789],
  "philae": [24.0250, 32.8844],
  "karnak": [25.7188, 32.6573],
  "valley of the kings": [25.7402, 32.6014],

  // Turkey
  "istanbul": [41.0082, 28.9784],
  "cappadocia": [38.6431, 34.8281],
  "pamukkale": [37.9221, 29.1212],
  "ephesus": [37.9394, 27.3410],
  "antalya": [36.8969, 30.7133],
  "ankara": [39.9334, 32.8597],
  "konya": [37.8714, 32.4988],
  "bursa": [40.1885, 29.0610],
  "canakkale": [40.1450, 26.4064],
  "troy": [39.9575, 26.2386],
  "kusadasi": [37.8596, 27.2590],
  "pergamum": [39.1325, 27.1842],
  "izmir": [38.4192, 27.1287],

  // Jordan
  "amman": [31.9454, 35.9284],
  "petra": [30.3285, 35.4444],
  "wadi rum": [29.5781, 35.4206],
  "dead sea": [31.5590, 35.4732],
  "jerash": [32.2723, 35.8914],
  "aqaba": [29.5321, 35.0063],
  "madaba": [31.7174, 35.7937],
  "mount nebo": [31.7683, 35.7253],

  // UAE / Dubai
  "dubai": [25.2048, 55.2708],
  "abu dhabi": [24.4539, 54.3773],
  "sharjah": [25.3463, 55.4209],

  // Morocco
  "marrakech": [31.6295, -7.9811],
  "casablanca": [33.5731, -7.5898],
  "fes": [34.0181, -5.0078],
  "fez": [34.0181, -5.0078],
  "rabat": [34.0209, -6.8416],
  "chefchaouen": [35.1688, -5.2636],
  "tangier": [35.7595, -5.8340],
  "ouarzazate": [30.9189, -6.8931],
  "meknes": [33.8938, -5.5547],
  "essaouira": [31.5085, -9.7595],
  "ait benhaddou": [31.0470, -7.1306],

  // Holy Land
  "jerusalem": [31.7683, 35.2137],
  "bethlehem": [31.7058, 35.2007],
  "nazareth": [32.6996, 35.3035],
  "tel aviv": [32.0853, 34.7818],
  "galilee": [32.8155, 35.5908],
  "jericho": [31.8560, 35.4443],
  "haifa": [32.7940, 34.9896],
  "jaffa": [32.0518, 34.7522],
  "tiberias": [32.7922, 35.5312],
  "cana": [32.7471, 35.3789],

  // Greece
  "athens": [37.9838, 23.7275],
  "mykonos": [37.4467, 25.3289],
  "santorini": [36.3932, 25.4615],
  "delphi": [38.4800, 22.4939],
  "meteora": [39.7135, 21.6253],
  "olympia": [37.6437, 21.6244],
  "thessaloniki": [40.6401, 22.9444],
  "crete": [35.2401, 24.8093],

  // Tunisia
  "tunis": [36.8065, 10.1815],
  "carthage": [36.8578, 10.3276],
  "sidi bou said": [36.8702, 10.3411],
  "hammamet": [36.4000, 10.6167],
  "testour": [36.5510, 9.4447],
  "dougga": [36.4222, 9.2201],
  "el jem": [35.2964, 10.7092],
  "matmata": [33.5424, 9.9674],
  "douz": [33.4667, 9.0167],
  "chott el jerid": [33.7222, 8.4111],
  "tozeur": [33.9198, 8.1335],
  "kairouan": [35.6781, 10.0963]
};

const KEYWORDS_MAP = {
  // Egypt
  "cairo": "cairo",
  "giza": "giza",
  "guiza": "giza",
  "pirâmide": "pyramids",
  "pirámide": "pyramids",
  "pyramid": "pyramids",
  "esfinge": "sphinx",
  "sphinx": "sphinx",
  "luxor": "luxor",
  "aswan": "aswan",
  "assuã": "aswan",
  "aswán": "aswan",
  "alexandria": "alexandria",
  "alejandría": "alexandria",
  "hurghada": "hurghada",
  "sharm": "sharm",
  "siwa": "siwa",
  "abu simbel": "abu simbel",
  "kom ombo": "kom ombo",
  "edfu": "edfu",
  "philae": "philae",
  "karnak": "karnak",
  "vales dos reis": "valley of the kings",
  "valle de los reyes": "valley of the kings",
  "valley of the kings": "valley of the kings",
  
  // Turkey
  "istanbul": "istanbul",
  "istambul": "istanbul",
  "cappadocia": "cappadocia",
  "capadócia": "cappadocia",
  "pamukkale": "pamukkale",
  "ephesus": "ephesus",
  "éfeso": "ephesus",
  "antalya": "antalya",
  "antália": "antalya",
  "ankara": "ankara",
  "ancara": "ankara",
  "konya": "konya",
  "bursa": "bursa",
  "izmir": "izmir",
  "esmirna": "izmir",
  "kusadasi": "kusadasi",
  "kuşadası": "kusadasi",
  "canakkale": "canakkale",
  "çanakkale": "canakkale",
  
  // Jordan
  "amman": "amman",
  "amã": "amman",
  "petra": "petra",
  "wadi rum": "wadi rum",
  "dead sea": "dead sea",
  "mar morto": "dead sea",
  "mar muerto": "dead sea",
  "jerash": "jerash",
  "aqaba": "aqaba",
  
  // UAE
  "dubai": "dubai",
  "abu dhabi": "abu dhabi",
  
  // Morocco
  "marrakech": "marrakech",
  "marraquexe": "marrakech",
  "casablanca": "casablanca",
  "fes": "fes",
  "fez": "fes",
  "rabat": "rabat",
  
  // Holy Land
  "jerusalem": "jerusalem",
  "jerusalém": "jerusalem",
  "bethlehem": "bethlehem",
  "belém": "bethlehem",
  "nazareth": "nazareth",
  "nazaré": "nazareth",
  "tel aviv": "tel aviv",
  "galilee": "galilee",
  "galileia": "galilee",
  
  // Greece
  "athens": "athens",
  "atenas": "athens",
  "mykonos": "mykonos",
  "santorini": "santorini",
  "crete": "crete",
  "creta": "crete",
  "heraklion": "crete",

  // Tunisia
  "tunis": "tunis",
  "tunes": "tunis",
  "tunisia": "tunis",
  "carthage": "carthage",
  "cartago": "carthage",
  "sidi bou said": "sidi bou said",
  "hammamet": "hammamet",
  "testour": "testour",
  "dougga": "dougga",
  "el jem": "el jem",
  "matmata": "matmata",
  "douz": "douz",
  "chott el jerid": "chott el jerid",
  "tozeur": "tozeur",
  "kairouan": "kairouan"
};

const getCurvePoints = (from, to, numPoints = 50) => {
  const points = [];
  const lat1 = from[0];
  const lng1 = from[1];
  const lat2 = to[0];
  const lng2 = to[1];

  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;

  // Curvature amount: scale perpendicular vector by distance
  const curvature = 0.15;
  const pLat = -dLng * curvature;
  const pLng = dLat * curvature;

  const cLat = midLat + pLat;
  const cLng = midLng + pLng;

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * cLat + t * t * lat2;
    const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * cLng + t * t * lng2;
    points.push([lat, lng]);
  }
  return points;
};

const RouteMap = ({ itinerary }) => {
  const { t } = useTranslation();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const animationRef = useRef(null);

  const locations = useMemo(() => {
    if (!itinerary || !Array.isArray(itinerary)) return [];
    const extracted = [];

    itinerary.forEach((day) => {
      const texts = [
        day.title,
        day.description,
        day.morning,
        day.afternoon,
        day.evening,
        day.titleDefault,
        day.descDefault,
        day.titleKey ? t(day.titleKey) : null,
        day.descKey ? t(day.descKey) : null
      ].filter(Boolean).map((s) => s.toLowerCase());

      const combinedText = texts.join(" ");

      const dayMatches = [];
      Object.keys(KEYWORDS_MAP).forEach((keyword) => {
        const idx = combinedText.indexOf(keyword);
        if (idx !== -1) {
          dayMatches.push({
            keyword,
            dbKey: KEYWORDS_MAP[keyword],
            index: idx
          });
        }
      });

      dayMatches.sort((a, b) => a.index - b.index);

      if (dayMatches.length > 0) {
        const primaryMatch = dayMatches[0];
        const coords = COORDINATES_DATABASE[primaryMatch.dbKey];
        if (coords) {
          const displayName = primaryMatch.dbKey.charAt(0).toUpperCase() + primaryMatch.dbKey.slice(1);
          const lastLoc = extracted[extracted.length - 1];
          if (!lastLoc || lastLoc.coords[0] !== coords[0] || lastLoc.coords[1] !== coords[1]) {
            extracted.push({
              name: displayName,
              coords,
              description: `Day ${day.day}: ${day.title || day.titleDefault || 'Explore'}`
            });
          }
        }
      }
    });

    // Fallback: If no locations were matched, check if there's any destination name we can map
    if (extracted.length === 0) {
      const fullText = itinerary.map(d => JSON.stringify(d)).join(" ").toLowerCase();
      let fallbackName = "Cairo";
      let fallbackCoords = COORDINATES_DATABASE["cairo"];
      
      if (fullText.includes("turkey") || fullText.includes("turquía") || fullText.includes("turquia") || fullText.includes("istanbul")) {
        fallbackName = "Istanbul";
        fallbackCoords = COORDINATES_DATABASE["istanbul"];
      } else if (fullText.includes("jordan") || fullText.includes("jordânia") || fullText.includes("jordania") || fullText.includes("amman")) {
        fallbackName = "Amman";
        fallbackCoords = COORDINATES_DATABASE["amman"];
      } else if (fullText.includes("dubai") || fullText.includes("emirates") || fullText.includes("abu dhabi")) {
        fallbackName = "Dubai";
        fallbackCoords = COORDINATES_DATABASE["dubai"];
      } else if (fullText.includes("morocco") || fullText.includes("marrocos") || fullText.includes("marruecos") || fullText.includes("marrakech")) {
        fallbackName = "Marrakech";
        fallbackCoords = COORDINATES_DATABASE["marrakech"];
      } else if (fullText.includes("greece") || fullText.includes("grecia") || fullText.includes("athens")) {
        fallbackName = "Athens";
        fallbackCoords = COORDINATES_DATABASE["athens"];
      } else if (fullText.includes("tunisia") || fullText.includes("túnez") || fullText.includes("tunes") || fullText.includes("tunis")) {
        fallbackName = "Tunis";
        fallbackCoords = COORDINATES_DATABASE["tunis"];
      }
      
      extracted.push({
        name: fallbackName,
        coords: fallbackCoords,
        description: `${fallbackName} Gateway`
      });
    }

    return extracted;
  }, [itinerary, t]);

  useEffect(() => {
    if (!mapContainerRef.current || locations.length === 0) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView(locations[0].coords, 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    // Markers
    const markers = [];
    locations.forEach((loc) => {
      const marker = L.marker(loc.coords)
        .addTo(map)
        .bindPopup(`<b>${t('data.' + loc.name, loc.name)}</b><br/>${loc.description || ''}`);
      markers.push(marker);
    });

    // Bounds
    const latlngs = locations.map(l => l.coords);
    if (latlngs.length > 0) {
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Animation / curved line if more than 1 location
    if (locations.length > 1) {
      const pathPoints = [];
      for (let i = 0; i < latlngs.length - 1; i++) {
        const segmentPoints = getCurvePoints(latlngs[i], latlngs[i + 1], 50);
        if (i > 0) segmentPoints.shift();
        pathPoints.push(...segmentPoints);
      }

      L.polyline(pathPoints, {
        color: '#f5a623',
        weight: 3,
        opacity: 0.8,
        dashArray: '8, 8',
      }).addTo(map);

      // Plane icon
      const planeIcon = L.divIcon({
        className: 'plane-marker',
        html: `
          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; transition: transform 0.1s ease;">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#f5a623" stroke="#041446" stroke-width="1.5" style="filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.45));">
              <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
            </svg>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const plane = L.marker(pathPoints[0], { icon: planeIcon }).addTo(map);

      let currentIndex = 0;
      const speed = 0.25; // Control speed (smaller = slower)
      const animate = () => {
        if (pathPoints.length < 2) return;
        
        const indexToUse = Math.floor(currentIndex);
        if (indexToUse >= pathPoints.length) {
          currentIndex = 0;
        }

        const currentPoint = pathPoints[Math.floor(currentIndex)];
        plane.setLatLng(currentPoint);

        const nextPoint = pathPoints[Math.floor(currentIndex) + 1] || pathPoints[0];
        if (nextPoint) {
          const dLat = nextPoint[0] - currentPoint[0];
          const dLng = nextPoint[1] - currentPoint[1];
          const angle = Math.atan2(dLng, dLat) * (180 / Math.PI);
          const planeDiv = plane.getElement()?.querySelector('div');
          if (planeDiv) {
            planeDiv.style.transform = `rotate(${angle}deg)`;
          }
        }

        currentIndex += speed;
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      map.remove();
    };
  }, [locations]);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-16 w-full"
    >
      <div className="mb-10 text-center">
        <span className="text-gold-500 uppercase tracking-[4px] font-semibold block mb-3">
          {t('tour.routeMapSub', 'EXPLORE THE JOURNEY ROUTE')}
        </span>
        <h2 className="text-display-lg text-obsidian-900 dark:text-ivory-50" style={{ fontFamily: "'Playfair Display', serif" }}>
          {t('tour.routeMapTitle', 'Interactive Itinerary Map')}
        </h2>
        <div className="w-24 h-1 bg-gold-500 mx-auto mt-3"></div>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-xl border border-obsidian-900/5 h-[450px] relative z-10">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </motion.div>
  );
};

export default RouteMap;
