import { NextResponse } from 'next/server';

import { requireRole } from '@/lib/current-user';
import { getCandidateApplications } from '@/lib/applications';

export async function GET() {
  try {
    const user = await requireRole('CANDIDATE');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Only candidates can view applications',
        },
        { status: 403 }
      );
    }

    const applications = await getCandidateApplications(user.id);

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error('Get candidate applications error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch applications',
      },
      { status: 500 }
    );
  }
}

// for future planing
//"Load More Applications"
//"Filter by Status"
//"Refresh Applications"
//"Pagination"
//"Search My Applications"
