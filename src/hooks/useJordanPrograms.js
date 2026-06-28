import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import rawData from '../data/programs.json';
const rawPrograms = rawData.programs;

const PROGRAM_IMAGES = {
  'REG-15': 'https://www.urtrips.net/wp-content/uploads/2019/02/Archaeological-Sites-In-Jordan-1.jpg',
  'REG-16': 'https://cdn.alweb.com/thumbs/jordanencyclopedia/article/fit710x532/%D8%A3%D9%83%D8%A8%D8%B1-%D9%88%D8%A7%D8%AF%D9%8A-%D9%81%D9%8A-%D8%A7%D9%84%D8%A3%D8%B1%D8%AF%D9%86.jpg',
  'REG-17': 'https://as2.ftcdn.net/v2/jpg/01/67/01/83/1000_F_167018309_n4U66E0FtjpdX5HpidLKSNetfnbayUib.jpg',
  'REG-18': 'https://thf.bing.com/th/id/R.163b5da11482baa539001f4a45596dcf?rik=4f9diCHlS0FjAQ&pid=ImgRaw&r=0',
  'REG-19': 'https://i.pinimg.com/originals/ea/82/aa/ea82aa3795de28e223cefe6e8cd72ed4.jpg',
  'REG-20': 'https://www.opreismetco.nl/wp-content/uploads/2023/05/Citadel-van-Amman-min-585x390.jpg',
  'REG-21': 'https://png.pngtree.com/thumb_back/fh260/background/20220313/pngtree-ruins-at-amman-jordan-moyen-minaret-asia-photo-image_365536.jpg',
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
