'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

const STAT_KEYS = [
  { key: 'students',     label: 'Students Enrolled',  suffix: '+'  },
  { key: 'clubs',        label: 'Active Clubs',        suffix: ''   },
  { key: 'activities',   label: 'Annual Activities',   suffix: '+'  },
  { key: 'achievements', label: 'Achievements',        suffix: '+'  },
];

export default function StatsAdminPage() {
  const [values, setValues] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => {
        const map: Record<string, number> = {};
        (d.data ?? []).forEach((s: any) => { map[s.key] = s.value; });
        setValues(map);
      });
  }, []);

  async function save() {
    setSaving(true);
    try {
      const updates = STAT_KEYS.map(s => ({ key: s.key, value: values[s.key] ?? 0 }));
      const res = await fetch('/api/admin/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Save failed');
      toast.success('Stats updated — homepage will reflect changes.');
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-black mb-1" style={{ color: '#0D0D0D', letterSpacing: '-0.02em' }}>
        Homepage Stats
      </h1>
      <p className="text-sm mb-8" style={{ color: '#71717A' }}>
        These numbers appear on the homepage hero section.
      </p>

      <div className="rounded-2xl border p-6 flex flex-col gap-5" style={{ background: '#fff', borderColor: '#E4E4E7' }}>
        {STAT_KEYS.map(s => (
          <div key={s.key}>
            <label className="block text-sm font-bold mb-1.5" style={{ color: '#0D0D0D' }}>
              {s.label}{s.suffix && <span style={{ color: '#8B0000' }}>{s.suffix}</span>}
            </label>
            <input
              type="number"
              min={0}
              value={values[s.key] ?? ''}
              onChange={e => setValues(v => ({ ...v, [s.key]: Number(e.target.value) }))}
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
              style={{ borderColor: '#E4E4E7', background: '#F7F7F8' }}
              onFocus={e => e.target.style.borderColor = '#8B0000'}
              onBlur={e => e.target.style.borderColor = '#E4E4E7'}
            />
          </div>
        ))}

        <button
          onClick={save}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 mt-2"
          style={{ background: '#8B0000', color: '#fff' }}>
          <Save size={14} /> {saving ? 'Saving…' : 'Save Stats'}
        </button>
      </div>
    </div>
  );
}
