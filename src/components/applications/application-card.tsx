import Link from 'next/link';
import {
  MapPin,
  BriefcaseBusiness,
  CalendarDays,
  ArrowUpRight,
  Building2,
  Wallet,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type ApplicationCardProps = {
  application: {
    id: string;
    status: string;
    createdAt: Date | string;
    job: {
      id: string;
      title: string;
      location: string;
      employmentType: string;
      salary: string | null;
      isActive: boolean;
      employer: {
        name: string | null;
      };
    };
  };
};

// Modern Glassmorphic Badge Styles
const statusStyles: Record<string, string> = {
  PENDING:
    'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
  REVIEWING:
    'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400',
  SHORTLISTED:
    'border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400',
  REJECTED:
    'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400',
  HIRED:
    'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
};

function formatStatus(status: string) {
  if (!status) return '';
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const { job } = application;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-5 shadow-2xs backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-6">
      {/* Top Subtle Hover Accent Bar */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          {/* Tinted Company Icon Box */}
          <div className="hidden size-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-2xs sm:flex">
            <Building2 className="size-6" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {job.title}
              </h3>
            </div>

            <p className="text-sm font-medium text-muted-foreground">
              {job.employer?.name || 'Verified Employer'}
            </p>

            {/* Quick Job Badges Grid */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPin className="size-3.5 text-primary/80" />
                {job.location}
              </span>

              <span className="inline-flex items-center gap-1.5 font-medium">
                <BriefcaseBusiness className="size-3.5 text-primary/80" />
                {formatStatus(job.employmentType)}
              </span>

              {job.salary && (
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
                  <Wallet className="size-3.5 text-emerald-500" />
                  {job.salary}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status Badge with Border Glow */}
        <div className="self-start sm:self-auto">
          <Badge
            variant="outline"
            className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
              statusStyles[application.status] || ''
            }`}
          >
            {formatStatus(application.status)}
          </Badge>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-5 flex flex-col gap-3 border-t border-border/50 pt-4 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-1.5 font-medium text-muted-foreground">
          <CalendarDays className="size-3.5" />
          Applied on {formatDate(application.createdAt)}
        </span>

        <Button
          nativeButton={false}
          render={<Link href={`/jobs/${job.id}`} />}
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs font-semibold shadow-2xs transition-all group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground"
        >
          <span>View Job Details</span>
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </div>
    </div>
  );
}
