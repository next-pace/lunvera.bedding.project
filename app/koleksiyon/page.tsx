'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useI18n } from '@/components/I18nProvider';

type Variant = { color: string; swatch: string; url: string };
type Product = { model: string; variants: Variant[]; specs: string[] };

const products: Product[] = [
  {
    model: 'Momento',
    variants: [
      { color: 'Beyaz', swatch: '#FFFFFF', url: 'https://i.hizliresim.com/cetyf5g.jpeg' },
      { color: 'Gri', swatch: '#9AA0A6', url: 'https://i.hizliresim.com/6hkayen.jpeg' },
      { color: 'Krem', swatch: '#E7DDC9', url: 'https://i.hizliresim.com/eze6vz2.jpeg' },
    ],
    specs: ['Pocket Yay', 'Garanti', 'Elyaf', 'Termal Keçe', 'Ergonomik', 'Örme Kumaş', 'Antibakteriyel', 'Rulo Dokuma Süngeri', 'Çift Taraf Kullanım', 'Full Ortopedik'],
  },
  {
    model: 'Armada Pedli',
    variants: [
      { color: 'Vizon Antrasit', swatch: '#5E5A57', url: 'https://i.hizliresim.com/pwmqfyh.jpeg' },
      { color: 'Antrasit', swatch: '#2F343A', url: 'https://i.hizliresim.com/k914a17.jpeg' },
      { color: 'Gri', swatch: '#9AA0A6', url: 'https://i.hizliresim.com/6dcpsuj.jpeg' },
      { color: 'Krem', swatch: '#E7DDC9', url: 'https://i.hizliresim.com/9ql3v92.jpeg' },
      { color: 'Beyaz', swatch: '#FFFFFF', url: 'https://i.hizliresim.com/aiqbv1d.jpeg' },
    ],
    specs: ['Pocket Yay', 'Garanti', 'Elyaf', 'Termal Keçe', 'Ergonomik', 'Örme Kumaş', 'Antibakteriyel', 'Rulo Dokuma Süngeri', 'Full Ortopedik'],
  },
  {
    model: 'Elegans',
    variants: [
      { color: 'Antrasit', swatch: '#2F343A', url: 'https://i.hizliresim.com/ka1j9pq.jpeg' },
      { color: 'Vizon', swatch: '#8C7A6B', url: 'https://i.hizliresim.com/pw1bstm.jpeg' },
      { color: 'Gri', swatch: '#9AA0A6', url: 'https://i.hizliresim.com/5lkjsx0.jpeg' },
      { color: 'Krem', swatch: '#E7DDC9', url: 'https://i.hizliresim.com/ikqau3p.jpeg' },
      { color: 'Örme Kumaş', swatch: '#A7B0B8', url: 'https://i.hizliresim.com/db92zfh.jpeg' },
    ],
    specs: ['Pocket Yay', 'Garanti', 'Elyaf', 'Termal Keçe', 'Ergonomik', 'Örme Kumaş', 'Antibakteriyel', 'Soft Ortopedik'],
  },
  {
    model: 'Eco Life',
    variants: [
      { color: 'Gri', swatch: '#9AA0A6', url: 'https://i.hizliresim.com/ff4u6m7.jpeg' },
    ],
    specs: ['Pocket Yay', 'Garanti', 'Elyaf', 'Termal Keçe', 'Soft Ortopedik'],
  },
  {
    model: 'Conray (Fermuarlı)',
    variants: [
      { color: 'Beyaz', swatch: '#FFFFFF', url: 'https://i.hizliresim.com/21qpobn.jpeg' },
    ],
    specs: ['Pocket Yay', 'Garanti', 'Elyaf', 'Termal Keçe', 'Full Ortopedik', 'Fermuarlı'],
  },
  {
    model: 'Flora Solid Baza',
    variants: [
      { color: 'Antrasit', swatch: '#2F343A', url: 'https://i.hizliresim.com/c6d0avj.jpeg' },
      { color: 'Krem', swatch: '#E7DDC9', url: 'https://i.hizliresim.com/msx2j48.jpeg' },
    ],
    specs: ['Dayanıklı Mekanizma', 'Şık Tasarım'],
  },
  {
    model: 'Gardenya Başlıklar',
    variants: [
      { color: 'Çoklu Renkler', swatch: '#8C7A6B', url: 'https://i.hizliresim.com/52yubqw.jpeg' },
    ],
    specs: ['Başlık Ölçüleri: 90–100–120–150–160–180'],
  },
  {
    model: 'Balance Başlıklar',
    variants: [
      { color: 'Çoklu Renkler', swatch: '#9AA0A6', url: 'https://i.hizliresim.com/gqple5r.jpeg' },
    ],
    specs: ['Başlık Ölçüleri: 90–100–120–150–160–180'],
  },
];

function ProductRow({ product, reverse }: { product: Product; reverse: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const variant = product.variants[selectedIndex];

  const imageSection = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="aspect-square w-full max-w-sm overflow-hidden rounded-xl shadow-md bg-gray-100">
        <motion.img
          key={variant.url}
          src={variant.url}
          alt={`${product.model} - ${variant.color}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      </div>

      <div className="mt-4 flex items-center gap-3 flex-wrap justify-center">
        {product.variants.map((v, idx) => {
          const isActive = idx === selectedIndex;
          return (
            <motion.button
              key={v.url}
              onClick={() => setSelectedIndex(idx)}
              aria-label={`${product.model} – ${v.color}`}
              aria-pressed={isActive}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`relative w-8 h-8 md:w-9 md:h-9 rounded-full border border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                isActive ? 'ring-2 ring-gray-900' : 'ring-0'
              }`}
              style={{ backgroundColor: v.swatch }}
            />
          );
        })}
      </div>

      <p className="mt-2 text-sm text-gray-600 font-medium">
        {variant.color}
      </p>
    </motion.div>
  );

  const infoSection = (
    <motion.div
      initial={{ opacity: 0, x: reverse ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
        {product.model}
      </h2>

      <div className="flex flex-wrap gap-2">
        {product.specs.map((spec, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 rounded-full text-sm border border-gray-300 bg-white text-gray-700 font-light"
          >
            {spec}
          </span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="py-10 md:py-14 border-b last:border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {reverse ? (
            <>
              {imageSection}
              {infoSection}
            </>
          ) : (
            <>
              {infoSection}
              {imageSection}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[48vh] md:h-[56vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?_gl=1*1i0yw53*_ga*MjA2MDM2MDc0OS4xNzYzMjE3OTc4*_ga_8JE65Q40S6*czE3NjMyMjA3NDQkbzIkZzEkdDE3NjMyMjA3ODEkajIzJGwwJGgw)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3 tracking-tight drop-shadow-lg">
            {t('collection.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light drop-shadow-md">
            {t('collection.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Products Section */}
      <section className="bg-white">
        {products.map((product, index) => (
          <ProductRow key={product.model} product={product} reverse={index % 2 === 1} />
        ))}
      </section>

      <Footer />
    </main>
  );
}
