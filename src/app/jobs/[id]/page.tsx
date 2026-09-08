import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  MapPin,
  Wallet,
} from 'lucide-react';

import { getJobById } from '@/lib/jobs';
import { Button } from '@/components/ui/button';

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;

  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-muted/20 pb-16 pt-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          nativeButton={false}
          render={<a href="/jobs" />}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to jobs
        </Button>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          {/* Header */}
          <div className="border-b p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <BriefcaseBusiness className="size-6 text-primary" />
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  {job.title}
                </h1>

                <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                  <Building2 className="size-4" />
                  <span>{job.employer.name || 'Company'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="size-4" />
                Active
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div className="grid gap-4 border-b p-6 sm:grid-cols-3 sm:p-8">
            <div className="rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                Location
              </div>

              <p className="mt-2 font-medium">{job.location}</p>
            </div>

            <div className="rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BriefcaseBusiness className="size-4" />
                Employment type
              </div>

              <p className="mt-2 font-medium">{job.employmentType}</p>
            </div>

            <div className="rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="size-4" />
                Salary
              </div>

              <p className="mt-2 font-medium">
                {job.salary || 'Not specified'}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Job Description</h2>

            <div className="mt-4 whitespace-pre-wrap leading-7 text-muted-foreground">
              {job.description}
            </div>
          </div>

          {/* Apply */}
          <div className="border-t bg-muted/30 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold">Interested in this position?</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Apply now and take the next step in your career.
                </p>
              </div>

              <Button size="lg">Apply Now</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
