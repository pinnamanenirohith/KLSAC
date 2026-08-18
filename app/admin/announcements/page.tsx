'use client';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2, AlertTriangle, Calendar, Megaphone } from 'lucide-react';

interface Announcement {
  id: number; title: string; content: string;
  type: 'general' | 'urgent' | 'event';
  created_at: string; expires_at: string | null;
}

const typeIcons = { urgent: AlertTriangle, event: Calendar, general: Megaphone };
const typeColors = {
  urgent:  'border-red-400 bg-red-50 text-red-800',
  event:   'border-blue-400 bg-blue-50 text-blue-800',
  general: 'border-gray-300 bg-white text-gray-800',
};

export default function AnnouncementsAdmin() {
  const [items, setItems]     = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState({ title: '', content: '', type: 'general', expires_at: '' });
  const [saving, setSaving]   = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/announcements')
      .then(r => r.json())
      .then(d => { setItems(d.data ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, expires_at: form.expires_at || null }),
      });
      if (!res.ok) throw new Error('Failed to create');
      toast.success('Announcement posted!');
      setForm({ title: '', content: '', type: 'general', expires_at: '' });
      load();
    } catch { toast.error('Failed to post announcement'); }
    finally { setSaving(false); }
  }

  async function remove(id: number) {
    if (!confirm('Remove this announcement?')) return;
    await fetch('/api/admin/announcements', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    toast.success('Removed');
    load();
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-2">Announcements</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>
        Post notices that appear in the ticker bar and on the announcements page.
      </p>

      <div className="rounded-2xl border p-6 mb-10" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <h2 className="font-bold mb-4 flex items-center gap-2"><Plus size={16} /> New Announcement</h2>
        <form onSubmit={create} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Title *</label>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                     className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                     style={{ borderColor: 'var(--border)', background: 'var(--muted)' }} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Type</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                      style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
                <option value="general">General</option>
                <option value="event">Event</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Content *</label>
            <textarea required rows={3} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none"
                      style={{ borderColor: 'var(--border)', background: 'var(--muted)' }} />
          </div>
          <div className="sm:w-64">
            <label className="text-sm font-medium block mb-1">Expires at (optional)</label>
            <input type="date" value={form.expires_at} onChange={e => setForm(f => ({ ...f, expires_at: e.target.value }))}
                   className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                   style={{ borderColor: 'var(--border)', background: 'var(--muted)' }} />
          </div>
          <div>
            <button type="submit" disabled={saving}
                    className="px-6 py-2.5 rounded-xl font-semibold text-white text-sm transition-opacity disabled:opacity-60"
                    style={{ background: 'var(--primary)' }}>
              {saving ? 'Posting…' : 'Post Announcement'}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl h-20 animate-pulse" style={{ background: 'var(--muted)' }} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-center py-10" style={{ color: 'var(--muted-foreground)' }}>No announcements yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map(item => {
            const Icon = typeIcons[item.type] ?? Megaphone;
            return (
              <div key={item.id} className={`rounded-2xl border-l-4 p-5 flex items-start gap-3 ${typeColors[item.type]}`}>
                <Icon size={18} className="mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{item.title}</div>
                  <p className="text-sm mt-0.5 line-clamp-2">{item.content}</p>
                  <div className="text-xs mt-1 opacity-70">
                    Posted {new Date(item.created_at).toLocaleDateString('en-IN')}
                    {item.expires_at && ` · Expires ${new Date(item.expires_at).toLocaleDateString('en-IN')}`}
                  </div>
                </div>
                <button onClick={() => remove(item.id)}
                        className="shrink-0 p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
