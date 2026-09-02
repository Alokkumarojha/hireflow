import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({
      success: true,
      message: 'Database connected successfully',
      users,
    });
  } catch (error) {
    console.error('Database connection error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to database',
      },
      { status: 500 }
    );
  }
}
