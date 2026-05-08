import { apiGet, getTokenFromCookies } from '@/lib/api';
import { Booking, TestResult, User } from '@/types';
import { redirect } from 'next/navigation';

export default async function ProfilPage() {
  const token = await getTokenFromCookies();
  if (!token) redirect('/kirish');

  let user: User, bookings: Booking[], results: TestResult[];
  try {
    [user, bookings, results] = await Promise.all([
      apiGet<User>('/auth/me', token),
      apiGet<Booking[]>('/bookings/my', token),
      apiGet<TestResult[]>('/tests/my/results', token),
    ]);
  } catch {
    redirect('/kirish');
  }

  const roleLabel = { USER: 'Foydalanuvchi', ADMIN: 'Administrator', SUPERADMIN: 'Bosh Administrator' };
  const roleBadge = { USER: 'badge-blue', ADMIN: 'badge-yellow', SUPERADMIN: 'badge-purple' };
  const statusMap: Record<string, string> = { PENDING: 'Kutilmoqda', CONFIRMED: 'Tasdiqlandi', COMPLETED: 'Yakunlandi', CANCELLED: 'Bekor qilindi' };
  const statusBadge: Record<string, string> = { PENDING: 'badge-yellow', CONFIRMED: 'badge-green', COMPLETED: 'badge-blue', CANCELLED: 'badge-red' };

  return (
    <div className="container-page py-10 space-y-6">
      <div className="card">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center text-2xl font-bold text-sky-700">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.fullName}</h1>
              <p className="text-slate-500">@{user.username}</p>
              <p className="text-slate-400 text-sm">{user.email}</p>
            </div>
          </div>
          <span className={`badge ${roleBadge[user.role]}`}>{roleLabel[user.role]}</span>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Mening bronlarim ({bookings.length})</h2>
        {bookings.length === 0 ? (
          <p className="text-slate-400 text-sm">Hali bron yo'q.</p>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="font-medium">{b.psychologist.fullName}</p>
                  <p className="text-sm text-slate-500">{new Date(b.scheduledAt).toLocaleString('uz-UZ')} — {b.mode}</p>
                </div>
                <span className={`badge ${statusBadge[b.status]}`}>{statusMap[b.status]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Test natijalari ({results.length})</h2>
        {results.length === 0 ? (
          <p className="text-slate-400 text-sm">Hali test topshirilmagan.</p>
        ) : (
          <div className="space-y-3">
            {results.map((r) => (
              <div key={r.id} className="rounded-xl border p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{r.test.title}</p>
                  <p className="text-sm text-slate-500">{new Date(r.createdAt).toLocaleDateString('uz-UZ')}</p>
                </div>
                <div className="text-right">
                  <span className="badge badge-blue">{r.level}</span>
                  <p className="text-sm text-slate-500 mt-1">{r.score} ball</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
