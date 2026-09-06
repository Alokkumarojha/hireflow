import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/current-user';
import MyJobs from '@/components/employer/my-jobs';
import { Mail, ShieldCheck, Building2, Sparkles } from 'lucide-react';

export default async function EmployerDashboard() {
  const user = await requireRole('EMPLOYER');

  if (!user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-16 pt-16">
      {/* Top Banner Header */}
      <div className="border-b bg-card shadow-xs">
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  <Building2 className="h-3.5 w-3.5" /> Employer Portal
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Welcome back, {user.name || 'Employer'}!
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your posted jobs, review candidate interactions, and
                track recruitment metrics.
              </p>
            </div>

            {/* Profile Info Badge */}
            <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-background/50 p-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>{user.email}</span>
              </div>
              <div className="h-4 w-[1px] bg-border hidden sm:block" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{user.role}</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Main Dashboard Body */}
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <MyJobs />
      </main>
    </div>
  );
}
