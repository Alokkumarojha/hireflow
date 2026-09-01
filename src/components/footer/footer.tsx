import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';

const footerLinks = {
  Platform: [
    { label: 'Jobs', href: '/jobs' },
    { label: 'Companies', href: '/companies' },
    { label: 'For Employers', href: '/employers' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Grid: Mobile me 2 columns, Desktop me 5 columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
          {/* Brand Section - Mobile me full width lega */}
          <div className="col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight">
              HireFlow
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              A modern platform connecting talented people with companies
              building the future.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <FaGithub className="h-5 w-5" />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <FaLinkedin className="h-5 w-5" />
              </Link>

              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <FaTwitterSquare className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Footer Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h3 className="text-sm font-semibold tracking-wide text-foreground">
                {title}
              </h3>

              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HireFlow, Inc. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
