const stats = [
  {
    value: '10K+',
    label: 'Active Jobs',
  },
  {
    value: '500+',
    label: 'Companies',
  },
  {
    value: '25K+',
    label: 'Candidates',
  },
  {
    value: '95%',
    label: 'Success Rate',
  },
];

export default function StatsSection() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center px-4 py-10 text-center"
          >
            <span className="text-3xl font-bold tracking-tight sm:text-4xl">
              {stat.value}
            </span>

            <span className="mt-2 text-sm text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
