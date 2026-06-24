import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import rawData from '../data/programs.json';
const rawPrograms = rawData.programs;

const PROGRAM_IMAGES = {
  'REG-01': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
  'IST-01': 'https://images.unsplash.com/photo-1541432901042-2f8a9e3c2f6f?auto=format&fit=crop&w=800&q=80',
  'REG-03': 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=800&q=80',
  'REG-04': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
  'REG-05': 'https://images.unsplash.com/photo-1593627010885-1c869c3d52b4?auto=format&fit=crop&w=800&q=80',
  'REG-06': 'https://images.unsplash.com/photo-1541432901042-2f8a9e3c2f6f?auto=format&fit=crop&w=800&q=80',
  'REG-07': 'https://images.unsplash.com/photo-1571666526159-23eb3d0b1b54?auto=format&fit=crop&w=800&q=80',
  'REG-08': 'https://images.unsplash.com/photo-1541432901042-2f8a9e3c2f6f?auto=format&fit=crop&w=800&q=80',
  'REG-09': 'https://images.unsplash.com/photo-1593627010885-1c869c3d52b4?auto=format&fit=crop&w=800&q=80',
  'REG-10': 'https://images.unsplash.com/photo-1571666526159-23eb3d0b1b54?auto=format&fit=crop&w=800&q=80',
  'REG-11': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
  'REG-12': 'https://images.unsplash.com/photo-1593627010885-1c869c3d52b4?auto=format&fit=crop&w=800&q=80',
  'REG-05-B': 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=800&q=80',
  'REG-13': 'https://images.unsplash.com/photo-1541432901042-2f8a9e3c2f6f?auto=format&fit=crop&w=800&q=80',
  'REG-14': 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=800&q=80',
};

const getLangValue = (obj, lang) => {
  if (!obj) return '';
  const available = obj[lang] || obj.en || '';
  return available;
};

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const TURKEY_IDS = ['REG-01', 'IST-01', 'REG-03', 'REG-04', 'REG-05', 'REG-05-B', 'REG-06', 'REG-07', 'REG-08', 'REG-09', 'REG-10', 'REG-11', 'REG-12', 'REG-13', 'REG-14'];

export const useTurkeyPrograms = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const supported = ['ar', 'en', 'es', 'pt', 'it'];
  const activeLang = supported.includes(lang) ? lang : 'en';

  return useMemo(() => {
    return rawPrograms.filter((prog) => TURKEY_IDS.includes(prog.id)).map((prog) => {
      const name = getLangValue(prog.name, activeLang);
      return {
        id: prog.id,
        title: name,
        slug: prog.slug || slugify(`${prog.id}-${getLangValue(prog.name, 'en')}`),
        images: [PROGRAM_IMAGES[prog.id] || PROGRAM_IMAGES['REG-01']],
        duration: getLangValue(prog.duration, activeLang),
        highlights: getLangValue(prog.highlights, activeLang),
        overview: getLangValue(prog.overview, activeLang),
        code: getLangValue(prog.code, activeLang),
        minPax: getLangValue(prog.minPax, activeLang),
        transportOptions: prog.transportOptions ? getLangValue(prog.transportOptions, activeLang) : null,
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

export const useTurkeyProgram = (programSlug) => {
  const programs = useTurkeyPrograms();
  return programs.find((p) => p.slug === programSlug) || null;
};
