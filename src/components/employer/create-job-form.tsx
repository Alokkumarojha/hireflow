'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Power,
} from 'lucide-react';

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  salary: string | null;
  isActive: boolean;
};

type CreateJobFormProps = {
  job?: Job;
  onSuccess?: () => void;
};

const employmentTypes = [
  { value: 'FULL_TIME', label: 'Full Time' },
  { value: 'PART_TIME', label: 'Part Time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'INTERNSHIP', label: 'Internship' },
  { value: 'FREELANCE', label: 'Freelance' },
];

export default function CreateJobForm({ job, onSuccess }: CreateJobFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: job?.title || '',
    description: job?.description || '',
    location: job?.location || '',
    employmentType: job?.employmentType || 'FULL_TIME',
    salary: job?.salary || '',
    isActive: job?.isActive ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = job ? `/api/jobs/${job.id}` : '/api/jobs';
      const method = job ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save job details');
      }

      setSuccess(
        job ? 'Job updated successfully!' : 'Job created successfully!'
      );

      router.refresh(); // Sync UI with latest server data
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pt-1">
      {/* Alert Banners */}
      {error && (
        <div className="flex items-center gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs font-medium text-destructive animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Job Title */}
      <div className="space-y-1.5">
        <label
          htmlFor="title"
          className="text-xs font-semibold text-foreground flex items-center gap-1.5"
        >
          <Briefcase className="h-3.5 w-3.5 text-muted-foreground" /> Job Title
        </label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. Senior Frontend Engineer"
          value={formData.title}
          onChange={handleChange}
          required
          className="h-10 focus-visible:ring-1"
        />
      </div>

      {/* Two Grid Inputs: Location & Employment Type */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="location"
            className="text-xs font-semibold text-foreground flex items-center gap-1.5"
          >
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> Location
          </label>
          <Input
            id="location"
            name="location"
            placeholder="e.g. Remote / Bengaluru, IN"
            value={formData.location}
            onChange={handleChange}
            required
            className="h-10 focus-visible:ring-1"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="employmentType"
            className="text-xs font-semibold text-foreground flex items-center gap-1.5"
          >
            <Clock className="h-3.5 w-3.5 text-muted-foreground" /> Employment
            Type
          </label>
          <select
            id="employmentType"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {employmentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Salary & Status Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Salary Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="salary"
            className="text-xs font-semibold text-foreground flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />{' '}
              Salary Offer
            </span>
            <span className="text-[11px] font-normal text-muted-foreground">
              (Optional)
            </span>
          </label>
          <Input
            id="salary"
            name="salary"
            placeholder="e.g. ₹12 - 18 LPA or $80k - $100k"
            value={formData.salary || ''}
            onChange={handleChange}
            className="h-10 focus-visible:ring-1"
          />
        </div>

        {/* Status Toggle Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Power className="h-3.5 w-3.5 text-muted-foreground" /> Visibility
            Status
          </label>
          <div
            onClick={() =>
              setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
            }
            className={`flex h-10 cursor-pointer items-center justify-between rounded-md border px-3 transition-colors ${
              formData.isActive
                ? 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20'
                : 'border-muted bg-muted/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  formData.isActive ? 'bg-emerald-500' : 'bg-gray-400'
                }`}
              />
              <span className="text-xs font-medium">
                {formData.isActive ? 'Active Listing' : 'Inactive / Hidden'}
              </span>
            </div>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
              }
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
            />
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="space-y-1.5">
        <label
          htmlFor="description"
          className="text-xs font-semibold text-foreground flex items-center gap-1.5"
        >
          <FileText className="h-3.5 w-3.5 text-muted-foreground" /> Job
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="Outline key responsibilities, qualifications, tech stack, and benefits..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
          className="resize-y min-h-[120px] focus-visible:ring-1 text-sm leading-relaxed"
        />
      </div>

      {/* Action Submit Button */}
      <div className="pt-2 flex justify-end gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto min-w-[150px] gap-2 shadow-xs"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : job ? (
            'Save Changes'
          ) : (
            'Publish Job Position'
          )}
        </Button>
      </div>
    </form>
  );
}
