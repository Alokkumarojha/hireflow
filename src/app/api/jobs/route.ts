import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/current-user';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        isActive: true,
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
    console.error('Get jobs error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch jobs',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireRole('EMPLOYER');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Only employers can create jobs',
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const { title, description, location, employmentType, salary } = body;

    if (!title || !description || !location || !employmentType) {
      return NextResponse.json(
        {
          success: false,
          message: 'Required fields are missing',
        },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        employmentType,
        salary: salary || null,
        employerId: user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Job created successfully',
        job,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create job error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create job',
      },
      { status: 500 }
    );
  }
}
