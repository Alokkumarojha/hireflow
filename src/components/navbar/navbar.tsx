'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Companies', href: '/companies' },
  { label: 'For Employers', href: '/employers' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          HireFlow
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-2 md:flex">
          <Show when="signed-out">
            <SignInButton>
              <Button variant="ghost">Sign In</Button>
            </SignInButton>

            <SignUpButton>
              <Button>Get Started</Button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-b bg-background px-4 pt-2 pb-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Authentication */}
            <div className="mt-4 flex flex-col gap-2 border-t pt-4">
              <Show when="signed-out">
                <SignInButton>
                  <Button variant="outline" className="w-full justify-center">
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <Button className="w-full justify-center">Get Started</Button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <div className="flex justify-center">
                  <UserButton />
                </div>
              </Show>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
