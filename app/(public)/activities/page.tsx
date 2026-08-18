'use client';
import { useEffect, useState } from 'react';
import { Zap, Calendar, MapPin, Users, Filter } from 'lucide-react';
import { DEMO_ACTIVITIES, DOMAIN_META } from '@/lib/demo-data';

const DOMAIN_ORDER = ['all', 'TEC', 'LCH', 'HWB', 'ESO', 'IIE'];

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner:     '#22c55e',
  Intermediate: '#f59e0b',
  Advanced:     '#ef4444',
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<any[]>(DEMO_ACTIVITIES);
  const [domain,     setDomain]     = useState('all');
  const [loading,    setLoading]    = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = domain !== 'all' ? `?domain=${domain}` : '';
    fetch(`/api/public/activities${q}`)
      .then(r => r.json())
      .then(d => {
        const live = d.data ?? [];
        setActivities(live.length ? live : DEMO_ACTIVITIES.filter(a => domain === 'all' || a.domain === domain));
        setLoading(false);
      })
      .catch(() => {
        setActivities(DEMO_ACTIVITIES.filter(a => domain === 'all' || a.domain === domain));
        setLoading(false);
      });
  }, [domain]);

  const visible = activities.filter(a => domain === 'all' || a.domain === domain);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8" style={{ paddingTop: '112px', paddingBottom: '80px' }}>

      {/* Page header */}
      <div className="mb-12 text-center">
        <span className="text-xs font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full inline-block mb-4"
              style={{ background: '#fff0f0', color: '#8b0000' }}>
          Activities & Workshops
        </span>
        <h1 className="font-black mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em', color: '#0d0d0d' }}>
          Activities
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#71717a' }}>
          Browse all activities across domains. Register on the student portal to enroll and earn SDC credits.
        </p>
      </div>

      {/* Domain filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        <div className="flex items-center gap-1.5 mr-1" style={{ color: '#71717a' }}>
          <Filter size={14} />
          <span className="text-sm font-semibold">Filter:</span>
        </div>
        {DOMAIN_ORDER.map(d => {
          const meta    = DOMAIN_META[d];
          const color   = meta?.color ?? '#8b0000';
          const isAll   = d === 'all';
          const active  = domain === d;
          return (
            <button key={d}
                    onClick={() => setDomain(d)}
                    className="px-4 py-1.5 rounded-full text-sm font-black transition-all border"
                    style={{
                      background:  active ? (isAll ? '#8b0000' : color)  : '#fff',
                      color:       active ? '#fff'                        : (isAll ? '#374151' : color),
                      borderColor: active ? 'transparent'                 : (isAll ? '#e4e4e7' : `${color}40`),
                      boxShadow:   active ? `0 4px 12px ${isAll ? '#8b000060' : `${color}40`}` : 'none',
                    }}>
              {isAll ? 'All' : d}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border h-60 animate-pulse"
                 style={{ background: '#f4f4f5', borderColor: '#e4e4e7' }} />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-24" style={{ color: '#71717a' }}>
          <Zap size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-semibold">No activities found for this domain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((act: any) => {
            const meta   = DOMAIN_META[act.domain];
            const color  = meta?.color ?? '#8b0000';
            const diffColor = DIFFICULTY_COLOR[act.difficulty ?? 'Beginner'] ?? '#6b7280';
            return (
              <div key={act.code}
                   className="rounded-2xl border flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
                   style={{ background: '#fff', borderColor: '#e4e4e7' }}>
                {/* Domain color top bar */}
                <div className="h-1" style={{ background: color }} />

                <div className="p-6 flex flex-col gap-3 flex-1">
                  {/* Tags */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full"
                          style={{ background: `${color}15`, color }}>
                      {act.domain}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                          style={{ background: `${diffColor}12`, color: diffColor }}>
                      {act.difficulty ?? 'Beginner'}
                    </span>
                  </div>

                  <h2 className="font-bold text-lg leading-snug text-gray-900">{act.title}</h2>

                  <p className="text-sm line-clamp-2 flex-1" style={{ color: '#71717a' }}>
                    {act.description}
                  </p>

                  {/* Meta */}
                  <div className="grid grid-cols-2 gap-2 text-xs mt-auto pt-3"
                       style={{ borderTop: '1px solid #f0f0f0', color: '#71717a' }}>
                    <span className="flex items-center gap-1.5 font-semibold" style={{ color: '#c9a84c' }}>
                      <Zap size={12} /> {act.sdc_credits ?? 0} SDC Credits
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={12} /> {act.enrolledCount ?? 0} enrolled
                    </span>
                    {act.activity_date && (
                      <span className="flex items-center gap-1.5 col-span-2">
                        <Calendar size={12} />
                        {new Date(act.activity_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                    {act.venue && (
                      <span className="flex items-center gap-1.5 col-span-2">
                        <MapPin size={12} /> {act.venue}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
