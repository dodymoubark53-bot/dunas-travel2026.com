import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Invoice = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen bg-ivory-50 pb-24 font-body pt-32">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h1 className="text-display-xl text-obsidian-900 font-display mb-8">
          Invoice
        </h1>
        <p className="text-body-lg text-obsidian-700">
          This page is under construction.
        </p>
      </div>
    </div>
  );
};

export default Invoice;
