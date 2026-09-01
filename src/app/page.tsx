import Image from 'next/image';
import HeroSection from '@/components/hero/hero-section';
import FeaturedJobs from '@/components/featured-jobs/featured-jobs';
import StatsSection from '@/components/stats/stats-section';
import HowItWorks from '@/components/how-it-works/how-it-works';
import TopCompanies from '@/components/top-companies/top-companies';
import FinalCta from '@/components/final-cta/final-cta';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturedJobs />
      <HowItWorks />
      <TopCompanies />
      <FinalCta />
    </main>
  );
}
