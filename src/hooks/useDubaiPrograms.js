import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import rawData from '../data/programs.json';
const rawPrograms = rawData.programs;

const PROGRAM_IMAGES = {
  'REG-22': 'https://wallpaperaccess.com/full/222675.jpg',
  'REG-23': '/imgs/programs/dubai-reg-23.webp',
  'REG-24': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/cf/55/ba/caption.jpg?w=1200&h=1200&s=1',
  'REG-25': 'https://www.yasmina.com/tachyon/sites/5/2022/01/7f96899cbdde462971ae6a503d3a61cfc65f50a1.jpg',
  'REG-26': 'https://i.pinimg.com/736x/7b/a8/4e/7ba84eb916025464c345151b07fc4604.jpg',
  'REG-27': '/imgs/programs/dubai-reg-27.webp',
  'REG-28': 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=800&q=80',
  'HM001': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
  'HM002': 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/19/7f/2e.jpg',
};

const getLangValue = (obj, lang) => {
  if (!obj) return '';
  const available = obj[lang] || obj.en || '';
  return available;
};

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const DUBAI_IDS = ['REG-22', 'REG-23', 'REG-24', 'REG-25', 'REG-26', 'REG-27', 'REG-28', 'HM001', 'HM002'];

export const useDubaiPrograms = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const supported = ['ar', 'en', 'es', 'pt', 'it'];
  const activeLang = supported.includes(lang) ? lang : 'en';

  return useMemo(() => {
    return rawPrograms
      .filter((prog) => DUBAI_IDS.includes(prog.id))
      .map((prog) => {
        const name = getLangValue(prog.name, activeLang);
        return {
          id: prog.id,
          title: name,
          slug: slugify(`${prog.id}-${getLangValue(prog.name, 'en')}`),
          images: [PROGRAM_IMAGES[prog.id] || PROGRAM_IMAGES['REG-22']],
          duration: getLangValue(prog.duration, activeLang),
          highlights: getLangValue(prog.highlights, activeLang),
          overview: getLangValue(prog.overview, activeLang),
          code: getLangValue(prog.code, activeLang),
          minPax: getLangValue(prog.minPax, activeLang),
          includes: getLangValue(prog.includes, activeLang),
          excludes: getLangValue(prog.excludes, activeLang),
          pricing: prog.pricing ? {
            ...prog.pricing,
            hotels: prog.pricing.hotels.map(h => typeof h === 'object' ? getLangValue(h, activeLang) : h),
          } : null,
          extraNightPrices: prog.extraNightPrices ? {
            ...prog.extraNightPrices,
            hotels: prog.extraNightPrices.hotels.map(h => typeof h === 'object' ? getLangValue(h, activeLang) : h),
          } : null,
          exhibitionSurcharges: prog.exhibitionSurcharges ? {
            dubai: prog.exhibitionSurcharges.dubai?.map(e => ({
              ...e,
              event: getLangValue(e.event, activeLang),
              dates: getLangValue(e.dates, activeLang),
            })) || null,
            abuDhabi: prog.exhibitionSurcharges.abuDhabi?.map(e => ({
              ...e,
              event: getLangValue(e.event, activeLang),
              dates: getLangValue(e.dates, activeLang),
            })) || null,
          } : null,
          days: prog.days.map((day) => ({
            day: day.day,
            description: getLangValue(day.description, activeLang),
            meals: day.meals ? getLangValue(day.meals, activeLang) : null,
          })),
          raw: prog,
        };
      });
  }, [activeLang]);
};

export const useDubaiProgram = (programSlugOrId) => {
  const programs = useDubaiPrograms();
  if (!programSlugOrId) return null;
  const lower = programSlugOrId.toLowerCase();
  return programs.find((p) => p.slug.toLowerCase() === lower || p.id.toLowerCase() === lower) || null;
};