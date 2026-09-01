import { FileUser, Search, Send } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Create your profile',
    description:
      'Build a professional profile and showcase your skills and experience.',
    icon: FileUser,
  },
  {
    number: '02',
    title: 'Find the right job',
    description:
      'Search and explore opportunities that match your skills and career goals.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Apply and track',
    description:
      'Apply with confidence and track your application status in one place.',
    icon: Send,
  },
];

export default function HowItWorks() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">How it works</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Find your next opportunity in three simple steps
          </h2>

          <p className="mt-4 text-muted-foreground">
            HireFlow makes the job search process simple, organized, and easy to
            manage.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border bg-background p-6"
              >
                {/* Step Number */}
                <span className="text-sm font-semibold text-primary">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="mt-5 flex size-12 items-center justify-center rounded-xl bg-muted">
                  <Icon className="size-6" />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
