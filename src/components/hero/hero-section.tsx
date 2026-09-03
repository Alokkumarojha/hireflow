'use client';

import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import JobSearch from '@/components/job-search/job-search';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

// Paragraph Text Typewriter Animation Variants
const sentenceVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02, // Timing between each letter typing
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, display: 'none' },
  visible: {
    opacity: 1,
    display: 'inline',
  },
};

const descriptionText =
  'Discover meaningful jobs from companies looking for talented people. Build your profile, find the right opportunity, and take the next step in your career.';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge with Pulse & Floating Animation */}
          <motion.div variants={itemVariants}>
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mb-6 inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Find opportunities that match your potential
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Find your next{' '}
            <span className="text-primary inline-block">
              career opportunity
            </span>
          </motion.h1>

          {/* Description with Typewriter Effect */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg min-h-[4rem]"
          >
            <motion.span
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
            >
              {descriptionText.split('').map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/jobs" />}
              >
                <Search className="mr-2 size-4" />
                Browse Jobs
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/employers" />}
              >
                Post a Job
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Job Search Box */}
          <motion.div variants={itemVariants} className="mt-8">
            <JobSearch />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
