import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  Briefcase,
  Clock,
  Search,
  CheckCircle2,
  XCircle,
  Trophy,
  UserCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

import { requireRole } from '@/lib/current-user';
import ApplicationCard from '@/components/applications/application-card';
import { getCandidateApplications } from '@/lib/applications';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function CandidateDashboard() {
  const user = await requireRole('CANDIDATE');

  if (!user) {
    redirect('/');
  }

  const applications = await getCandidateApplications(user.id);

  const applicationStats = {
    total: applications.length,
    pending: applications.filter(
      (application) => application.status === 'PENDING'
    ).length,
    reviewing: applications.filter(
      (application) => application.status === 'REVIEWING'
    ).length,
    shortlisted: applications.filter(
      (application) => application.status === 'SHORTLISTED'
    ).length,
    rejected: applications.filter(
      (application) => application.status === 'REJECTED'
    ).length,
    hired: applications.filter((application) => application.status === 'HIRED')
      .length,
  };

  return (
    <main className="min-h-screen bg-background pb-20 pt-24">
      {/* Subtle Gradient Backdrop */}
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-primary/5 via-muted/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* User Welcome & Profile Bar */}
        <div className="flex flex-col gap-4 border-b pb-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="gap-1 border-primary/20 bg-primary/10 text-primary"
              >
                <Sparkles className="size-3" />
                <span>Candidate Portal</span>
              </Badge>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back, {user.name || 'Candidate'}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your job applications and recruitment status in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/jobs" />}
              className="gap-2 shadow-xs"
            >
              <Search className="size-4" />
              <span>Explore New Jobs</span>
            </Button>
          </div>
        </div>

        {/* Dynamic Analytics Grid */}
        <section className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {/* Total Applications */}
            <div className="rounded-xl border bg-card p-4 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold">Total Applied</span>
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Briefcase className="size-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">
                {applicationStats.total}
              </p>
            </div>

            {/* Pending */}
            <div className="rounded-xl border bg-card p-4 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold">Pending</span>
                <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                  <Clock className="size-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">
                {applicationStats.pending}
              </p>
            </div>

            {/* Reviewing */}
            <div className="rounded-xl border bg-card p-4 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold">Under Review</span>
                <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
                  <UserCheck className="size-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">
                {applicationStats.reviewing}
              </p>
            </div>

            {/* Shortlisted */}
            <div className="rounded-xl border bg-card p-4 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold">Shortlisted</span>
                <div className="rounded-lg bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400">
                  <Trophy className="size-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">
                {applicationStats.shortlisted}
              </p>
            </div>

            {/* Hired */}
            <div className="rounded-xl border bg-card p-4 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold">Hired</span>
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">
                {applicationStats.hired}
              </p>
            </div>

            {/* Rejected */}
            <div className="rounded-xl border bg-card p-4 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold">Not Selected</span>
                <div className="rounded-lg bg-rose-500/10 p-2 text-rose-600 dark:text-rose-400">
                  <XCircle className="size-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">
                {applicationStats.rejected}
              </p>
            </div>
          </div>
        </section>

        {/* Applications List Section */}
        <section className="mt-10 space-y-6">
          {/* Section Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  My Applications
                </h2>
                {applications.length > 0 && (
                  <Badge
                    variant="outline"
                    className="border-primary/20 bg-primary/10 font-semibold text-primary"
                  >
                    {applications.length}{' '}
                    {applications.length === 1 ? 'Submission' : 'Submissions'}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Track real-time status updates and notes from hiring teams.
              </p>
            </div>

            {applications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href="/jobs" />}
                className="gap-2 self-start text-xs font-semibold sm:self-auto"
              >
                <Search className="size-3.5" />
                <span>Find More Jobs</span>
              </Button>
            )}
          </div>

          {/* Content Area */}
          {applications.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-border/80 bg-card/60 p-8 text-center backdrop-blur-xl sm:p-12">
              {/* Ambient background glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-muted/60 text-muted-foreground shadow-2xs">
                <Building2 className="size-7 text-primary/80" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-foreground">
                No job applications yet
              </h3>

              <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
                You haven't applied for any positions on HireFlow yet. Explore
                active opportunities and start trackable applications today!
              </p>

              <Button
                nativeButton={false}
                render={<Link href="/jobs" />}
                className="mt-6 gap-2 px-6 shadow-xs"
                size="sm"
              >
                <Search className="size-4" />
                <span>Browse Active Jobs</span>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
