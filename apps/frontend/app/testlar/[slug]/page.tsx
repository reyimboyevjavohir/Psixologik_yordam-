import { apiGet } from '@/lib/api';
import { Test } from '@/types';
import { TestRunner } from '@/components/test-runner';
import { notFound } from 'next/navigation';

export default async function TestDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let test: Test;
  try { test = await apiGet<Test>(`/tests/${slug}`); } catch { notFound(); }

  return (
    <div className="container-page py-10 space-y-6">
      <div className="card max-w-2xl mx-auto bg-sky-50 border-sky-200">
        <h1 className="text-2xl font-bold">{test.title}</h1>
        <p className="text-slate-600 mt-1">{test.description}</p>
        <div className="flex gap-4 mt-3 text-sm text-slate-500">
          <span>⏱ {test.durationMin} daqiqa</span>
          <span>📝 {test.questionCount} ta savol</span>
          <span>🏷 {test.category?.name}</span>
        </div>
        <div className="mt-3 rounded-lg bg-white border border-sky-200 px-4 py-2.5 text-sm">
          <strong>Ko'rsatma:</strong> {test.instructions}
        </div>
      </div>
      <TestRunner test={test} />
    </div>
  );
}
