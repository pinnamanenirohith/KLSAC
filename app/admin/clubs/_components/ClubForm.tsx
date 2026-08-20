'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Save, Upload } from 'lucide-react';

const DOMAINS = [
  { code: 'TEC', slug: 'technology',     label: 'TEC — Technology' },
  { code: 'LCH', slug: 'liberal-arts',   label: 'LCH — Liberal Arts, Cultural & Hobby' },
  { code: 'HWB', slug: 'health-wellbeing', label: 'HWB — Health & Wellbeing' },
  { code: 'ESO', slug: 'social-outreach', label: 'ESO — Extension & Social Outreach' },
  { code: 'IIE', slug: 'innovation',     label: 'IIE — Innovation, Incubation & Entrepreneurship' },
];

interface Props { initial?: any; mode: 'create' | 'edit'; }

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function lines(arr: string[]) { return arr.join('\n'); }
function fromLines(s: string) { return s.split('\n').map(l => l.trim()).filter(Boolean); }

export default function ClubForm({ initial, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const initDomain = DOMAINS.find(d => d.code === initial?.domain_code) ?? DOMAINS[0];

  const [form, setForm] = useState({
    slug:            initial?.slug           ?? '',
    name:            initial?.name           ?? '',
    domain_code:     initial?.domain_code    ?? 'TEC',
    domain_slug:     initial?.domain_slug    ?? 'technology',
    tagline:         initial?.tagline        ?? '',
    about:           lines(initial?.about    ?? []),
    purpose:         initial?.purpose        ?? '',
    competencies:    lines(initial?.competencies ?? []),
    activities_list: lines(initial?.activities_list ?? []),
    logo_url:        initial?.logo_url       ?? '',
    sort_order:      initial?.sort_order     ?? 0,
  });

  function set(k: string, v: any) { setForm(f => ({ ...f, [k]: v })); }

  function setDomain(code: string) {
    const d = DOMAINS.find(x => x.code === code)!;
    setForm(f => ({ ...f, domain_code: d.code, domain_slug: d.slug }));
  }

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'clubs');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const d   = await res.json();
      if (!res.ok) throw new Error(d.error);
      set('logo_url', d.url);
      toast.success('Logo uploaded');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        slug:            form.slug || slugify(form.name),
        about:           fromLines(form.about),
        competencies:    fromLines(form.competencies),
        activities_list: fromLines(form.activities_list),
        sort_order:      Number(form.sort_order),
      };
      const res = await fetch('/api/admin/clubs', {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      toast.success(mode === 'create' ? 'Club created!' : 'Club updated!');
      router.push('/admin/clubs');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      <Field label="Club Name *">
        <input required value={form.name}
               onChange={e => { set('name', e.target.value); if (!initial) set('slug', slugify(e.target.value)); }}
               className={inp} style={sty} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Slug (URL) *">
          <input required value={form.slug}
                 onChange={e => set('slug', slugify(e.target.value))}
                 className={inp} style={sty} placeholder="auto-generated" />
        </Field>
        <Field label="Sort Order">
          <input type="number" value={form.sort_order}
                 onChange={e => set('sort_order', e.target.value)}
                 className={inp} style={sty} />
        </Field>
      </div>

      <Field label="Domain *">
        <select value={form.domain_code} onChange={e => setDomain(e.target.value)}
                className={inp} style={sty}>
          {DOMAINS.map(d => <option key={d.code} value={d.code}>{d.label}</option>)}
        </select>
      </Field>

      <Field label="Tagline">
        <input value={form.tagline} onChange={e => set('tagline', e.target.value)}
               className={inp} style={sty} placeholder="e.g. Where logic meets ambition." />
      </Field>

      <Field label="About (one paragraph per line — blank line = new paragraph)">
        <textarea rows={5} value={form.about} onChange={e => set('about', e.target.value)}
                  className={inp} style={sty} />
      </Field>

      <Field label="Purpose">
        <textarea rows={3} value={form.purpose} onChange={e => set('purpose', e.target.value)}
                  className={inp} style={sty} />
      </Field>

      <Field label="Competencies (one per line)">
        <textarea rows={4} value={form.competencies} onChange={e => set('competencies', e.target.value)}
                  className={inp} style={sty} placeholder="e.g.&#10;Competitive Programming&#10;Data Structures & Algorithms" />
      </Field>

      <Field label="Activities (one per line)">
        <textarea rows={4} value={form.activities_list} onChange={e => set('activities_list', e.target.value)}
                  className={inp} style={sty} placeholder="e.g.&#10;Weekly coding challenges&#10;National hackathon participation" />
      </Field>

      <Field label="Logo URL">
        <div className="flex flex-col gap-2">
          {form.logo_url && (
            <img src={form.logo_url} alt="logo preview"
                 className="w-16 h-16 rounded-xl object-contain border"
                 style={{ borderColor: '#E4E4E7', background: '#F7F7F8' }} />
          )}
          <input value={form.logo_url} onChange={e => set('logo_url', e.target.value)}
                 className={inp} style={sty} placeholder="Paste URL or upload" />
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold px-4 py-2.5 rounded-xl border w-fit transition-colors hover:bg-gray-50"
                 style={{ borderColor: '#E4E4E7', color: '#0D0D0D' }}>
            <Upload size={13} /> {uploading ? 'Uploading…' : 'Upload logo'}
            <input type="file" accept="image/*" className="hidden" onChange={uploadLogo} disabled={uploading} />
          </label>
        </div>
      </Field>

      <button type="submit" disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 disabled:opacity-50 w-fit"
              style={{ background: '#8B0000', color: '#fff' }}>
        <Save size={14} /> {saving ? 'Saving…' : mode === 'create' ? 'Create Club' : 'Save Changes'}
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
const sty = { borderColor: '#E4E4E7', background: '#F7F7F8' } as React.CSSProperties;
