import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function FinalCta() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border bg-muted/40 px-6 py-16 text-center sm:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-medium text-primary">
              Your next opportunity is closer than you think
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to take the next step?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Whether you're looking for your next career opportunity or
              building your team, HireFlow helps you move forward.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/jobs" />}
              >
                Explore Jobs
                <ArrowRight className="ml-2 size-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/employers" />}
              >
                Hire Talent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
