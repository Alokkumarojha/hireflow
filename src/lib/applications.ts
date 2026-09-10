import { prisma } from '@/lib/prisma';

export async function getCandidateApplications(candidateId: string) {
  return prisma.application.findMany({
    where: {
      candidateId,
    },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          location: true,
          employmentType: true,
          salary: true,
          isActive: true,
          employer: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
