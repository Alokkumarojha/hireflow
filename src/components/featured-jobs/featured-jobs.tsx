import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import JobCard from '@/components/featured-jobs/job-card';

const featuredJobs = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    company: 'TechNova',
    location: 'Bangalore, India',
    type: 'Full-time',
  },
  {
    id: 'fullstack-engineer',
    title: 'Full Stack Engineer',
    company: 'CloudScale',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    company: 'DesignFlow',
    location: 'Mumbai, India',
    type: 'Hybrid',
  },
];

export default function FeaturedJobs() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-primary">
              Featured opportunities
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Find your next opportunity
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Explore some of the latest opportunities from companies looking
              for talented professionals alok.
            </p>
          </div>

          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/jobs" />}
          >
            View all jobs
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>

        {/* Jobs Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
}
