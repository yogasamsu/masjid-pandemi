import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import BackgroundMethodologySection from '@/components/BackgroundMethodologySection';
import ContextSection from '@/components/ContextSection';
import Finding1Section from '@/components/Finding1Section';
import Finding2Section from '@/components/Finding2Section';
import Finding3Section from '@/components/Finding3Section';
import MemoriamSection from '@/components/MemoriamSection';
import RecommendationSection from '@/components/RecommendationSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <ScrollProgress />
      <HeroSection />
      <BackgroundMethodologySection />
      <ContextSection />
      <Finding1Section />
      <Finding2Section />
      <Finding3Section />
      <MemoriamSection />
      <RecommendationSection />
      <FooterSection />
    </main>
  );
}
