'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from './Container';
import { AnimatedFadeIn } from './AnimatedFadeIn';
import { ArrowRight } from 'lucide-react';
import { useI18n } from './I18nProvider';

const products = [
  {
    id: 1,
    title: 'Yatak',
    subtitle: 'Konforun kalbinde premium yataklar',
    image: 'https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?_gl=1*wpfibl*_ga*MjA2MDM2MDc0OS4xNzYzMjE3OTc4*_ga_8JE65Q40S6*czE3NjMyMjc2NDIkbzMkZzEkdDE3NjMyMjc2NTIkajUwJGwwJGgw',
    link: '/koleksiyon#yatak',
  },
  {
    id: 2,
    title: 'Baza',
    subtitle: 'Dayanıklı mekanizma ve geniş depolama',
    image: 'https://i.hizliresim.com/hxw3s7l.png',
    link: '/koleksiyon#baza',
  },
  {
    id: 3,
    title: 'Başlık',
    subtitle: 'Zarif tasarımlar, farklı ölçüler',
    image: 'https://i.hizliresim.com/5y7i7ov.png',
    link: '/koleksiyon#baslik',
  },
];

export function ProductGrid() {
  const { t } = useI18n();

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <Container>
        <AnimatedFadeIn>
          <div className="text-center mb-12 sm:mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-3 sm:mb-4">
              {t('collection.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light max-w-2xl mx-auto">
              {t('collection.subtitle')}
            </p>
          </div>
        </AnimatedFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card #1 — Yatak */}
          <AnimatedFadeIn delay={0}>
            <Link href={products[0].link} className="group rounded-2xl overflow-hidden shadow-lg bg-white block h-full">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={products[0].image}
                  alt={products[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">{products[0].title}</h3>
                <p className="mt-1 text-gray-600 font-light">{products[0].subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-gray-900 font-medium">
                  KEŞFET <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </AnimatedFadeIn>

          {/* Card #2 — Baza */}
          <AnimatedFadeIn delay={0.2}>
            <Link href={products[1].link} className="group rounded-2xl overflow-hidden shadow-lg bg-white block h-full">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={products[1].image}
                  alt={products[1].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">{products[1].title}</h3>
                <p className="mt-1 text-gray-600 font-light">{products[1].subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-gray-900 font-medium">
                  KEŞFET <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </AnimatedFadeIn>

          {/* Card #3 — Başlık (centered under the first two) */}
          <AnimatedFadeIn delay={0.4} className="md:col-span-2 md:justify-self-center md:max-w-xl w-full">
            <Link href={products[2].link} className="group rounded-2xl overflow-hidden shadow-lg bg-white block h-full">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={products[2].image}
                  alt={products[2].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">{products[2].title}</h3>
                <p className="mt-1 text-gray-600 font-light">{products[2].subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-gray-900 font-medium">
                  KEŞFET <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </AnimatedFadeIn>
        </div>
      </Container>
    </section>
  );
}
