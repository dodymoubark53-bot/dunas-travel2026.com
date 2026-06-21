import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import rawData from '../data/programs.json';
const rawPrograms = rawData.programs;

const PROGRAM_IMAGES = {
  'REG-15': 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=800&q=80',
  'REG-16': 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=800&q=80',
  'REG-17': 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=800&q=80',
  'REG-18': 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=800&q=80',
  'REG-19': 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=800&q=80',
  'REG-20': 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=800&q=80',
  'REG-21': 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=800&q=80',
};

const getLangValue = (obj, lang) => {
  if (!obj) return '';
  const available = obj[lang] || obj.en || '';
  return available;
};

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const JORDAN_IDS = ['REG-15', 'REG-16', 'REG-17', 'REG-18', 'REG-19', 'REG-20', 'REG-21'];

export const useJordanPrograms = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const supported = ['ar', 'en', 'es', 'pt', 'it'];
  const activeLang = supported.includes(lang) ? lang : 'en';

  return useMemo(() => {
    return rawPrograms
      .filter((prog) => JORDAN_IDS.includes(prog.id))
      .map((prog) => {
        const name = getLangValue(prog.name, activeLang);
        return {
          id: prog.id,
          title: name,
          slug: slugify(`${prog.id}-${getLangValue(prog.name, 'en')}`),
          images: [PROGRAM_IMAGES[prog.id] || PROGRAM_IMAGES['REG-15']],
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

export const useJordanProgram = (programSlug) => {
  const programs = useJordanPrograms();
  return programs.find((p) => p.slug === programSlug) || null;
};
