'use client';

import HeroSection from '@/components/hero/hero-section';
import FeaturedJobs from '@/components/featured-jobs/featured-jobs';
import StatsSection from '@/components/stats/stats-section';
import HowItWorks from '@/components/how-it-works/how-it-works';
import TopCompanies from '@/components/top-companies/top-companies';
import FinalCta from '@/components/final-cta/final-cta';
import FadeInSection from '@/components/common/fade-in-section';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />

      <FadeInSection>
        <StatsSection />
      </FadeInSection>

      <FadeInSection>
        <FeaturedJobs />
      </FadeInSection>

      <FadeInSection>
        <HowItWorks />
      </FadeInSection>

      <FadeInSection>
        <TopCompanies />
      </FadeInSection>

      <FadeInSection>
        <FinalCta />
      </FadeInSection>
    </main>
  );
}
