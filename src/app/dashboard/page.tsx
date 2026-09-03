import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/current-user';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  switch (user.role) {
    case 'CANDIDATE':
      redirect('/dashboard/candidate');

    case 'EMPLOYER':
      redirect('/dashboard/employer');

    case 'ADMIN':
      redirect('/dashboard/admin');

    default:
      redirect('/');
  }
}
