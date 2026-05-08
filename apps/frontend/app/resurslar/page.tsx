import { apiGet } from '@/lib/api';
import { Resource } from '@/types';

const typeLabel: Record<string, string> = { VIDEO: 'Video', ARTICLE: 'Maqola', BOOK: 'Kitob', GUIDE: "Qo'llanma" };
const typeBadge: Record<string, string> = { VIDEO: 'badge-red', ARTICLE: 'badge-blue', BOOK: 'badge-yellow', GUIDE: 'badge-green' };

export default async function ResurslarPage() {
  let resources: Resource[] = [];
  try { resources = await apiGet<Resource[]>('/resources'); } catch {}

  return (
    <div className="container-page py-10 space-y-6">
      <h1 className="text-3xl font-bold">Resurslar</h1>
      <p className="text-slate-500">Video darslar, maqolalar va qo'llanmalar</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <div key={r.id} className="card hover:border-purple-300 hover:shadow-md transition-all flex flex-col">
            {r.thumbnailUrl && <img src={r.thumbnailUrl} alt={r.title} className="w-full h-40 object-cover rounded-xl mb-3" />}
            <div className="flex items-center gap-2">
              <span className={`badge ${typeBadge[r.type] || 'badge-blue'}`}>{typeLabel[r.type] || r.type}</span>
              <span className="text-xs text-slate-400">{r.category?.name}</span>
            </div>
            <h3 className="font-semibold mt-2">{r.title}</h3>
            <p className="text-sm text-slate-500 flex-1 mt-1">{r.description}</p>
            {r.url && (
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="btn-sm mt-4 text-center">
                Ko'rish →
              </a>
            )}
          </div>
        ))}
        {resources.length === 0 && <p className="text-slate-400 col-span-3">Resurslar topilmadi.</p>}
      </div>
    </div>
  );
}
