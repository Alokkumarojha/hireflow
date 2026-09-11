import { NextResponse } from 'next/server';

import { requireRole } from '@/lib/current-user';
import { prisma } from '@/lib/prisma';

const allowedStatuses = [
  'PENDING',
  'REVIEWING',
  'SHORTLISTED',
  'REJECTED',
  'HIRED',
] as const;

type ApplicationStatus = (typeof allowedStatuses)[number];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole('EMPLOYER');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Only employers can update applications',
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const body = await request.json();
    const status = body.status as ApplicationStatus;

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid application status',
        },
        { status: 400 }
      );
    }

    const application = await prisma.application.findFirst({
      where: {
        id,
        job: {
          employerId: user.id,
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: 'Application not found',
        },
        { status: 404 }
      );
    }

    const updatedApplication = await prisma.application.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      application: updatedApplication,
    });
  } catch (error) {
    console.error('Update application status error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update application status',
      },
      { status: 500 }
    );
  }
}
