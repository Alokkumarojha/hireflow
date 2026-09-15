import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

export async function POST() {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: {
        role: true,
      },
    });

    if (!user || user.role !== 'CANDIDATE') {
      return NextResponse.json(
        { message: 'Only candidates can upload resumes' },
        { status: 403 }
      );
    }

    const timestamp = Math.round(Date.now() / 1000);

    const paramsToSign = {
      timestamp,
      upload_preset: 'hireflow_resumes',
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      uploadPreset: 'hireflow_resumes',
    });
  } catch (error) {
    console.error('Cloudinary signature error:', error);

    return NextResponse.json(
      { message: 'Failed to generate upload signature' },
      { status: 500 }
    );
  }
}
