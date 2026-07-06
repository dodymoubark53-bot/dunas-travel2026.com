import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import rawData from '../data/programs.json';
const rawPrograms = rawData.programs;

const PROGRAM_IMAGES = {
  'REG-01': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
  'IST-01': 'https://a.cdn-hotels.com/gdcs/production175/d754/d756ebcf-98f2-4434-995f-ed439e38d9d2.jpg',
  'REG-03': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/4a/15/4f/caption.jpg?w=1200&h=-1&s=1',
  'REG-04': 'https://thf.bing.com/th/id/R.16d8f1c818ab6354a2ac3177a7cac9ac?rik=AOSUtCpLkrJ2FA&pid=ImgRaw&r=0',
  'REG-05': 'https://i.pinimg.com/736x/6a/5e/e6/6a5ee6915c509d87f24276f1d243cb9f.jpg',
  'REG-06': 'https://turkeytravelbazaar.com/wp-content/uploads/2025/03/Cappadocia-Hot-Air-Balloons-View-Terrace-4.jpg',
  'REG-07': 'https://i.pinimg.com/736x/57/07/d7/5707d7d0930e52507013a987d941184e.jpg',
  'REG-08': 'https://static1.simpleflyingimages.com/wordpress/wp-content/uploads/2024/05/artboard-16_9-4-20.jpg',
  'REG-09': 'https://media.istockphoto.com/id/2024126355/photo/new-mosque-at-sunset.jpg?s=612x612&w=0&k=20&c=tZojzLGNONPUvHAWNXS-JFNdih3tL93UvznnWETfP6Y=',
  'REG-10': 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/05/28/117488.jpg',
  'REG-11': 'https://www.goatsontheroad.com/wp-content/uploads/2023/10/Antalya-720x352.jpg',
  'REG-12': 'https://i.pinimg.com/736x/0c/be/98/0cbe98687e7a5fae880ea042f9aac152.jpg',
  'REG-05-B': 'https://thumbs.dreamstime.com/b/islamic-mosque-snow-picturesque-islamic-mosque-covered-snow-creating-peaceful-enchanting-winter-scene-365399430.jpg',
  'REG-13': 'https://i.pinimg.com/736x/07/41/22/07412252a9ff205485f66d32240696ca.jpg',
  'REG-14': 'https://cdn.historycollection.com/wp-content/uploads/2025/06/gobekli-tepe-unveiling-the-mysteries-of-the-worlds-first-temple-complex.jpg',
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

export const useTurkeyProgram = (programSlugOrId) => {
  const programs = useTurkeyPrograms();
  if (!programSlugOrId) return null;
  const lower = programSlugOrId.toLowerCase();
  return programs.find((p) => p.slug.toLowerCase() === lower || p.id.toLowerCase() === lower) || null;
};
