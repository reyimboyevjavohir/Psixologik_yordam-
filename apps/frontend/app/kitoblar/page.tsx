import { apiGet } from '@/lib/api';
import { Book } from '@/types';

export default async function KitoblarPage() {
  let books: Book[] = [];
  try { books = await apiGet<Book[]>('/books'); } catch {}

  return (
    <div className="container-page py-10 space-y-6">
      <h1 className="text-3xl font-bold">Kitoblar</h1>
      <p className="text-slate-500">Psixologiya bo'yicha foydali adabiyotlar</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((b) => (
          <div key={b.id} className="card flex flex-col hover:border-amber-300 hover:shadow-md transition-all">
            {b.coverUrl && <img src={b.coverUrl} alt={b.title} className="w-full h-48 object-cover rounded-xl mb-3" />}
            <span className="badge badge-yellow text-xs">{b.category?.name}</span>
            <h3 className="font-semibold mt-2">{b.title}</h3>
            <p className="text-sm text-slate-500">{b.author}</p>
            <p className="text-sm text-slate-400 mt-1 flex-1">{b.description}</p>
            {b.downloadUrl && (
              <a href={b.downloadUrl} target="_blank" rel="noopener noreferrer" className="btn-sm mt-4 text-center">
                Yuklab olish
              </a>
            )}
          </div>
        ))}
        {books.length === 0 && <p className="text-slate-400 col-span-4">Kitoblar topilmadi.</p>}
      </div>
    </div>
  );
}
