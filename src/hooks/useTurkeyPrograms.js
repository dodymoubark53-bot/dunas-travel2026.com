import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import rawData from '../data/programs.json';
const rawPrograms = rawData.programs;

const PROGRAM_IMAGES = {
  'REG-01': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
  'REG-02': 'https://images.unsplash.com/photo-1541437155-37baec36a69b?auto=format&fit=crop&w=800&q=80',
  'REG-03': 'https://images.unsplash.com/photo-1577100033006-3c181e0eae2c?auto=format&fit=crop&w=800&q=80',
  'REG-04': 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=800&q=80',
  'REG-05': 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=800&q=80',
  'REG-05-B': 'https://images.unsplash.com/photo-1600166898405-da74a27a7fb7?auto=format&fit=crop&w=800&q=80',
  'REG-06': 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=800&q=80',
  'REG-07': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
  'REG-08': 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=800&q=80',
  'REG-09': 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?auto=format&fit=crop&w=800&q=80',
  'REG-10': 'https://images.unsplash.com/photo-1583241800698-e8ab01830e07?auto=format&fit=crop&w=800&q=80',
  'REG-11': 'https://images.unsplash.com/photo-1591757897019-f31acc64459a?auto=format&fit=crop&w=800&q=80',
  'REG-13': 'https://images.unsplash.com/photo-1605633017240-f4116c7e61fc?auto=format&fit=crop&w=800&q=80',
  'REG-14': 'https://images.unsplash.com/photo-1568482160392-6cc24da0592d?auto=format&fit=crop&w=800&q=80',
};

const getLangValue = (obj, lang) => {
  if (!obj) return '';
  const available = obj[lang] || obj.en || '';
  return available;
};

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const TURKEY_IDS = ['REG-01', 'REG-02', 'REG-03', 'REG-04', 'REG-05', 'REG-05-B', 'REG-06', 'REG-07', 'REG-08', 'REG-09', 'REG-10', 'REG-11', 'REG-13', 'REG-14'];

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
        slug: slugify(`${prog.id}-${getLangValue(prog.name, 'en')}`),
        images: [PROGRAM_IMAGES[prog.id] || PROGRAM_IMAGES['REG-01']],
        duration: getLangValue(prog.duration, activeLang),
        highlights: getLangValue(prog.highlights, activeLang),
        overview: getLangValue(prog.overview, activeLang),
        code: getLangValue(prog.code, activeLang),
        minPax: getLangValue(prog.minPax, activeLang),
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
