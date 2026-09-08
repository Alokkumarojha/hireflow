import { prisma } from '@/lib/prisma';

export async function getActiveJobs() {
  return prisma.job.findMany({
    where: {
      isActive: true,
    },
    include: {
      employer: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
export async function getJobById(id: string) {
  return prisma.job.findFirst({
    where: {
      id,
      isActive: true,
    },
    include: {
      employer: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}
