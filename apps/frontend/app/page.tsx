import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container-page py-16 space-y-16">
      <section className="text-center space-y-4">
        <div className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-medium text-sky-700 mb-2">
          🧠 O'zbekistondagi #1 psixologik platforma
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Ruhiy salomatligingiz — <span className="text-sky-600">bizning ustuvorligimiz</span></h1>
        <p className="mx-auto max-w-xl text-lg text-slate-500">Professional psixologlar bilan maslahat, o'z-o'zini baholash testlari va foydali resurslar bir joyda.</p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/testlar" className="btn text-base px-6 py-3">Testni boshlash</Link>
          <Link href="/maslahatlar" className="btn-outline text-base px-6 py-3">Psixolog tanlash</Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: '🧪', title: 'Testlar', desc: "O'zingizni baholang", href: '/testlar', color: 'sky' },
          { icon: '👨‍⚕️', title: 'Maslahatlar', desc: 'Mutaxassis bilan gaplashing', href: '/maslahatlar', color: 'emerald' },
          { icon: '📚', title: 'Kitoblar', desc: 'Foydali adabiyotlar', href: '/kitoblar', color: 'amber' },
          { icon: '🎯', title: 'Resurslar', desc: 'Video va maqolalar', href: '/resurslar', color: 'purple' },
        ].map(({ icon, title, desc, href }) => (
          <Link key={href} href={href} className="card group hover:border-sky-300 hover:shadow-md transition-all text-center">
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold group-hover:text-sky-700 transition">{title}</h3>
            <p className="text-sm text-slate-500 mt-1">{desc}</p>
          </Link>
        ))}
      </section>

      <section className="card bg-sky-50 border-sky-200 text-center space-y-4">
        <h2 className="text-2xl font-bold">Nima uchun biz?</h2>
        <div className="grid gap-4 sm:grid-cols-3 text-left mt-4">
          {[
            { icon: '🔒', title: 'Maxfiylik', desc: 'Barcha ma\'lumotlaringiz to\'liq himoyalangan.' },
            { icon: '⚡', title: 'Tezkor yordam', desc: 'Bir necha daqiqada mutaxassis bilan bog\'laning.' },
            { icon: '✅', title: 'Sertifikatlangan', desc: 'Barcha psixologlar tekshirilgan va sertifikatlangan.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-3">
              <span className="text-2xl">{icon}</span>
              <div><p className="font-semibold">{title}</p><p className="text-sm text-slate-600 mt-0.5">{desc}</p></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
