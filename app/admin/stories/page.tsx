'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StoriesAdminPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch('/api/admin/stories');
    const d = await res.json();
    setStories(d.data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function remove(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch('/api/admin/stories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });
    if (res.ok) { toast.success('Story deleted'); load(); }
    else toast.error('Delete failed');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black mb-1" style={{ color: '#0D0D0D', letterSpacing: '-0.02em' }}>Stories</h1>
          <p className="text-sm" style={{ color: '#71717A' }}>Manage student success stories shown on the website.</p>
        </div>
        <Link href="/admin/stories/new"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm hover:opacity-90"
              style={{ background: '#8B0000', color: '#fff' }}>
          <Plus size={14} /> Add Story
        </Link>
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: '#A1A1AA' }}>Loading…</p>
      ) : stories.length === 0 ? (
        <div className="rounded-2xl border p-12 text-center" style={{ borderColor: '#E4E4E7' }}>
          <p className="font-bold text-sm mb-2" style={{ color: '#71717A' }}>No stories yet.</p>
          <p className="text-xs mb-4" style={{ color: '#A1A1AA' }}>
            Add stories manually or seed existing ones using the console:
          </p>
          <code className="text-xs px-3 py-2 rounded-lg block w-fit mx-auto"
                style={{ background: '#F7F7F8', color: '#8B0000' }}>
            fetch('/api/admin/seed/stories', {'{'} method: 'POST', headers: {'{'} 'x-setup-key': 'KLSACsetup2026' {'}'} {'}'})
          </code>
        </div>
      ) : (
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#E4E4E7' }}>
          <table className="w-full text-sm">
            <thead style={{ background: '#F7F7F8', borderBottom: '1px solid #E4E4E7' }}>
              <tr>
                <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider" style={{ color: '#71717A' }}>#</th>
                <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider" style={{ color: '#71717A' }}>Story</th>
                <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider" style={{ color: '#71717A' }}>Student</th>
                <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider" style={{ color: '#71717A' }}>Domain</th>
                <th className="text-right px-4 py-3 font-bold text-xs uppercase tracking-wider" style={{ color: '#71717A' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((s, i) => (
                <tr key={s.slug} style={{ borderBottom: '1px solid #F4F4F5' }}>
                  <td className="px-4 py-3 font-bold text-xs" style={{ color: '#A1A1AA' }}>{s.sort_order ?? i}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {s.photo && (
                        <img src={s.photo} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0"
                             style={{ border: '1px solid #E4E4E7' }} />
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold leading-snug" style={{ color: '#0D0D0D' }}>{s.title}</p>
                          {s.featured && <Star size={11} fill="#8B0000" style={{ color: '#8B0000' }} />}
                        </div>
                        <p className="text-xs mt-0.5 line-clamp-1" style={{ color: '#A1A1AA' }}>{s.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: '#3F3F46' }}>{s.student_name}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold px-2 py-1 rounded-full"
                          style={{ background: '#fff0f0', color: '#8B0000' }}>
                      {s.domain_code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/stories/${s.slug}`}
                            className="p-1.5 rounded-lg transition-colors hover:bg-gray-100">
                        <Pencil size={13} style={{ color: '#71717A' }} />
                      </Link>
                      <button onClick={() => remove(s.slug, s.title)}
                              className="p-1.5 rounded-lg transition-colors hover:bg-red-50">
                        <Trash2 size={13} style={{ color: '#8B0000' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs mt-4" style={{ color: '#A1A1AA' }}>
        Sort order controls the display order. Lower number = shown first. ★ = featured story (shown prominently).
      </p>
    </div>
  );
}
