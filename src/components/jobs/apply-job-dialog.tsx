'use client';

import { useEffect, useState } from 'react';
import { Loader2, Send } from 'lucide-react';

import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type ApplyJobDialogProps = {
  jobId: string;
};

export default function ApplyJobDialog({ jobId }: ApplyJobDialogProps) {
  const [open, setOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(true);

  async function checkApplication() {
    try {
      const response = await fetch(
        `/api/applications/check?jobId=${encodeURIComponent(jobId)}`
      );

      const data = await response.json();

      if (response.ok) {
        setApplied(data.applied);
      }
    } catch (error) {
      console.error('Check application error:', error);
    } finally {
      setCheckingApplication(false);
    }
  }

  useEffect(() => {
    checkApplication();
  }, [jobId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          coverLetter: coverLetter.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.add({
          title: data.message || 'Failed to apply for this job',
        });

        if (response.status === 409) {
          setOpen(false);
          setCoverLetter('');
          setApplied(true);
        }

        return;
      }

      toast.add({
        title: data.message || 'Application submitted successfully!',
      });

      setCoverLetter('');
      setOpen(false);
      setApplied(true);
    } catch (error) {
      toast.add({
        title: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {checkingApplication ? (
        <Button
          size="lg"
          disabled
          className="w-full sm:w-auto px-8 font-semibold gap-2"
        >
          <Loader2 className="size-4 animate-spin" />
          <span>Checking...</span>
        </Button>
      ) : applied ? (
        <div className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-green-100 px-5 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
          <span>✓</span>
          <span>Applied</span>
        </div>
      ) : (
        <DialogTrigger
          render={
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 font-semibold gap-2 shadow-xs"
            />
          }
        >
          <Send className="size-4" />
          <span>Apply Now</span>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader className="space-y-1.5">
            <DialogTitle className="text-xl">
              Apply for this position
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Add a brief cover letter to highlight your relevant experience and
              introduce yourself to the hiring team.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="cover-letter"
                className="text-xs font-semibold text-foreground"
              >
                Cover Letter / Pitch
              </label>
              <span className="text-[11px] font-normal text-muted-foreground">
                Optional
              </span>
            </div>

            <Textarea
              id="cover-letter"
              placeholder="Tell the employer why you're a great fit for this role..."
              value={coverLetter}
              onChange={(event) => setCoverLetter(event.target.value)}
              rows={5}
              className="resize-none focus-visible:ring-1 text-sm leading-relaxed"
            />
            <p className="text-[11px] text-muted-foreground">
              Tip: Keep it concise and specific to this role.
            </p>
          </div>

          <DialogFooter className="gap-2 pt-3 sm:gap-0">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                />
              }
            >
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto min-w-[130px] gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
