'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Cookie'dan role o'qish (httpOnly emas)
    const r = document.cookie.split('; ').find(c => c.startsWith('userRole='))?.split('=')[1];
    setRole(r || null);
  }, [pathname]);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    setRole(null);
    router.push('/');
    router.refresh();
  }

  const navLinks = [
    { href: '/testlar', label: 'Testlar' },
    { href: '/maslahatlar', label: 'Maslahatlar' },
    { href: '/kitoblar', label: 'Kitoblar' },
    { href: '/resurslar', label: 'Resurslar' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
      <div className="container-page flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-sky-700">
          🧠 Psixologik
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${pathname === href ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
              {label}
            </Link>
          ))}
          {(role === 'ADMIN' || role === 'SUPERADMIN') && (
            <Link href="/admin"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${pathname.startsWith('/admin') ? 'bg-amber-50 text-amber-700' : 'text-amber-600 hover:bg-amber-50'}`}>
              Admin
            </Link>
          )}
          {role === 'SUPERADMIN' && (
            <Link href="/superadmin"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${pathname.startsWith('/superadmin') ? 'bg-purple-50 text-purple-700' : 'text-purple-600 hover:bg-purple-50'}`}>
              SuperAdmin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {role ? (
            <>
              <Link href="/profil" className="btn-outline text-sm px-3 py-2">Profil</Link>
              <button onClick={handleLogout} className="btn-sm bg-slate-600 hover:bg-slate-700">Chiqish</button>
            </>
          ) : (
            <>
              <Link href="/kirish" className="btn-outline text-sm px-3 py-2">Kirish</Link>
              <Link href="/royxatdan-otish" className="btn text-sm px-3 py-2">Ro'yxat</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
