const fs = require('fs');
let content = fs.readFileSync('./src/data/multiCountryTours.js', 'utf8');
// Remove the import line
content = content.replace(/import \{ useTranslation \} from 'react-i18next';\n/, '');
content = content.replace("const getLocalizedTours = (t) => [", "module.exports = [");
content = content.replace("export const multiCountryTours = getLocalizedTours;", "");
content = content.replace("export default multiCountryTours;", "");
fs.writeFileSync('./_temp_tours.cjs', content);
const tours = require('./_temp_tours.cjs');
console.log('Loaded tours count:', tours.length);

const strings = new Set();
tours.forEach(tour => {
  ['title','subtitle','duration','type','overview'].forEach(f => {
    if (tour[f]) strings.add(tour[f]);
  });
  (tour.countries||[]).forEach(c => strings.add(c));
  (tour.highlights||[]).forEach(h => strings.add(h));
  (tour.included||[]).forEach(i => strings.add(i));
  (tour.excluded||[]).forEach(e => strings.add(e));
  (tour.accommodations||[]).forEach(a => {
    if(a.destination) strings.add(a.destination);
    if(a.regime) strings.add(a.regime);
  });
  (tour.itinerary||[]).forEach(d => {
    ['title','morning','afternoon','evening'].forEach(f => {
      if (d[f]) strings.add(d[f]);
    });
  });
  (tour.pricing||[]).forEach(p => {
    if(p.label) strings.add(p.label);
  });
});
console.log('Total unique strings:', strings.size);
fs.writeFileSync('./_extracted_strings.json', JSON.stringify([...strings], null, 2));
