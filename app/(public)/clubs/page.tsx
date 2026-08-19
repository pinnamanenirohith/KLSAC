'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DOMAINS } from '@/lib/content/domains';
import { CLUBS } from '@/lib/content/clubs';
import { DEMO_CLUBS } from '@/lib/demo-data';

type Filter = 'all' | 'TEC' | 'LCH' | 'HWB' | 'ESO' | 'IIE';

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All Clubs' },
  { value: 'TEC', label: 'Technology' },
  { value: 'LCH', label: 'Liberal Arts' },
  { value: 'HWB', label: 'Health & Wellbeing' },
  { value: 'ESO', label: 'Social Outreach' },
  { value: 'IIE', label: 'Innovation' },
];

export default function ClubsPage() {
  const [filter, setFilter] = useState<Filter>('all');

  const visibleDomains = DOMAINS.filter(d => filter === 'all' || d.code === filter);

  // Build a member count map from DEMO_CLUBS
  const memberMap: Record<string, number> = {};
  DEMO_CLUBS.forEach(dc => {
    const club = CLUBS.find(c => c.name === dc.name);
    if (club) memberMap[club.slug] = dc.memberCount ?? 0;
  });

  return (
    <>
      {/* â”€â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ background: '#fff', paddingTop: '92px', paddingBottom: '0' }}>
        <div className="w-full px-6 sm:px-12 xl:px-20 pt-10 pb-0">
          <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-4" style={{ color: '#8B0000' }}>
            25 Clubs Â· 5 Domains
          </p>
          <h1
            className="font-black leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#0D0D0D', letterSpacing: '-0.025em' }}>
            Find Your Community.
          </h1>
          <p className="text-lg mb-10" style={{ color: '#71717A', maxWidth: '56ch' }}>
            Twenty-five clubs across five domains. Every passion, every ambition â€” there's a club for you at KL SAC.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 pb-0">
            {FILTER_OPTIONS.map(opt => {
              const domain = DOMAINS.find(d => d.code === opt.value);
              const isActive = filter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className="px-4 py-2 rounded-full text-sm font-bold transition-all"
                  style={{
                    background:  isActive ? (domain?.color ?? '#8B0000') : '#F7F7F8',
                    color:       isActive ? '#fff' : '#3F3F46',
                    border:      isActive ? 'none' : '1px solid #E4E4E7',
                  }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ Club List â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ background: '#fff' }}>
        <div className="w-full px-6 sm:px-12 xl:px-20 pt-10 pb-24">
          {visibleDomains.map(domain => {
            const domainClubs = CLUBS.filter(c => c.domainCode === domain.code);
            return (
              <div key={domain.code} id={domain.code} className="mb-16">
                {/* Domain header */}
                <div
                  className="flex items-center gap-4 py-5 mb-2"
                  style={{ borderBottom: `2px solid ${domain.color}25` }}>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs shrink-0"
                    style={{ background: domain.accentBg, color: domain.color }}>
                    {domain.code}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-base sm:text-lg leading-tight" style={{ color: '#0D0D0D' }}>
                      {domain.name}
                    </p>
                    <p className="text-xs mt-0.5 italic" style={{ color: domain.color }}>
                      {domain.tagline}
                    </p>
                  </div>
                  <Link
                    href={`/domains/${domain.slug}`}
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
                    style={{ color: domain.color }}>
                    About this domain <ArrowRight size={11} />
                  </Link>
                </div>

                {/* Club rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0" style={{ borderTop: '1px solid #F0F0F0' }}>
                  {domainClubs.map(club => (
                    <Link
                      key={club.slug}
                      href={`/clubs/${club.slug}`}
                      className="group flex items-center gap-4 py-4 px-2 transition-colors hover:bg-gray-50 rounded-lg"
                      style={{ borderBottom: '1px solid #F4F4F5' }}>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base leading-tight text-gray-900 group-hover:text-gray-600 transition-colors">
                          {club.name}
                        </p>
                        <p className="text-xs mt-0.5 line-clamp-1" style={{ color: '#A1A1AA' }}>
                          {club.tagline}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {memberMap[club.slug] != null && (
                          <span className="text-xs" style={{ color: '#C7C7CC' }}>
                            {memberMap[club.slug]} members
                          </span>
                        )}
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                          style={{ color: '#D1D1D6' }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

