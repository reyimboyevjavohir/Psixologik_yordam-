import { apiGet } from '@/lib/api';
import { Test } from '@/types';
import Link from 'next/link';

export default async function TestlarPage() {
  let tests: Test[] = [];
  try { tests = await apiGet<Test[]>('/tests'); } catch {}

  return (
    <div className="container-page py-10 space-y-6">
      <h1 className="text-3xl font-bold">Psixologik Testlar</h1>
      <p className="text-slate-500">O'zingizni baholang va natijalarni bilib oling</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tests.map((t) => (
          <div key={t.id} className="card hover:border-sky-300 hover:shadow-md transition-all flex flex-col">
            <div className="flex-1 space-y-2">
              <span className="badge badge-blue text-xs">{t.category?.name}</span>
              <h3 className="text-lg font-semibold mt-2">{t.title}</h3>
              <p className="text-sm text-slate-500">{t.description}</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-xs text-slate-400">
                ⏱ {t.durationMin} min · {t.questionCount} ta savol
              </div>
              <Link href={`/testlar/${t.slug}`} className="btn-sm">Boshlash →</Link>
            </div>
          </div>
        ))}
        {tests.length === 0 && <p className="text-slate-400 col-span-3">Testlar topilmadi.</p>}
      </div>
    </div>
  );
}
