import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/current-user';

export default async function AdminDashboard() {
  const user = await requireRole('ADMIN');

  if (!user) {
    redirect('/');
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <p className="mt-2 text-muted-foreground">
        Welcome, {user.name || 'Admin'}!
      </p>

      <div className="mt-8 rounded-lg border p-6">
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p className="mt-2">
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </main>
  );
}
