import JobCard from '@/components/featured-jobs/job-card';
import { getActiveJobs } from '@/lib/jobs';
import { Briefcase, Search, MapPin, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Job = {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  salary?: string | null;
  employer: {
    name: string | null;
  };
};

export default async function JobsPage() {
  const jobs: Job[] = await getActiveJobs();

  return (
    <main className="min-h-screen bg-background pb-20 pt-24">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-primary/5 via-muted/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Explore Top Tech Opportunities</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Find your next <span className="text-primary">dream role</span>
            </h1>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Browse actively hiring positions posted by top companies on
              HireFlow.
            </p>
          </div>

          {/* Job Count Badge */}
          <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2.5 shadow-2xs">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              Active Listings:
            </span>
            <span className="text-sm font-bold text-foreground">
              {jobs.length}
            </span>
          </div>
        </div>

        {/* Quick Filter & Search Bar Layout */}
        <div className="mt-8 grid gap-3 rounded-2xl border bg-card/80 p-3 shadow-xs backdrop-blur-md sm:grid-cols-12">
          <div className="relative sm:col-span-6">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by job title or keyword..."
              className="h-11 border-none bg-muted/40 pl-10 text-sm shadow-none focus-visible:ring-1"
            />
          </div>

          <div className="relative sm:col-span-4">
            <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="City, state, or remote"
              className="h-11 border-none bg-muted/40 pl-10 text-sm shadow-none focus-visible:ring-1"
            />
          </div>

          <button
            type="button"
            className="flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 sm:col-span-2"
          >
            Search
          </button>
        </div>

        {/* Job Grid / Empty State */}
        <div className="mt-10">
          {jobs.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/50 p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No active jobs found
              </h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                We couldn't find any active job postings right now. Check back
                soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  company={job.employer?.name || 'Verified Employer'}
                  location={job.location}
                  type={job.employmentType}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
