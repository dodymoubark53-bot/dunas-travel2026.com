import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Dubai = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen bg-obsidian-50 pt-24 pb-24">
      <Helmet>
        <title>{t('dest.dubai.seoTitle', 'Luxury Dubai Tours & Vacations | Dunas Travel')}</title>
        <meta name="description" content={t('dest.dubai.seoDesc', 'Explore luxury journeys in Dubai. Custom itineraries coming soon.')} />
      </Helmet>
      <div className="container mx-auto px-6 text-center py-20">
        {/* Left completely empty for now — no tours, no content */}
      </div>
    </div>
  );
};

export default Dubai;
