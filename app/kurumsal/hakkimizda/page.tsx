'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/Container';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { useI18n } from '@/components/I18nProvider';
import { Award, Zap, Hammer, Sofa, Wind, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Award,
    titleKey: 'about.features.luxury',
    descKey: 'about.features.luxuryDesc',
  },
  {
    icon: Hammer,
    titleKey: 'about.features.handcrafted',
    descKey: 'about.features.handcraftedDesc',
  },
  {
    icon: Zap,
    titleKey: 'about.features.ergonomics',
    descKey: 'about.features.ergonomicsDesc',
  },
  {
    icon: Wind,
    titleKey: 'about.features.modern',
    descKey: 'about.features.modernDesc',
  },
  {
    icon: Sofa,
    titleKey: 'about.features.headboards',
    descKey: 'about.features.headboardsDesc',
  },
  {
    icon: CheckCircle,
    titleKey: 'about.features.quality',
    descKey: 'about.features.qualityDesc',
  },
];

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?_gl=1*1kta8bc*_ga*MjA2MDM2MDc0OS4xNzYzMjE3OTc4*_ga_8JE65Q40S6*czE3NjMyMTc5NzgkbzEkZzAkdDE3NjMyMTc5NzgkajYwJGwwJGgw)',
          }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/20" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight"
          >
            {t('about.hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] text-lg md:text-2xl lg:text-3xl font-medium"
          >
            {t('about.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <AnimatedFadeIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-8 sm:mb-12 text-center">
                {t('about.story.title')}
              </h2>

              <div className="space-y-6 text-base sm:text-lg text-gray-700 font-light leading-relaxed">
                <p>
                  {t('about.story.paragraph1')}
                </p>
                <p>
                  {t('about.story.paragraph2')}
                </p>
                <p>
                  {t('about.story.paragraph3')}
                </p>
                <p>
                  {t('about.story.paragraph4')}
                </p>
              </div>
            </div>
          </AnimatedFadeIn>
        </Container>
      </section>

      {/* Image + Text Split Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <AnimatedFadeIn>
              <div className="relative h-96 sm:h-[500px] overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://i.hizliresim.com/6xydx58.png"
                  alt="Lunvera Bedding Premium Mattress"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedFadeIn>

            <AnimatedFadeIn delay={0.2}>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-6 sm:mb-8">
                  {t('about.highlights.title')}
                </h3>

                <ul className="space-y-4 sm:space-y-6">
                  {[
                    'about.highlights.materials',
                    'about.highlights.handcrafted',
                    'about.highlights.ergonomics',
                    'about.highlights.manufacturing',
                    'about.highlights.team',
                  ].map((key, index) => (
                    <motion.li
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="w-6 h-6 text-gray-900" />
                      </div>
                      <p className="text-base sm:text-lg text-gray-700 font-light">
                        {t(key)}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </AnimatedFadeIn>
          </div>
        </Container>
      </section>

      {/* Features Grid Section */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <AnimatedFadeIn>
            <div className="text-center mb-12 sm:mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-4 sm:mb-6">
                {t('about.features.title')}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 font-light max-w-2xl mx-auto">
                {t('about.features.subtitle')}
              </p>
            </div>
          </AnimatedFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedFadeIn key={feature.titleKey} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="group p-8 sm:p-10 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="mb-6">
                      <Icon className="w-12 h-12 text-gray-900 group-hover:text-gray-700 transition-colors" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-light tracking-wide text-gray-900 mb-3">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </motion.div>
                </AnimatedFadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Container>
          <AnimatedFadeIn>
            <div className="text-center max-w-3xl mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white mb-6 sm:mb-8">
                {t('about.cta.title')}
              </h2>
              <p className="text-base sm:text-lg text-white/80 font-light mb-12 sm:mb-16 leading-relaxed">
                {t('about.cta.subtitle')}
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/koleksiyon"
                className="inline-block px-10 sm:px-14 py-4 sm:py-6 bg-white text-gray-900 font-light tracking-wider rounded-lg hover:bg-gray-100 transition-colors text-base sm:text-lg"
              >
                {t('about.cta.button')}
              </motion.a>
            </div>
          </AnimatedFadeIn>
        </Container>
      </section>

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
