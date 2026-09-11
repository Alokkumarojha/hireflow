import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  FileText,
  Mail,
  MapPin,
  UserRound,
} from 'lucide-react';

import { getEmployerApplicationById } from '@/lib/applications';
import { requireRole } from '@/lib/current-user';
import ApplicationStatus from '@/components/employer/application-status';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatEmploymentType(type: string) {
  return type
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function ApplicationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireRole('EMPLOYER');

  if (!user) {
    redirect('/');
  }

  const { id } = await params;

  const application = await getEmployerApplicationById(id, user.id);

  if (!application) {
    redirect('/dashboard/employer');
  }

  const candidateName = application.candidate.name || 'Unnamed Candidate';

  return (
    <main className="container mx-auto px-4 pt-24 pb-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={
            <Link href="/dashboard/employer">
              <ArrowLeft className="mr-2 size-4" />
              Back to Applications
            </Link>
          }
        />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-xl font-bold text-primary">
              {candidateName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {candidateName}
              </h1>

              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-4 text-primary" />
                {application.candidate.email}
              </div>
            </div>
          </div>

          <ApplicationStatus
            applicationId={application.id}
            status={application.status}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Application Info */}
          <section className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-2xs backdrop-blur-md sm:p-6">
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-primary" />

              <h2 className="text-lg font-bold">Application Details</h2>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4 text-primary" />

              <span>Applied on {formatDate(application.createdAt)}</span>
            </div>
          </section>

          {/* Cover Letter */}
          <section className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-2xs backdrop-blur-md sm:p-6">
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-primary" />

              <h2 className="text-lg font-bold">Cover Letter</h2>
            </div>

            {application.coverLetter ? (
              <div className="mt-5 rounded-xl border border-border/50 bg-muted/30 p-4">
                <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                  {application.coverLetter}
                </p>
              </div>
            ) : (
              <p className="mt-5 text-sm text-muted-foreground">
                No cover letter was provided with this application.
              </p>
            )}
          </section>
        </div>

        {/* Job Information */}
        <aside>
          <section className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-2xs backdrop-blur-md sm:p-6">
            <div className="flex items-center gap-2">
              <Briefcase className="size-5 text-primary" />

              <h2 className="text-lg font-bold">Job Information</h2>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Position
                </p>

                <Link
                  href={`/jobs/${application.job.id}`}
                  className="mt-1 block font-semibold text-primary hover:underline"
                >
                  {application.job.title}
                </Link>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {application.job.location}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Employment Type
                </p>

                <Badge variant="secondary" className="mt-2">
                  {formatEmploymentType(application.job.employmentType)}
                </Badge>
              </div>

              {application.job.salary && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Salary
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {application.job.salary}
                  </p>
                </div>
              )}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
