'use client';

import { Container } from './Container';
import { AnimatedFadeIn } from './AnimatedFadeIn';
import { useI18n } from './I18nProvider';

export function BrandsSection() {
  const { t } = useI18n();

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <Container>
        <AnimatedFadeIn>
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h3 className="text-xl sm:text-2xl font-light text-gray-900 tracking-wide mb-2">
              {t('brands.title')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 font-light">
              {t('brands.subtitle')}
            </p>
          </div>
        </AnimatedFadeIn>

        <AnimatedFadeIn delay={0.2}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-4">
            {/* Lunvera Logo */}
            <img
              src="https://i.hizliresim.com/e4aq3jz.png"
              alt="Lunvera"
              className="h-10 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition"
            />

            {/* Divider */}
            <span className="h-px w-12 bg-black/90 md:hidden block" />
            <span className="w-px h-10 bg-black/90 md:block hidden" />

            {/* Akanlar Tekstil Logo */}
            <img
              src="https://i.hizliresim.com/exdfyj4.png"
              alt="Akanlar Tekstil"
              className="h-10 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition"
            />
          </div>
        </AnimatedFadeIn>
      </Container>
    </section>
  );
}
