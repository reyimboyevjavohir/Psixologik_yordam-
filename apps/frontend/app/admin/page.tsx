import { apiGet, getTokenFromCookies } from '@/lib/api';
import { redirect } from 'next/navigation';
import Link from 'next/link';

type Stats = { users: number; psychologists: number; tests: number; books: number; resources: number; bookings: number; pendingBookings: number };

export default async function AdminPage() {
  const token = await getTokenFromCookies();
  if (!token) redirect('/kirish');

  let stats: Stats;
  try {
    stats = await apiGet<Stats>('/admin/dashboard', token);
  } catch {
    redirect('/');
  }

  const cards = [
    { label: 'Foydalanuvchilar', value: stats.users, icon: '👥', href: '/superadmin/foydalanuvchilar', color: 'blue' },
    { label: 'Psixologlar', value: stats.psychologists, icon: '👨‍⚕️', href: '/admin/psixologlar', color: 'emerald' },
    { label: 'Testlar', value: stats.tests, icon: '🧪', href: '/admin/testlar', color: 'sky' },
    { label: 'Kitoblar', value: stats.books, icon: '📚', href: '/admin/kitoblar', color: 'amber' },
    { label: 'Resurslar', value: stats.resources, icon: '🎯', href: '/admin/resurslar', color: 'purple' },
    { label: 'Bronlar', value: stats.bookings, icon: '📅', href: '/admin/bronlar', color: 'slate' },
  ];

  return (
    <div className="container-page py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-slate-500 mt-1">Platformani boshqarish va statistika</p>
      </div>

      {stats.pendingBookings > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold text-amber-800">{stats.pendingBookings} ta bron tasdiqlanishni kutmoqda</p>
            <Link href="/admin/bronlar" className="text-sm text-amber-700 underline">Ko'rish →</Link>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, icon, href }) => (
          <Link key={href} href={href} className="card hover:border-sky-300 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-3xl font-bold mt-1">{value}</p>
              </div>
              <span className="text-4xl">{icon}</span>
            </div>
            <p className="text-sm text-sky-600 mt-3 group-hover:underline">Boshqarish →</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <h2 className="font-semibold mb-3">Tezkor havolalar</h2>
          <div className="space-y-2">
            <Link href="/admin/psixologlar" className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-700 py-1.5">👨‍⚕️ Psixolog qo'shish</Link>
            <Link href="/admin/kitoblar" className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-700 py-1.5">📚 Kitob qo'shish</Link>
            <Link href="/admin/resurslar" className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-700 py-1.5">🎯 Resurs qo'shish</Link>
            <Link href="/admin/testlar" className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-700 py-1.5">🧪 Test qo'shish</Link>
          </div>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-3">SuperAdmin funksiyalari</h2>
          <div className="space-y-2">
            <Link href="/superadmin/foydalanuvchilar" className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 py-1.5">👥 Foydalanuvchilarni boshqarish</Link>
            <Link href="/superadmin/foydalanuvchilar" className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 py-1.5">🔑 Rol o'zgartirish</Link>
            <Link href="/superadmin/foydalanuvchilar" className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 py-1.5">🚫 Foydalanuvchi bloklash</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
