'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Plus, Trash2, Pencil } from 'lucide-react';

const DOMAIN_COLORS: Record<string, string> = {
  TEC: '#2563EB', LCH: '#7C3AED', HWB: '#16A34A', ESO: '#D97706', IIE: '#8B0000',
};

export default function ClubsAdminPage() {
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const r = await fetch('/api/admin/clubs');
    const d = await r.json();
    setClubs(d.data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function del(slug: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const r = await fetch('/api/admin/clubs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });
    if (r.ok) { toast.success('Club deleted'); load(); }
    else toast.error('Delete failed');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black mb-1" style={{ color: '#0D0D0D', letterSpacing: '-0.02em' }}>Clubs</h1>
          <p className="text-sm" style={{ color: '#71717A' }}>
            Manage club details, descriptions, and competencies.
          </p>
        </div>
        <Link href="/admin/clubs/new"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90"
              style={{ background: '#8B0000', color: '#fff' }}>
          <Plus size={14} /> New Club
        </Link>
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: '#71717A' }}>Loading…</p>
      ) : clubs.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border" style={{ background: '#fff', borderColor: '#E4E4E7' }}>
          <p className="font-semibold mb-2" style={{ color: '#71717A' }}>No clubs yet — run the seed first</p>
          <Link href="/admin/clubs/new" className="text-sm font-bold" style={{ color: '#8B0000' }}>Add a club →</Link>
        </div>
      ) : (
        <div className="rounded-2xl border overflow-hidden" style={{ background: '#fff', borderColor: '#E4E4E7' }}>
          {clubs.map((c, i) => (
            <div key={c.slug}
                 className="flex items-center gap-4 px-5 py-4"
                 style={{ borderBottom: i < clubs.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
              {/* Logo or placeholder */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-xs font-black"
                   style={{ background: `${DOMAIN_COLORS[c.domain_code] ?? '#8B0000'}18`,
                            color: DOMAIN_COLORS[c.domain_code] ?? '#8B0000' }}>
                {c.logo_url
                  ? <img src={c.logo_url} alt="" className="w-full h-full object-contain rounded-lg" />
                  : c.domain_code}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-sm" style={{ color: '#0D0D0D' }}>{c.name}</span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
                        style={{ background: `${DOMAIN_COLORS[c.domain_code] ?? '#8B0000'}15`,
                                 color: DOMAIN_COLORS[c.domain_code] ?? '#8B0000' }}>
                    {c.domain_code}
                  </span>
                </div>
                <p className="text-xs truncate" style={{ color: '#A1A1AA' }}>{c.tagline}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link href={`/admin/clubs/${c.slug}`}
                      className="p-2 rounded-lg transition-colors hover:bg-gray-100">
                  <Pencil size={14} style={{ color: '#71717A' }} />
                </Link>
                <button onClick={() => del(c.slug, c.name)}
                        className="p-2 rounded-lg transition-colors hover:bg-red-50">
                  <Trash2 size={14} style={{ color: '#8B0000' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 rounded-xl text-sm" style={{ background: '#FFF7ED', color: '#92400E' }}>
        <strong>First time?</strong> Run the seed to populate clubs from the existing static data:
        <code className="ml-2 text-xs px-2 py-0.5 rounded" style={{ background: '#FEF3C7' }}>
          POST /api/admin/seed/clubs-leadership
        </code>{' '}
        with header <code className="text-xs px-2 py-0.5 rounded" style={{ background: '#FEF3C7' }}>x-setup-key: KLSACsetup2026</code>
      </div>
    </div>
  );
}
