import Link from 'next/link';
import { ArrowRight, Building2, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';

const companies = [
  {
    name: 'TechNova',
    industry: 'Technology',
    location: 'Bangalore, India',
  },
  {
    name: 'CloudScale',
    industry: 'Cloud Infrastructure',
    location: 'Remote',
  },
  {
    name: 'DesignFlow',
    industry: 'Product Design',
    location: 'Mumbai, India',
  },
  {
    name: 'DataSphere',
    industry: 'Data & AI',
    location: 'Hyderabad, India',
  },
];

export default function TopCompanies() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-primary">Top companies</p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Discover companies hiring now
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Explore opportunities from companies building great products and
              growing talented teams.
            </p>
          </div>

          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/companies" />}
          >
            View all companies
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>

        {/* Companies Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="rounded-2xl border bg-background p-6 transition-shadow hover:shadow-md"
            >
              {/* Company Icon */}
              <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                <Building2 className="size-6" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">{company.name}</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {company.industry}
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                <span>{company.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
