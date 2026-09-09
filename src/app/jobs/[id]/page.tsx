import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock,
  MapPin,
  Share2,
  Wallet,
} from 'lucide-react';

import { getJobById } from '@/lib/jobs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { getCurrentUser } from '@/lib/current-user';
import ApplyJobDialog from '@/components/jobs/apply-job-dialog';

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;

  const user = await getCurrentUser();

  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pb-20 pt-24">
      {/* Top subtle glow pattern */}
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-primary/5 via-muted/20 to-transparent" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigation & Action Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            nativeButton={false}
            render={<Link href="/jobs" />}
          >
            <ArrowLeft className="size-4" />
            <span>Back to jobs</span>
          </Button>

          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Share2 className="size-3.5" />
            <span>Share Job</span>
          </Button>
        </div>

        {/* Main Job Card Container */}
        <div className="overflow-hidden rounded-2xl border bg-card shadow-xs">
          {/* Header Banner Section */}
          <div className="border-b bg-card/50 p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent text-primary shadow-2xs">
                  <BriefcaseBusiness className="size-7" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {job.employer?.name || 'Verified Employer'}
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {job.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="size-3.5 text-muted-foreground/70" />
                      {job.employer?.name || 'Company'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5 text-muted-foreground/70" />
                      Posted recently
                    </span>
                  </div>
                </div>
              </div>

              <div className="self-start sm:self-auto">
                <Badge
                  variant="outline"
                  className="gap-1.5 border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 className="size-3.5" />
                  <span>Actively Hiring</span>
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid gap-4 border-b bg-muted/20 p-6 sm:grid-cols-3 sm:p-8">
            <div className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-2xs">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <MapPin className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Location
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {job.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-2xs">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <BriefcaseBusiness className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Employment Type
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {job.employmentType}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-2xs">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Wallet className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Salary Range
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {job.salary || 'Competitive / Unspecified'}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Job Description Section */}
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              About the Role
            </h2>

            <div className="prose prose-neutral dark:prose-invert mt-4 max-w-none text-sm leading-relaxed text-muted-foreground sm:text-base">
              <div className="whitespace-pre-wrap leading-7">
                {job.description}
              </div>
            </div>
          </div>

          {/* Apply Banner / Call To Action */}
          <div className="border-t bg-card/80 p-6 backdrop-blur-xs sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Ready to apply for this position?
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                  Submit your application through HireFlow today.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <ApplyJobDialog jobId={job.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
