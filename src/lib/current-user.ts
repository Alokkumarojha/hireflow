import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  return user;
}

export async function requireRole(role: 'CANDIDATE' | 'EMPLOYER' | 'ADMIN') {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  if (user.role !== role) {
    return null;
  }

  return user;
}
