import { getEmployerApplications } from '@/lib/applications';
import { requireRole } from '@/lib/current-user';
import { redirect } from 'next/navigation';
import ApplicationStatus from '@/components/employer/application-status';
import Link from 'next/link';
import {
  CalendarDays,
  Mail,
  UserRound,
  Briefcase,
  FileText,
  ExternalLink,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default async function Applications() {
  const user = await requireRole('EMPLOYER');

  if (!user) {
    redirect('/');
  }

  const applications = await getEmployerApplications(user.id);

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Received Applications
            </h2>
            {applications.length > 0 && (
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/10 font-semibold text-primary"
              >
                {applications.length} Total
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Review candidate profiles, cover letters, and track application
            statuses.
          </p>
        </div>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-border/80 bg-card/60 p-8 text-center backdrop-blur-xl sm:p-12">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-muted/60 text-muted-foreground shadow-2xs">
            <Users className="size-7 text-primary/80" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-foreground">
            No applications received yet
          </h3>

          <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Candidates who apply to your posted job listings will appear here.
            Make sure your active job postings are visible!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-5 shadow-2xs backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-6"
            >
              {/* Subtle top accent bar */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                {/* Main Info Wrapper */}
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  {/* Candidate Avatar Placeholder */}
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary font-bold shadow-2xs">
                    {application.candidate?.name ? (
                      application.candidate.name.charAt(0).toUpperCase()
                    ) : (
                      <UserRound className="size-6" />
                    )}
                  </div>

                  <div className="space-y-3 min-w-0 flex-1">
                    {/* Candidate Name & Email */}
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {application.candidate?.name || 'Unnamed Candidate'}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Mail className="size-3.5 text-primary/80" />
                        <span className="truncate">
                          {application.candidate.email}
                        </span>
                      </div>
                    </div>

                    {/* Applied Job Info & Date Badges */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground border-y border-border/40 py-2.5">
                      <div className="flex items-center gap-1.5 font-semibold text-foreground">
                        <Briefcase className="size-3.5 text-primary" />
                        <span>Applied for:</span>
                        <Link
                          href={`/jobs/${application.job.id}`}
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          {application.job.title}
                          <ExternalLink className="size-3" />
                        </Link>
                      </div>

                      <div className="flex items-center gap-1.5 font-medium">
                        <CalendarDays className="size-3.5 text-muted-foreground" />
                        <span>
                          Applied on {formatDate(application.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Cover Letter Section */}
                    {application.coverLetter && (
                      <div className="rounded-xl border border-border/50 bg-muted/40 p-3.5 text-xs">
                        <div className="flex items-center gap-1.5 font-semibold text-foreground/90">
                          <FileText className="size-3.5 text-primary" />
                          <span>Cover Letter</span>
                        </div>
                        <p className="mt-1.5 leading-relaxed text-muted-foreground line-clamp-3 hover:line-clamp-none transition-all">
                          "{application.coverLetter}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge Component */}
                <div className="flex items-center justify-between border-t border-border/40 pt-3 lg:border-t-0 lg:pt-0 shrink-0">
                  <ApplicationStatus
                    applicationId={application.id}
                    status={application.status}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={
                      <Link
                        href={`/dashboard/employer/applications/${application.id}`}
                        className={cn(
                          buttonVariants({ variant: 'outline', size: 'sm' }),
                          'h-9 gap-1.5 rounded-xl border-border/60 bg-background/50 px-3 text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground hover:shadow-sm'
                        )}
                      >
                        <span>View Application</span>
                        <ExternalLink className="size-3.5 text-muted-foreground/70" />
                      </Link>
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
