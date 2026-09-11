'use client';

import { useState } from 'react';
import { toast } from '@/components/ui/toast';
import { Loader2 } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ApplicationStatus =
  | 'PENDING'
  | 'REVIEWING'
  | 'SHORTLISTED'
  | 'REJECTED'
  | 'HIRED';

interface ApplicationStatusProps {
  applicationId: string;
  status: ApplicationStatus;
}

const statusConfig: Record<
  ApplicationStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  PENDING: {
    label: 'Pending',
    badgeClass:
      'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 focus:ring-amber-500/30',
    dotClass: 'bg-amber-500',
  },
  REVIEWING: {
    label: 'Reviewing',
    badgeClass:
      'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 focus:ring-blue-500/30',
    dotClass: 'bg-blue-500',
  },
  SHORTLISTED: {
    label: 'Shortlisted',
    badgeClass:
      'border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 focus:ring-purple-500/30',
    dotClass: 'bg-purple-500',
  },
  HIRED: {
    label: 'Hired',
    badgeClass:
      'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 focus:ring-emerald-500/30',
    dotClass: 'bg-emerald-500',
  },
  REJECTED: {
    label: 'Rejected',
    badgeClass:
      'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 focus:ring-rose-500/30',
    dotClass: 'bg-rose-500',
  },
};

export default function ApplicationStatus({
  applicationId,
  status,
}: ApplicationStatusProps) {
  const [currentStatus, setCurrentStatus] = useState<ApplicationStatus>(status);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleStatusChange(value: string | null) {
    if (!value || value === currentStatus) return;

    const newStatus = value as ApplicationStatus;

    try {
      setIsUpdating(true);

      const response = await fetch(
        `/api/applications/${applicationId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update status');
      }

      setCurrentStatus(newStatus);
      toast.add({
        title: 'Status Updated',
        description: `Application status changed to ${statusConfig[newStatus].label}.`,
        type: 'success',
      });
    } catch (error) {
      console.error('Status update error:', error);
      toast.add({
        title: 'Update Failed',
        description: 'Failed to update application status.',
        type: 'error',
      });
    } finally {
      setIsUpdating(false);
    }
  }

  const activeConfig = statusConfig[currentStatus];

  return (
    <Select
      value={currentStatus}
      onValueChange={handleStatusChange}
      disabled={isUpdating}
    >
      <SelectTrigger
        className={`h-9 w-[150px] shrink-0 gap-2 rounded-xl border text-xs font-semibold transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 ${
          activeConfig?.badgeClass || ''
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          {isUpdating ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <span
              className={`size-2 shrink-0 rounded-full ${
                activeConfig?.dotClass || 'bg-muted-foreground'
              }`}
            />
          )}
          <SelectValue placeholder="Select status" />
        </div>
      </SelectTrigger>

      <SelectContent
        alignItemWithTrigger={false}
        side="bottom"
        align="start"
        sideOffset={6}
        className="w-[160px] min-w-[160px] rounded-xl border-border/60 bg-popover p-1 shadow-lg"
      >
        {(Object.keys(statusConfig) as ApplicationStatus[]).map((key) => {
          const config = statusConfig[key];
          return (
            <SelectItem
              key={key}
              value={key}
              className="cursor-pointer rounded-lg text-xs font-medium focus:bg-accent"
            >
              <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${config.dotClass}`} />
                <span>{config.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
