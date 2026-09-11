import { NextResponse } from 'next/server';

import { requireRole } from '@/lib/current-user';
import { getEmployerApplications } from '@/lib/applications';

export async function GET() {
  try {
    const user = await requireRole('EMPLOYER');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Only employers can view applications',
        },
        { status: 403 }
      );
    }

    const applications = await getEmployerApplications(user.id);

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error('Get employer applications error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch applications',
      },
      { status: 500 }
    );
  }
}
