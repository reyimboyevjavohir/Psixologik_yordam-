import { apiGet } from '@/lib/api';
import { Psychologist } from '@/types';
import { notFound } from 'next/navigation';
import { BookingForm } from '@/components/booking-form';

export default async function PsixologDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let p: Psychologist;
  try { p = await apiGet<Psychologist>(`/psychologists/${slug}`); } catch { notFound(); }
  const avail = p.availability as Record<string, unknown>;

  return (
    <div className="container-page py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <div className="card flex gap-5">
            <img src={p.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${p.fullName}`}
              alt={p.fullName} className="h-24 w-24 rounded-2xl object-cover bg-slate-100 shrink-0" />
            <div>
              <h1 className="text-2xl font-bold">{p.fullName}</h1>
              <p className="text-sky-600">{p.specialty}</p>
              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="text-amber-500">★ {p.rating}</span>
                <span className="text-slate-400">({p.reviewsCount} sharh)</span>
                <span className="text-slate-400">{p.experienceYears} yil tajriba</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {(p.specializations as string[]).map(s => (
                  <span key={s} className="badge badge-blue">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="card space-y-2">
            <h2 className="font-semibold text-lg">Haqida</h2>
            <p className="text-slate-600">{p.bio}</p>
          </div>
          <div className="card grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">Tillar</p>
              <p className="font-medium mt-1">{(p.languages as string[]).join(', ')}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Ish kunlari</p>
              <p className="font-medium mt-1">{String(avail.weekdays)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Ish soatlari</p>
              <p className="font-medium mt-1">{String(avail.hours)}</p>
            </div>
          </div>
        </div>
        <div>
          <BookingForm psychologistId={p.id} price={p.price} name={p.fullName} />
        </div>
      </div>
    </div>
  );
}
