import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user || user.role !== 'CANDIDATE') {
      return NextResponse.json(
        { message: 'Only candidates can access resumes' },
        { status: 403 }
      );
    }

    const resume = await prisma.resume.findUnique({
      where: {
        candidateId: user.id,
      },
    });

    return NextResponse.json(
      {
        resume,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Resume fetch error:', error);

    return NextResponse.json(
      { message: 'Failed to fetch resume' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user || user.role !== 'CANDIDATE') {
      return NextResponse.json(
        { message: 'Only candidates can save resumes' },
        { status: 403 }
      );
    }

    const body = await request.json();

    const { fileName, fileUrl, publicId, fileSize, mimeType } = body;

    if (!fileName || !fileUrl || !publicId || !fileSize || !mimeType) {
      return NextResponse.json(
        { message: 'Missing resume information' },
        { status: 400 }
      );
    }

    if (mimeType !== 'application/pdf') {
      return NextResponse.json(
        { message: 'Only PDF resumes are allowed' },
        { status: 400 }
      );
    }

    if (fileSize > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'Resume must be 5 MB or smaller' },
        { status: 400 }
      );
    }

    const resume = await prisma.resume.upsert({
      where: {
        candidateId: user.id,
      },
      update: {
        fileName,
        fileUrl,
        publicId,
        fileSize,
        mimeType,
      },
      create: {
        fileName,
        fileUrl,
        publicId,
        fileSize,
        mimeType,
        candidateId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: 'Resume saved successfully',
        resume,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Resume save error:', error);

    return NextResponse.json(
      { message: 'Failed to save resume' },
      { status: 500 }
    );
  }
}
