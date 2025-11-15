// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { Container } from './Container';
import { Facebook, Instagram, Twitter, Globe, Menu, X } from 'lucide-react';
import { useI18n } from './I18nProvider';

const navigation = [
  { key: 'home', href: '/' },
  { 
    key: 'corporate', 
    href: '#',
    submenu: [
      { key: 'about', href: '/kurumsal/hakkimizda' }
    ]
  },
  { key: 'collection', href: '/koleksiyon' },
  { key: 'gallery', href: '/galeri' },
  { key: 'contact', href: '/iletisim' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, setLanguage } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled ? 'bg-white/95 shadow-md' : 'bg-white/10'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="flex items-center">
                {isScrolled ? (
                  <img 
                    src="https://i.hizliresim.com/e4aq3jz.png" 
                    alt="Lunvera Bedding" 
                    className="h-8 md:h-10 w-auto"
                  />
                ) : (
                  <img 
                    src="https://i.hizliresim.com/ilzzxyv.png" 
                    alt="Lunvera Bedding" 
                    className="h-8 md:h-10 w-auto"
                  />
                )}
              </div>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.key} className="relative group">
                <a
                  href={item.href}
                  className={`relative text-sm font-light tracking-wide transition-colors ${
                    isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                  } ${item.submenu ? 'flex items-center' : ''}`}
                >
                  {t(`navigation.${item.key}`)}
                  {item.submenu && (
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-gray-900' : 'bg-white'
                  }`} />
                </a>
                
                {item.submenu && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.key}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t(`navigation.${subItem.key}`)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={toggleLanguage}
              className={`flex items-center space-x-2 text-sm font-light transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className={language === 'en' ? 'font-medium' : ''}>EN</span>
              <span className={isScrolled ? 'text-gray-400' : 'text-white/50'}>|</span>
              <span className={language === 'tr' ? 'font-medium' : ''}>TR</span>
            </button>

            <div className="hidden sm:flex items-center space-x-4">
              <a
                href="#"
                className={`transition-colors ${
                  isScrolled ? 'text-gray-400 hover:text-gray-900' : 'text-white/70 hover:text-white'
                }`}
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className={`transition-colors ${
                  isScrolled ? 'text-gray-400 hover:text-gray-900' : 'text-white/70 hover:text-white'
                }`}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className={`transition-colors ${
                  isScrolled ? 'text-gray-400 hover:text-gray-900' : 'text-white/70 hover:text-white'
                }`}
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <div key={item.key}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-light tracking-wide transition-colors py-2 block ${
                      isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {t(`navigation.${item.key}`)}
                  </a>
                  {item.submenu?.map((subItem) => (
                    <a
                      key={subItem.key}
                      href={subItem.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 py-1 pl-4 block"
                    >
                      {t(`navigation.${subItem.key}`)}
                    </a>
                  ))}
                </div>
              ))}
              <div className="flex items-center space-x-4 pt-3 border-t border-gray-300/20">
                <a
                  href="#"
                  className={`transition-colors ${
                    isScrolled ? 'text-gray-400 hover:text-gray-900' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`transition-colors ${
                    isScrolled ? 'text-gray-400 hover:text-gray-900' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`transition-colors ${
                    isScrolled ? 'text-gray-400 hover:text-gray-900' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}