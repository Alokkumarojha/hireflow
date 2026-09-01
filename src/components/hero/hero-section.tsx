import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JobSearch from '@/components/job-search/job-search';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium">
            Find opportunities that match your potential
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find your next{' '}
            <span className="text-primary">career opportunity</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Discover meaningful jobs from companies looking for talented people.
            Build your profile, find the right opportunity, and take the next
            step in your career.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3        sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/jobs" />}
            >
              <Search className="mr-2 size-4" />
              Browse Jobs
            </Button>

            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/employers" />}
            >
              Post a Job
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
          <JobSearch />
        </div>
      </div>
    </section>
  );
}
