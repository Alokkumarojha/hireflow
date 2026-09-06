import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/current-user';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await requireRole('EMPLOYER');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Only employers can access their jobs',
        },
        { status: 403 }
      );
    }

    const jobs = await prisma.job.findMany({
      where: {
        employerId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error('Get employer jobs error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch employer jobs',
      },
      { status: 500 }
    );
  }
}
