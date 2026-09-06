'use client';

import { useEffect, useState } from 'react';
import CreateJobForm from '@/components/employer/create-job-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Plus,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  XCircle,
  Loader2,
  MoreVertical,
} from 'lucide-react';

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  salary: string | null;
  isActive: boolean;
  createdAt: string;
};

export default function MyJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'ALL' | 'ACTIVE' | 'INACTIVE'
  >('ALL');

  async function fetchJobs() {
    try {
      const response = await fetch('/api/jobs/my-jobs');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch jobs');
      }

      setJobs(data.jobs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === 'ACTIVE') return matchesSearch && job.isActive;
    if (statusFilter === 'INACTIVE') return matchesSearch && !job.isActive;
    return matchesSearch;
  });

  const activeCount = jobs.filter((j) => j.isActive).length;
  const inactiveCount = jobs.length - activeCount;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border rounded-xl bg-card p-12 text-center shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
        <p className="text-sm font-medium text-muted-foreground">
          Fetching your job postings...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-center">
        <p className="text-sm font-semibold text-destructive">{error}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchJobs}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Edit Job Modal */}
      <Dialog
        open={editingJob !== null}
        onOpenChange={(open) => {
          if (!open) setEditingJob(null);
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Job Position</DialogTitle>
          </DialogHeader>

          {editingJob && (
            <CreateJobForm
              job={editingJob}
              onSuccess={() => {
                setEditingJob(null);
                fetchJobs();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Create Job Modal */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Post New Job</DialogTitle>
          </DialogHeader>

          <CreateJobForm
            onSuccess={() => {
              setIsCreateDialogOpen(false);
              fetchJobs();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Top Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Job Listings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, update, and monitor candidate listings across your
            organization.
          </p>
        </div>

        <Button
          type="button"
          size="lg"
          onClick={() => setIsCreateDialogOpen(true)}
          className="shadow-sm gap-2"
        >
          <Plus className="h-4 w-4" /> Post a New Job
        </Button>
      </div>

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Posted
            </p>
            <p className="text-2xl font-bold mt-1">{jobs.length}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <Briefcase className="h-5 w-5 text-foreground" />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Active Listings
            </p>
            <p className="text-2xl font-bold mt-1 text-emerald-600">
              {activeCount}
            </p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Inactive / Closed
            </p>
            <p className="text-2xl font-bold mt-1 text-muted-foreground">
              {inactiveCount}
            </p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <XCircle className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-card p-2 rounded-xl border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by role or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent pl-9 pr-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-1 border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-2">
          {(['ALL', 'ACTIVE', 'INACTIVE'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === filter
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {filter.charAt(0) + filter.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center bg-card">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
          <h3 className="text-lg font-semibold">No jobs found</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
            {searchQuery
              ? 'No listings match your search criteria. Try clearing filters.'
              : 'You have not posted any job listings yet.'}
          </p>
          {!searchQuery && (
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              variant="outline"
              className="mt-4 gap-2"
            >
              <Plus className="h-4 w-4" /> Create Your First Job
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="group rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-md hover:border-primary/30 relative"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {job.title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        job.isActive
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                          : 'bg-muted text-muted-foreground border'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          job.isActive
                            ? 'bg-emerald-500'
                            : 'bg-muted-foreground'
                        }`}
                      />
                      {job.isActive ? 'Active' : 'Closed'}
                    </span>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {job.employmentType.replace('_', ' ')}
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1 text-foreground font-semibold">
                        <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                        {job.salary}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Action Button */}
                <div className="flex items-center gap-2 self-end sm:self-start">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingJob(job)}
                    className="gap-1.5 shadow-none hover:border-primary hover:text-primary transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                </div>
              </div>

              {/* Job Description Preview */}
              <p className="mt-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed border-t pt-4">
                {job.description}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
