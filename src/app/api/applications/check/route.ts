import { NextResponse } from 'next/server';

import { requireRole } from '@/lib/current-user';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const user = await requireRole('CANDIDATE');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Only candidates can check applications',
        },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Job ID is required',
        },
        { status: 400 }
      );
    }

    const application = await prisma.application.findUnique({
      where: {
        jobId_candidateId: {
          jobId,
          candidateId: user.id,
        },
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      applied: Boolean(application),
      application,
    });
  } catch (error) {
    console.error('Check application error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to check application',
      },
      { status: 500 }
    );
  }
}
