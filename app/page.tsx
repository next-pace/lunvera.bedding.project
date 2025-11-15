import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductGrid } from '@/components/ProductGrid';
import { CatalogSection } from '@/components/CatalogSection';
import { BrandsSection } from '@/components/BrandsSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductGrid />
      <CatalogSection />
      <BrandsSection />
      <Footer />
    </main>
  );
}
