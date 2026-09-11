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

export async function getEmployerApplications(employerId: string) {
  return prisma.application.findMany({
    where: {
      job: {
        employerId,
      },
    },
    include: {
      candidate: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      job: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getEmployerApplicationById(
  applicationId: string,
  employerId: string
) {
  return prisma.application.findFirst({
    where: {
      id: applicationId,
      job: {
        employerId,
      },
    },
    include: {
      candidate: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      job: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          employmentType: true,
          salary: true,
          isActive: true,
        },
      },
    },
  });
}
