'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Plus, Trash2, Pencil, Image as ImageIcon } from 'lucide-react';

export default function NewsAdminPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const r = await fetch('/api/admin/news');
    const d = await r.json();
    setArticles(d.data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function del(slug: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch('/api/admin/news', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug }) });
    toast.success('Deleted');
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black mb-1" style={{ color: '#0D0D0D', letterSpacing: '-0.02em' }}>News Articles</h1>
          <p className="text-sm" style={{ color: '#71717A' }}>Articles appear on the public news page immediately after saving.</p>
        </div>
        <Link href="/admin/news/new"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ background: '#8B0000', color: '#fff' }}>
          <Plus size={14} /> New Article
        </Link>
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: '#71717A' }}>Loading…</p>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border" style={{ background: '#fff', borderColor: '#E4E4E7' }}>
          <p className="font-semibold mb-2" style={{ color: '#71717A' }}>No articles yet</p>
          <Link href="/admin/news/new" className="text-sm font-bold" style={{ color: '#8B0000' }}>Add the first article →</Link>
        </div>
      ) : (
        <div className="rounded-2xl border overflow-hidden" style={{ background: '#fff', borderColor: '#E4E4E7' }}>
          {articles.map((a, i) => (
            <div key={a.slug}
                 className="flex items-center gap-4 px-5 py-4"
                 style={{ borderBottom: i < articles.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                   style={{ background: a.photo_url ? '#fff' : '#F7F7F8', overflow: 'hidden' }}>
                {a.photo_url
                  ? <img src={a.photo_url} alt="" className="w-full h-full object-cover" />
                  : <ImageIcon size={16} style={{ color: '#A1A1AA' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-sm truncate" style={{ color: '#0D0D0D' }}>{a.title}</span>
                  {a.featured && (
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0"
                          style={{ background: '#fff0f0', color: '#8B0000' }}>Featured</span>
                  )}
                </div>
                <span className="text-xs" style={{ color: '#A1A1AA' }}>
                  {a.category} · {new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link href={`/admin/news/${a.slug}`}
                      className="p-2 rounded-lg transition-colors hover:bg-gray-100">
                  <Pencil size={14} style={{ color: '#71717A' }} />
                </Link>
                <button onClick={() => del(a.slug, a.title)}
                        className="p-2 rounded-lg transition-colors hover:bg-red-50">
                  <Trash2 size={14} style={{ color: '#8B0000' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
