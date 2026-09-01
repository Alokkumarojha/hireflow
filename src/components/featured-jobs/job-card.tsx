import Link from 'next/link';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  MapPin,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

type JobCardProps = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
};

export default function JobCard({
  id,
  title,
  company,
  location,
  type,
}: JobCardProps) {
  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="size-4" />
              <span>{company}</span>
            </div>
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            <BriefcaseBusiness className="size-5" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="size-4" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="size-4" />
            <span>{type}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="ghost"
          className="w-full justify-between"
          nativeButton={false}
          render={<Link href={`/jobs/${id}`} />}
        >
          View Job alok
          <ArrowUpRight className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
