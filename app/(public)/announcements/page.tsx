import { Megaphone, AlertTriangle, Calendar, Bell } from 'lucide-react';
import { DEMO_ANNOUNCEMENTS } from '@/lib/demo-data';

export const revalidate = 30;
export const metadata   = { title: 'Announcements' };

async function getAnnouncements() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const res  = await fetch(`${base}/api/public/announcements`, { next: { revalidate: 30 } });
    const json = await res.json();
    return json.data?.length ? json.data : DEMO_ANNOUNCEMENTS;
  } catch { return DEMO_ANNOUNCEMENTS; }
}

const TYPE_CONFIG = {
  urgent:  {
    icon:        AlertTriangle,
    border:      '#ef4444',
    bg:          '#fef2f2',
    label:       'Urgent',
    labelColor:  '#dc2626',
    badgeBg:     '#fee2e2',
  },
  event:   {
    icon:        Calendar,
    border:      '#8B0000',
    bg:          '#fff5f5',
    label:       'Event',
    labelColor:  '#8B0000',
    badgeBg:     'rgba(139,0,0,0.1)',
  },
  general: {
    icon:        Megaphone,
    border:      '#d1d5db',
    bg:          '#ffffff',
    label:       'General',
    labelColor:  '#6b7280',
    badgeBg:     '#f3f4f6',
  },
};

export default async function AnnouncementsPage() {
  const items = await getAnnouncements();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8" style={{ paddingTop: '112px', paddingBottom: '80px' }}>

      {/* Page header */}
      <div className="mb-14 text-center">
        <span className="text-xs font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full inline-block mb-4"
              style={{ background: '#fff0f0', color: '#8b0000' }}>
          Official Notices
        </span>
        <h1 className="font-black mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em', color: '#0d0d0d' }}>
          Announcements
        </h1>
        <p className="text-lg" style={{ color: '#71717a' }}>
          Official notices and updates from KL SAC.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24" style={{ color: '#71717a' }}>
          <Bell size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-semibold">No announcements at this time.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item: any) => {
            const cfg  = TYPE_CONFIG[item.type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG.general;
            const Icon = cfg.icon;
            return (
              <article key={item.id}
                       className="rounded-2xl border-l-4 overflow-hidden"
                       style={{
                         borderLeftColor: cfg.border,
                         background:      cfg.bg,
                         border:          `1px solid ${cfg.border}30`,
                         borderLeft:      `4px solid ${cfg.border}`,
                       }}>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                         style={{ background: cfg.badgeBg }}>
                      <Icon size={18} style={{ color: cfg.labelColor }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header row */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full"
                              style={{ background: cfg.badgeBg, color: cfg.labelColor }}>
                          {cfg.label}
                        </span>
                        <span className="text-xs" style={{ color: '#9ca3af' }}>
                          {new Date(item.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'long', year: 'numeric',
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-bold text-base mb-2 leading-snug text-gray-900">{item.title}</h2>

                      {/* Content */}
                      <p className="text-sm leading-relaxed" style={{ color: '#4b5563' }}>{item.content}</p>

                      {/* Expiry */}
                      {item.expires_at && (
                        <p className="text-xs mt-3 flex items-center gap-1" style={{ color: '#9ca3af' }}>
                          <Calendar size={11} />
                          Valid until: {new Date(item.expires_at).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
