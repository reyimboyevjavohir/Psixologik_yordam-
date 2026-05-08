import { apiGet } from '@/lib/api';
import { Psychologist } from '@/types';
import Link from 'next/link';

export default async function MaslahatlarPage() {
  let psychologists: Psychologist[] = [];
  try { psychologists = await apiGet<Psychologist[]>('/psychologists'); } catch {}

  return (
    <div className="container-page py-10 space-y-6">
      <h1 className="text-3xl font-bold">Psixologlar</h1>
      <p className="text-slate-500">Mutaxassis psixologlar bilan maslahat qiling</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {psychologists.map((p) => (
          <div key={p.id} className="card flex flex-col hover:border-sky-300 hover:shadow-md transition-all">
            <div className="flex items-start gap-3 flex-1">
              <img src={p.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${p.fullName}`}
                alt={p.fullName} className="h-14 w-14 rounded-full object-cover bg-slate-100" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{p.fullName}</h3>
                <p className="text-sm text-sky-600">{p.specialty}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-amber-500 text-sm">★ {p.rating}</span>
                  <span className="text-xs text-slate-400">({p.reviewsCount} sharh)</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3 line-clamp-2">{p.bio}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(p.specializations as string[]).slice(0, 2).map((s) => (
                <span key={s} className="badge badge-blue text-xs">{s}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <p className="font-semibold text-sky-700">{p.price.toLocaleString()} so'm</p>
              <Link href={`/maslahatlar/${p.slug}`} className="btn-sm">Bron qilish</Link>
            </div>
          </div>
        ))}
        {psychologists.length === 0 && <p className="text-slate-400 col-span-3">Psixologlar topilmadi.</p>}
      </div>
    </div>
  );
}
