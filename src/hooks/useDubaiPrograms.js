import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import rawData from '../data/programs.json';
const rawPrograms = rawData.programs;

const PROGRAM_IMAGES = {
  'REG-22': 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&w=800&q=80',
  'REG-23': 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
  'REG-24': 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
  'REG-25': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
  'REG-26': 'https://images.unsplash.com/photo-1566252176582-d0d1e9b36d47?auto=format&fit=crop&w=800&q=80',
  'REG-27': 'https://images.unsplash.com/photo-1599571234908-29ed5d0f5e41?auto=format&fit=crop&w=800&q=80',
  'REG-28': 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=800&q=80',
};

const getLangValue = (obj, lang) => {
  if (!obj) return '';
  const available = obj[lang] || obj.en || '';
  return available;
};

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const DUBAI_IDS = ['REG-22', 'REG-23', 'REG-24', 'REG-25', 'REG-26', 'REG-27', 'REG-28'];

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

export const useDubaiProgram = (programSlug) => {
  const programs = useDubaiPrograms();
  return programs.find((p) => p.slug === programSlug) || null;
};