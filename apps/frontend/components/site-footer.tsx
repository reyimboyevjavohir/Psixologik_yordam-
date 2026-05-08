export function SiteFooter() {
  return (
    <footer className="border-t bg-white py-6 mt-auto">
      <div className="container-page flex flex-col items-center gap-2 text-sm text-slate-500 md:flex-row md:justify-between">
        <p>© 2024 Psixologik Platforma. Barcha huquqlar himoyalangan.</p>
        <div className="flex gap-4">
          <a href="/maxfiylik" className="hover:text-slate-800">Maxfiylik siyosati</a>
          <a href="/shartlar" className="hover:text-slate-800">Foydalanish shartlari</a>
          <a href="/haqida" className="hover:text-slate-800">Biz haqimizda</a>
        </div>
      </div>
    </footer>
  );
}
