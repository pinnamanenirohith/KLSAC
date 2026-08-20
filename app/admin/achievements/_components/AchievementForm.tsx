'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

const LEVELS = ['International', 'National', 'State', 'University'] as const;
const DOMAIN_CODES = ['TEC', 'LCH', 'HWB', 'ESO', 'IIE'] as const;

type Props = {
  achievement?: any;
};

function genId(title: string) {
  return 'ach-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 48) + '-' + Date.now().toString(36);
}

export default function AchievementForm({ achievement }: Props) {
  const isNew = !achievement;
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    id:           achievement?.id           ?? '',
    title:        achievement?.title        ?? '',
    level:        achievement?.level        ?? 'National',
    club_name:    achievement?.club_name    ?? '',
    domain_code:  achievement?.domain_code  ?? 'TEC',
    organization: achievement?.organization ?? '',
    year:         achievement?.year         ?? String(new Date().getFullYear()),
    description:  achievement?.description  ?? '',
    photo:        achievement?.photo        ?? '',
    sort_order:   achievement?.sort_order   ?? 0,
  });

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  async function save() {
    if (!form.title.trim()) { toast.error('Title is required.'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        id: form.id.trim() || genId(form.title),
      };
      const res = await fetch('/api/admin/achievements', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error ?? 'Save failed'); }
      toast.success(isNew ? 'Achievement added.' : 'Achievement updated.');
      router.push('/admin/achievements');
      router.refresh();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  const inputCls = 'w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all';
  const inputStyle = { borderColor: '#E4E4E7', background: '#F7F7F8' };
  const focusStyle = { borderColor: '#8B0000' };

  function Field({ label, k, hint, textarea }: { label: string; k: string; hint?: string; textarea?: boolean }) {
    return (
      <div>
        <label className="block text-sm font-bold mb-0.5" style={{ color: '#0D0D0D' }}>{label}</label>
        {hint && <p className="text-xs mb-1.5" style={{ color: '#A1A1AA' }}>{hint}</p>}
        {textarea ? (
          <textarea rows={4} value={(form as any)[k]}
            onChange={e => set(k, e.target.value)}
            className={inputCls + ' resize-none'}
            style={inputStyle}
            onFocus={e => Object.assign(e.target.style, focusStyle)}
            onBlur={e => Object.assign(e.target.style, inputStyle)} />
        ) : (
          <input type="text" value={(form as any)[k]}
            onChange={e => set(k, e.target.value)}
            className={inputCls}
            style={inputStyle}
            onFocus={e => Object.assign(e.target.style, focusStyle)}
            onBlur={e => Object.assign(e.target.style, inputStyle)} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl flex flex-col gap-5">
      <Field label="Title" k="title" hint="Full achievement title as it should appear on the page" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1" style={{ color: '#0D0D0D' }}>Level</label>
          <select value={form.level} onChange={e => set('level', e.target.value)}
            className={inputCls} style={inputStyle}>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1" style={{ color: '#0D0D0D' }}>Domain</label>
          <select value={form.domain_code} onChange={e => set('domain_code', e.target.value)}
            className={inputCls} style={inputStyle}>
            {DOMAIN_CODES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Club / Team Name" k="club_name" />
        <Field label="Year" k="year" />
      </div>

      <Field label="Presenting Organisation" k="organization" hint="Who awarded or organised this — competition body, company, institution" />
      <Field label="Description" k="description" hint="2–4 sentences about the achievement and its significance" textarea />
      <Field label="Photo URL" k="photo" hint="Optional — paste a URL or leave blank" />

      {!isNew && (
        <div>
          <label className="block text-sm font-bold mb-0.5" style={{ color: '#0D0D0D' }}>Sort Order</label>
          <input type="number" value={form.sort_order}
            onChange={e => set('sort_order', Number(e.target.value))}
            className={inputCls} style={{ ...inputStyle, width: '100px' }} />
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: '#8B0000', color: '#fff' }}>
          <Save size={14} /> {saving ? 'Saving…' : isNew ? 'Add Achievement' : 'Save Changes'}
        </button>
        <button onClick={() => router.push('/admin/achievements')}
          className="px-6 py-3 rounded-xl font-bold text-sm border transition-all hover:bg-gray-50"
          style={{ borderColor: '#E4E4E7', color: '#71717A' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
