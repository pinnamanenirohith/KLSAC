'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

const CLUBS: Record<string, { slug: string; name: string }[]> = {
  TEC: [
    { slug: 'zeroone-code-club',    name: 'ZeroOne Code Club' },
    { slug: 'cyber-security-club',  name: 'Cyber Security Club' },
    { slug: 'webapps-club',         name: 'WebApps Club' },
    { slug: 'electric-vehicle-club',name: 'Electric Vehicle Club' },
    { slug: 'automation-club',      name: 'Automation Club' },
  ],
  LCH: [
    { slug: 'swara-music-club',     name: 'Swara Music Club' },
    { slug: 'dance-club',           name: 'Dance Club' },
    { slug: 'theatre-arts-club',    name: 'Theatre Arts Club' },
    { slug: 'short-film-makers-club', name: 'Short Film Makers Club' },
    { slug: 'photography-club',     name: 'Photography Club' },
    { slug: 'arts-painting-club',   name: 'Arts / Painting Club' },
    { slug: 'handicrafts-club',     name: 'Handicrafts Club' },
    { slug: 'vastraa-fashion-club', name: 'Vastraa (Fashion) Club' },
    { slug: 'adventure-club',       name: 'Adventure Club' },
    { slug: 'kl-esports-club',      name: 'KL eSports Club' },
    { slug: 'vachas-club',          name: 'Vachas Club' },
  ],
  HWB: [
    { slug: 'safelife-club',   name: 'SafeLife Club' },
    { slug: 'yoga-club',       name: 'Yoga Club' },
    { slug: 'marathon-club',   name: 'Marathon Club' },
  ],
  ESO: [
    { slug: 'yuva-tourism-club',      name: 'Yuva Tourism Club' },
    { slug: 'spiritual-sciences-club',name: 'Spiritual Sciences Club' },
    { slug: 'kl-youth-policy-club',   name: 'KL Youth Policy Club' },
  ],
  IIE: [
    { slug: 'acic', name: 'ACIC' },
    { slug: 'tbi',  name: 'TBI'  },
  ],
};

const ALL_CLUBS = Object.values(CLUBS).flat();

interface Props { initial?: any; mode: 'create' | 'edit'; }

export default function ActivityForm({ initial, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    code:          initial?.code          ?? '',
    club_slug:     initial?.club_slug     ?? 'zeroone-code-club',
    domain:        initial?.domain        ?? 'TEC',
    title:         initial?.title         ?? '',
    description:   initial?.description   ?? '',
    competencies:  initial?.competencies  ?? '',
    activity_date: initial?.activity_date ?? new Date().toISOString().split('T')[0],
    venue:         initial?.venue         ?? '',
    time_slot:     initial?.time_slot     ?? '',
    difficulty:    initial?.difficulty    ?? 'Beginner',
    sdc_credits:   initial?.sdc_credits   ?? 3,
  });

  function set(k: string, v: any) { setForm(f => ({ ...f, [k]: v })); }

  function onDomainChange(d: string) {
    set('domain', d);
    const first = CLUBS[d]?.[0];
    if (first) set('club_slug', first.slug);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/activities', {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      toast.success(mode === 'create' ? 'Activity added!' : 'Activity updated!');
      router.push('/admin/activities');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  const clubsForDomain = CLUBS[form.domain] ?? ALL_CLUBS;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      {/* Code */}
      {mode === 'create' && (
        <Field label="Activity Code * (unique, e.g. ZC-A11)">
          <input required value={form.code} onChange={e => set('code', e.target.value)}
                 className={inp} style={is} placeholder="e.g. YC-A03" />
        </Field>
      )}

      {/* Domain + Club */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Domain *">
          <select value={form.domain} onChange={e => onDomainChange(e.target.value)} className={inp} style={is}>
            {['TEC','LCH','HWB','ESO','IIE'].map(d => <option key={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Club *">
          <select value={form.club_slug} onChange={e => set('club_slug', e.target.value)} className={inp} style={is}>
            {clubsForDomain.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </Field>
      </div>

      {/* Title */}
      <Field label="Activity Title *">
        <input required value={form.title} onChange={e => set('title', e.target.value)}
               className={inp} style={is} />
      </Field>

      {/* Date + Time */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Date *">
          <input required type="date" value={form.activity_date}
                 onChange={e => set('activity_date', e.target.value)} className={inp} style={is} />
        </Field>
        <Field label="Time (optional)">
          <input value={form.time_slot} onChange={e => set('time_slot', e.target.value)}
                 className={inp} style={is} placeholder="e.g. 5:30 PM – 7:00 PM" />
        </Field>
      </div>

      {/* Venue */}
      <Field label="Venue">
        <input value={form.venue} onChange={e => set('venue', e.target.value)}
               className={inp} style={is} placeholder="e.g. SAC Hall, KL University" />
      </Field>

      {/* Difficulty + Credits */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Difficulty">
          <select value={form.difficulty} onChange={e => set('difficulty', e.target.value)} className={inp} style={is}>
            {['Beginner','Intermediate','Advanced'].map(d => <option key={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="SDC Credits">
          <select value={form.sdc_credits} onChange={e => set('sdc_credits', Number(e.target.value))} className={inp} style={is}>
            {[3,4,5].map(n => <option key={n}>{n}</option>)}
          </select>
        </Field>
      </div>

      {/* Description */}
      <Field label="Description">
        <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)}
                  className={inp} style={is} />
      </Field>

      {/* Competencies */}
      <Field label="Competencies (comma-separated)">
        <input value={form.competencies} onChange={e => set('competencies', e.target.value)}
               className={inp} style={is} placeholder="e.g. Leadership, Teamwork, Communication" />
      </Field>

      <button type="submit" disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 disabled:opacity-50 w-fit"
              style={{ background: '#8B0000', color: '#fff' }}>
        <Save size={14} /> {saving ? 'Saving…' : mode === 'create' ? 'Add Activity' : 'Save Changes'}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold" style={{ color: '#0D0D0D' }}>{label}</label>
      {children}
    </div>
  );
}

const inp = 'w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all';
const is  = { borderColor: '#E4E4E7', background: '#F7F7F8' } as React.CSSProperties;
