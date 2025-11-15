// components/I18nProvider.tsx
'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

type Translations = {
  [key: string]: {
    en: string;
    tr: string;
  };
};

type I18nContextType = {
  t: (key: string) => string;
  language: 'en' | 'tr';
  setLanguage: (lang: 'en' | 'tr') => void;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Translations = {
  // Navigation
  'navigation.home': { en: 'Home', tr: 'Ana Sayfa' },
  'navigation.corporate': { en: 'Corporate', tr: 'Kurumsal' },
  'navigation.about': { en: 'About Us', tr: 'Hakkımızda' },
  'navigation.collection': { en: 'Collection', tr: 'Koleksiyon' },
  'navigation.gallery': { en: 'Gallery', tr: 'Galeri' },
  'navigation.contact': { en: 'Contact', tr: 'İletişim' },

  // Hero Section
  'hero.title1': { en: 'Redefining Comfort.', tr: 'Konforu Yeniden Tanımlıyoruz.' },
  'hero.title2': { en: 'Designed for Pure Sleep.', tr: 'Saf Uyku İçin Tasarlandı.' },
  'hero.description': { 
    en: 'Experience the perfect balance of luxury and comfort with our meticulously crafted bedding collection',
    tr: 'Özenle hazırlanmış yatak takımlarımızla lüks ve konforun mükemmel dengesini yaşayın'
  },
  'hero.buttonDiscover': { en: 'Discover Our Collection', tr: 'Koleksiyonumuzu Keşfedin' },

  // Collection Section
  'collection.title': { en: 'Our Collection', tr: 'Koleksiyonumuz' },
  'collection.subtitle': { 
    en: 'Discover handcrafted pieces that transform your bedroom into a sanctuary of comfort',
    tr: 'Yatak odanızı bir konfor cenneti haline dönüştüren el yapımı parçaları keşfedin'
  },
  'collection.bedSets': { en: 'Bed Sets', tr: 'Yatak Takımları' },
  'collection.bedSetsDesc': { en: 'Complete bedroom elegance', tr: 'Tam yatak odası zarafeti' },
  'collection.mattresses': { en: 'Mattresses', tr: 'Matraslar' },
  'collection.mattressesDesc': { en: 'Engineered for perfect rest', tr: 'Mükemmel dinlenme için tasarlandı' },
  'collection.accessories': { en: 'Poufs & Accessories', tr: 'Puflar ve Aksesuarlar' },
  'collection.accessoriesDesc': { en: 'Refined finishing touches', tr: 'Rafine son dokunuşlar' },
  'collection.explore': { en: 'EXPLORE', tr: 'KEŞFET' },

  // Catalog Section
  'catalog.label': { en: 'CATALOG', tr: 'KATALOG' },
  'catalog.title': { en: 'Explore Our Complete Collection', tr: 'Tam Koleksiyonumuzu Keşfedin' },
  'catalog.description': { 
    en: 'Download our comprehensive catalog to discover the full range of Lunvera Bedding products. From premium mattresses to elegant bed sets, find everything you need to create your perfect bedroom sanctuary.',
    tr: 'Lunvera Bedding ürünlerinin tam yelpazesini keşfetmek için kapsamlı kataloğumuzu indirin. Premium matraslardan zarif yatak takımlarına kadar, mükemmel yatak odanızı oluşturmak için ihtiyacınız olan her şeyi bulun.'
  },
  'catalog.downloadButton': { en: 'Download Catalog', tr: 'Kataloğu İndir' },

  // Stats Section
  'stats.yearsExperience': { en: 'Years Experience', tr: 'Yıl Deneyim' },
  'stats.happyCustomers': { en: 'Happy Customers', tr: 'Mutlu Müşteri' },
  'stats.productDesigns': { en: 'Product Designs', tr: 'Ürün Tasarımı' },
  'stats.retailPartners': { en: 'Retail Partners', tr: 'Perakende Ortağı' },

  // Brands Section
  'brands.title': { en: 'Our Brands', tr: 'Markalarımız' },
  'brands.subtitle': { en: 'Premium quality partners', tr: 'Premium kalite ortakları' },

  // About Us Page
  'about.hero.title': { en: 'About Lunvera Bedding', tr: 'Lunvera Bedding Hakkında' },
  'about.hero.subtitle': { en: 'Crafting Luxury Sleep for Everyone', tr: 'Herkes İçin Lüks Uyku Tasarlamak' },

  'about.story.title': { en: 'Our Story', tr: 'Bizim Hikayemiz' },
  'about.story.paragraph1': { 
    en: 'Lunvera Bedding is a premium bedding manufacturer based in Siteler, Ankara, specializing in luxury mattresses, bases, and headboards that redefine the sleep experience. With a commitment to excellence and innovation, we craft handcrafted sleep solutions designed for comfort, durability, and elegance.',
    tr: 'Lunvera Bedding, Ankara Siteler\'de bulunan ve lüks matraslar, tabanlar ve başlıklar konusunda uzmanlaşmış premium bir yatak üreticisidir. Uyku deneyimini yeniden tanımlayan ürünler sunuyoruz. Mükemmellik ve inovasyona olan bağlılığımızla, konfor, dayanıklılık ve zarafet için tasarlanmış el yapımı uyku çözümleri üretiyoruz.'
  },
  'about.story.paragraph2': { 
    en: 'Our journey began with a simple vision: to provide the perfect sleep experience for everyone. We believe that quality sleep is the foundation of a healthy, fulfilling life. That\'s why we invest in the finest materials, employ advanced manufacturing techniques, and maintain rigorous quality control standards across every product we create.',
    tr: 'Yolculuğumuz basit bir vizyonla başladı: herkes için mükemmel uyku deneyimi sağlamak. Kaliteli uykunun sağlıklı ve tatmin edici bir yaşamın temelini oluşturduğuna inanıyoruz. Bu nedenle en iyi malzemelere yatırım yapıyor, ileri üretim teknikleri kullanıyor ve oluşturduğumuz her ürünün üzerinde katı kalite kontrol standartlarını koruuyoruz.'
  },
  'about.story.paragraph3': { 
    en: 'Located at Demirhendek Cd. No:49, Altındağ / Ankara, our state-of-the-art facility produces a diverse range of mattress models including the Armada Pedli, Momento, Elegans, Conroy, and Life series. Each model is engineered with precision to deliver superior comfort and support, whether you prefer firm support or plush softness.',
    tr: 'Demirhendek Cd. No:49, Altındağ / Ankara\'da bulunan son teknoloji tesisimiz, Armada Pedli, Momento, Elegans, Conroy ve Life serileri de dahil olmak üzere çeşitli yatak modellerini üretmektedir. Her model, sıkı destek veya yumuşak yumuşaklık tercih etseniz de üstün konfor ve destek sağlamak için hassasiyetle tasarlanmıştır.'
  },
  'about.story.paragraph4': { 
    en: 'We serve both retail and wholesale customers, building lasting relationships based on trust, quality, and exceptional service. Our vision is to become a trusted sleep brand not only in Turkey but globally, recognized for our commitment to innovation, sustainability, and customer satisfaction. At Lunvera Bedding, we don\'t just make mattresses—we craft gateways to better sleep and better living.',
    tr: 'Hem perakende hem de toptan müşterilere hizmet veriyor, güven, kalite ve olağanüstü hizmet temelinde uzun süreli ilişkiler kuruyoruz. Vizyonumuz, sadece Türkiye\'de değil küresel olarak, inovasyona, sürdürülebilirliğe ve müşteri memnuniyetine olan bağlılığımızla tanınan güvenilir bir uyku markası olmaktır. Lunvera Bedding\'de sadece yatak yapmıyoruz—daha iyi uyku ve daha iyi yaşamın kapılarını tasarlıyoruz.'
  },

  'about.highlights.title': { en: 'Why Choose Lunvera', tr: 'Neden Lunvera\'yı Seçin' },
  'about.highlights.materials': { en: 'Premium Materials: We source only the finest fabrics, foams, and support systems', tr: 'Premium Malzemeler: Sadece en iyi kumaşları, köpükleri ve destek sistemlerini seçiyoruz' },
  'about.highlights.handcrafted': { en: 'Handcrafted Production: Each mattress is carefully assembled by skilled artisans', tr: 'El Yapımı Üretim: Her yatak yetenekli zanaatçılar tarafından dikkatle monte edilir' },
  'about.highlights.ergonomics': { en: 'Advanced Sleep Ergonomics: Engineered for optimal spinal alignment and pressure relief', tr: 'İleri Uyku Ergonomisi: Optimal omurga hizalaması ve basınç rahatlaması için tasarlanmış' },
  'about.highlights.manufacturing': { en: 'Modern Manufacturing: State-of-the-art techniques ensure consistency and quality', tr: 'Modern Üretim: Son teknoloji teknikler tutarlılık ve kaliteyi sağlar' },
  'about.highlights.team': { en: 'Experienced Team: Decades of expertise in the bedding industry', tr: 'Deneyimli Ekip: Yatak endüstrisinde onlarca yıl deneyim' },

  'about.features.title': { en: 'Our Commitment to Excellence', tr: 'Mükemmelliğe Olan Bağlılığımız' },
  'about.features.subtitle': { en: 'Every detail matters when it comes to your sleep quality. Discover what sets Lunvera apart.', tr: 'Uyku kalitesi söz konusu olduğunda her detay önemlidir. Lunvera\'yı farklı kılan şeyleri keşfedin.' },

  'about.features.luxury': { en: 'Luxury Comfort Engineering', tr: 'Lüks Konfor Mühendisliği' },
  'about.features.luxuryDesc': { en: 'Precision-engineered layers combine premium materials for unparalleled comfort and support', tr: 'Hassas mühendislik katmanları, eşsiz konfor ve destek için premium malzemeleri birleştirir' },

  'about.features.handcrafted': { en: 'Handcrafted Excellence', tr: 'El Yapımı Mükemmellik' },
  'about.features.handcraftedDesc': { en: 'Skilled artisans meticulously craft each mattress with attention to every detail', tr: 'Yetenekli zanaatçılar her detaya dikkat ederek her yatagı titizlikle tasarlar' },

  'about.features.ergonomics': { en: 'Advanced Sleep Ergonomics', tr: 'İleri Uyku Ergonomisi' },
  'about.features.ergonomicsDesc': { en: 'Scientifically designed to support natural spinal alignment and reduce pressure points', tr: 'Doğal omurga hizalamasını desteklemek ve basınç noktalarını azaltmak için bilimsel olarak tasarlanmış' },

  'about.features.modern': { en: 'Modern Production Techniques', tr: 'Modern Üretim Teknikleri' },
  'about.features.modernDesc': { en: 'State-of-the-art manufacturing ensures consistent quality and durability in every product', tr: 'Son teknoloji üretim, her üründe tutarlı kalite ve dayanıklılığı sağlar' },

  'about.features.headboards': { en: 'Elegant Headboard Designs', tr: 'Zarif Başlık Tasarımları' },
  'about.features.headboardsDesc': { en: 'Beautifully crafted headboards that complement any bedroom aesthetic', tr: 'Herhangi bir yatak odası estetiğini tamamlayan güzel tasarlanmış başlıklar' },

  'about.features.quality': { en: 'Quality Control Excellence', tr: 'Kalite Kontrol Mükemmelliği' },
  'about.features.qualityDesc': { en: 'Rigorous testing and inspection at every stage ensures only the best reaches you', tr: 'Her aşamada katı test ve inceleme, sadece en iyisinin size ulaşmasını sağlar' },

  'about.cta.title': { en: 'Ready to Experience Lunvera?', tr: 'Lunvera\'yı Denemeye Hazır mısınız?' },
  'about.cta.subtitle': { en: 'Discover our complete collection of premium mattresses, bases, and headboards designed for your perfect sleep.', tr: 'Mükemmel uykunuz için tasarlanmış premium matraslar, tabanlar ve başlıklardan oluşan tam koleksiyonumuzu keşfedin.' },
  'about.cta.button': { en: 'Explore Our Collection', tr: 'Koleksiyonumuzu Keşfedin' },

  // Footer
  'footer.tagline': { 
    en: 'Crafting premium bedding solutions for the perfect sleep experience since 2009.',
    tr: '2009 yılından beri mükemmel uyku deneyimi için premium yatak çözümleri sunuyoruz.'
  },
  'footer.quickLinks': { en: 'Quick Links', tr: 'Hızlı Bağlantılar' },
  'footer.contact': { en: 'Contact Us', tr: 'Bize Ulaşın' },
  'footer.address': { en: '123 Luxury Avenue, Istanbul, Turkey', tr: '123 Lüks Caddesi, İstanbul, Türkiye' },
  'footer.phone': { en: '+90 (212) 123 4567', tr: '+90 (212) 123 4567' },
  'footer.email': { en: 'info@lunverabedding.com', tr: 'info@lunverabedding.com' },
  'footer.copyright': { en: 'All rights reserved.', tr: 'Tüm hakları saklıdır.' },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'tr'>('tr');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <I18nContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}