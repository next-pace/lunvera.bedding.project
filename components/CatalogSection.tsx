'use client';

import { Container } from './Container';
import { AnimatedFadeIn } from './AnimatedFadeIn';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useI18n } from './I18nProvider';

export function CatalogSection() {
  const { t } = useI18n();

  const stats = [
    { value: '15+', labelKey: 'stats.yearsExperience' },
    { value: '2000+', labelKey: 'stats.happyCustomers' },
    { value: '100+', labelKey: 'stats.productDesigns' },
    { value: '50+', labelKey: 'stats.retailPartners' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container>
        <AnimatedFadeIn>
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-4 sm:px-6 py-2 bg-gray-100 text-gray-700 text-xs sm:text-sm tracking-widest font-light mb-6">
                {t('catalog.label')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-4 sm:mb-6">
              {t('catalog.title')}
            </h2>

            <p className="text-base sm:text-lg text-gray-600 font-light mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              {t('catalog.description')}
            </p>

            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-5 sm:px-8 sm:py-6 rounded-lg font-light tracking-wider group text-sm sm:text-base"
            >
              <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
              {t('catalog.downloadButton')}
            </Button>
          </div>
        </AnimatedFadeIn>

        <AnimatedFadeIn delay={0.3}>
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-light tracking-wide">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </AnimatedFadeIn>
      </Container>
    </section>
  );
}
