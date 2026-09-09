import { NextResponse } from 'next/server';

import { requireRole } from '@/lib/current-user';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const user = await requireRole('CANDIDATE');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Only candidates can apply for jobs',
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const { jobId, coverLetter } = body;

    if (!jobId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Job ID is required',
        },
        { status: 400 }
      );
    }

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        isActive: true,
      },
    });

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: 'Job not found or no longer active',
        },
        { status: 404 }
      );
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_candidateId: {
          jobId,
          candidateId: user.id,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: 'You have already applied for this job',
        },
        { status: 409 }
      );
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        candidateId: user.id,
        coverLetter: coverLetter || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create application error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit application',
      },
      { status: 500 }
    );
  }
}
