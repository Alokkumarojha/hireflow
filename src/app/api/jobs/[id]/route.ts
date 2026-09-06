import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/current-user';
import { prisma } from '@/lib/prisma';

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
          message: 'Only employers can edit jobs',
        },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const { title, description, location, employmentType, salary, isActive } =
      body;

    if (!title || !description || !location || !employmentType) {
      return NextResponse.json(
        {
          success: false,
          message: 'Required fields are missing',
        },
        { status: 400 }
      );
    }

    const job = await prisma.job.findFirst({
      where: {
        id,
        employerId: user.id,
      },
    });

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: 'Job not found',
        },
        { status: 404 }
      );
    }

    const updatedJob = await prisma.job.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        location,
        employmentType,
        salary: salary || null,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Job updated successfully',
      job: updatedJob,
    });
  } catch (error) {
    console.error('Update job error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update job',
      },
      { status: 500 }
    );
  }
}
