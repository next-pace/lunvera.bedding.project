'use client';

import { Container } from './Container';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useI18n } from './I18nProvider';

const navigation = {
  main: [
    { key: 'home', href: '/' },
    { key: 'corporate', href: '#' },
    { key: 'collection', href: '/koleksiyon' },
    { key: 'gallery', href: '/galeri' },
    { key: 'contact', href: '/iletisim' },
  ],
  social: [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
  ],
};

const contactInfo = {
  address: 'Demirhendek Cd. No:49, 06360 Siteler – Altındağ / Ankara – TÜRKİYE',
  phone: '+90 312 351 40 70',
  phones: [
    { label: '+90 312 351 40 70', href: 'tel:+903123514070' },
    { label: '0 536 575 77 57', href: 'tel:+905365757757' },
    { label: '0 532 296 78 43', href: 'tel:+905322967843' },
  ],
  website: 'www.lunvera.com.tr',
  email: 'info@lunvera.com.tr',
  emailHref: 'mailto:info@lunvera.com.tr',
};

export function Footer() {
  const { t } = useI18n();

  return (
    <footer id="site-footer" className="bg-gray-900 text-white">
      <Container>
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
          <div>
            <div className="mb-4 sm:mb-6">
              <img 
                src="https://i.hizliresim.com/ilzzxyv.png" 
                alt="Lunvera Bedding" 
                className="h-8 md:h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 font-light mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-light tracking-wide mb-4 sm:mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {navigation.main.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors font-light text-sm sm:text-base"
                  >
                    {t(`navigation.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-base sm:text-lg font-light tracking-wide mb-4 sm:mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400 font-light text-sm sm:text-base">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div className="flex flex-col space-y-1">
                  {contactInfo.phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="text-gray-400 hover:text-white transition-colors font-light text-sm sm:text-base"
                    >
                      {p.label}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <a
                  href={contactInfo.emailHref}
                  className="text-gray-400 hover:text-white transition-colors font-light text-sm sm:text-base break-all"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 sm:py-8">
          <p className="text-center text-gray-400 font-light text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Lunvera Bedding. {t('footer.copyright')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
