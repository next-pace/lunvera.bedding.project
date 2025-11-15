'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const images = [
  'https://i.hizliresim.com/tb0atu7.jpeg',
  'https://i.hizliresim.com/a6xp06v.jpeg',
  'https://i.hizliresim.com/hey1ytl.jpeg',
  'https://i.hizliresim.com/8qsb0g6.jpeg',
  'https://i.hizliresim.com/s1mnfhc.jpeg',
  'https://i.hizliresim.com/qsmg9ck.jpeg',
  'https://i.hizliresim.com/au93nz3.jpeg',
  'https://i.hizliresim.com/h625on7.jpeg',
  'https://i.hizliresim.com/f313cma.jpeg',
  'https://i.hizliresim.com/8y31ti2.jpeg',
  'https://i.hizliresim.com/n1hrfix.jpeg',
  'https://i.hizliresim.com/86674x5.jpeg',
  'https://i.hizliresim.com/6k4mwch.jpeg',
  'https://i.hizliresim.com/7tdesvs.jpeg',
  'https://i.hizliresim.com/cy4x1kh.jpeg',
  'https://i.hizliresim.com/mnjaexy.jpeg',
  'https://i.hizliresim.com/k6ysiyw.jpeg',
  'https://i.hizliresim.com/itk79qw.jpeg',
  'https://i.hizliresim.com/cazpbt7.jpeg',
  'https://i.hizliresim.com/inwg7pi.jpeg',
  'https://i.hizliresim.com/bzxl81f.jpeg',
  'https://i.hizliresim.com/f8j9029.jpeg',
  'https://i.hizliresim.com/o1hrwyw.jpeg',
  'https://i.hizliresim.com/a1s2lpz.jpeg',
];

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, next, prev]);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[36vh] md:h-[44vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/8143666/pexels-photo-8143666.jpeg?_gl=1*1glz8j*_ga*MjA2MDM2MDc0OS4xNzYzMjE3OTc4*_ga_8JE65Q40S6*czE3NjMyMjA3NDQkbzIkZzEkdDE3NjMyMjA3ODUkajE5JGwwJGgw)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight drop-shadow-lg">
            Galeri
          </h1>
          <p className="mt-3 text-lg md:text-xl text-white/90 font-light drop-shadow-md">
            Mağazamızdan ve ürünlerimizden kareler.
          </p>
        </motion.div>
      </section>

      {/* Gallery Content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Masonry Grid */}
        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((src, i) => (
            <motion.button
              key={src}
              onClick={() => openAt(i)}
              className="block w-full text-left break-inside-avoid focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <img
                src={src}
                alt={`Lunvera gallery image ${i + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-modal="true"
            role="dialog"
            aria-label="Galeri görüntüleyici"
          >
            <div
              className="relative w-full max-w-6xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={close}
                className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Kapat"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Image */}
              <motion.img
                key={images[idx]}
                src={images[idx]}
                alt={`Lunvera gallery image ${idx + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />

              {/* Navigation & Controls */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 bg-gradient-to-t from-black/60 to-transparent">
                {/* Left: Previous Button */}
                <motion.button
                  onClick={prev}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Önceki görüntü"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                {/* Center: Counter */}
                <div className="text-white text-sm font-medium">
                  {idx + 1} / {images.length}
                </div>

                {/* Right: Next & Download */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={next}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Sonraki görüntü"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>

                  <motion.a
                    href={images[idx]}
                    download
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="İndir"
                  >
                    <Download className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>

              {/* Image Counter & Caption */}
              <div className="absolute top-4 left-4 text-white text-sm font-medium bg-black/40 px-3 py-1.5 rounded-lg">
                Lunvera Galeri
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
