import { ACHIEVEMENTS, type Achievement } from '@/lib/content/site-content';
import { FadeIn } from '../_components/FadeIn';

export const metadata = {
  title: 'Achievements',
  description: 'Recognition, milestones, and achievements from KL SAC clubs and students.',
};

const DOMAIN_COLORS: Record<string, string> = {
  TEC: '#8B0000', LCH: '#B91C1C', HWB: '#7C0000', ESO: '#991B1B', IIE: '#C53030',
};

const LEVEL_STYLES: Record<string, { bg: string; color: string }> = {
  International: { bg: 'rgba(139,0,0,0.08)', color: '#8B0000' },
  National:      { bg: 'rgba(139,0,0,0.08)', color: '#8B0000' },
  State:         { bg: 'rgba(124,0,0,0.08)', color: '#7C0000' },
  University:    { bg: '#F4F4F5',            color: '#52525B' },
};

export default function AchievementsPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0F', paddingTop: '92px', paddingBottom: '72px' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-5" style={{ color: '#8B0000' }}>
            Achievements
          </p>
          <h1
            className="font-black leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#FFFFFF', letterSpacing: '-0.025em', maxWidth: '18ch' }}>
            What Our Students Have Built.
          </h1>
          <p className="text-lg leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.42)', maxWidth: '56ch' }}>
            Competitions won, recognitions earned, and milestones crossed — by KL SAC students.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
            [PLACEHOLDER — Official achievements to be populated from institutional records]
          </p>
        </div>
      </section>

      {/* ─── Achievements list ────────────────────────────────────────── */}
      <section style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20">
          <FadeIn>
            <div style={{ borderTop: '1px solid #E4E4E7' }}>
              {ACHIEVEMENTS.map((ach: Achievement, i) => {
                const domainColor = DOMAIN_COLORS[ach.domainCode] ?? '#8B0000';
                const levelStyle = LEVEL_STYLES[ach.level] ?? LEVEL_STYLES.University;
                return (
                  <div
                    key={ach.id}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-7"
                    style={{ borderBottom: '1px solid #E4E4E7', opacity: ach.title.startsWith('[PLACEHOLDER') ? 0.6 : 1 }}>

                    {/* Year */}
                    <div className="sm:w-16 shrink-0">
                      <span className="font-black text-base" style={{ color: '#0D0D0D' }}>
                        {ach.year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                          style={{ background: levelStyle.bg, color: levelStyle.color }}>
                          {ach.level}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: domainColor }}>
                          {ach.domainCode} · {ach.clubName}
                        </span>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg leading-snug mb-1" style={{ color: '#0D0D0D' }}>
                        {ach.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#71717A' }}>
                        {ach.description}
                      </p>
                      {ach.organization && (
                        <p className="text-xs mt-2 font-semibold" style={{ color: '#A1A1AA' }}>
                          {ach.organization}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn>
            <div
              className="mt-16 p-8 rounded-2xl text-center"
              style={{ background: '#FAFAFA', border: '1px dashed #D4D4D8' }}>
              <p className="font-bold text-base mb-2" style={{ color: '#0D0D0D' }}>
                More achievements coming soon
              </p>
              <p className="text-sm" style={{ color: '#A1A1AA' }}>
                This page will be populated with verified achievement records from institutional sources.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
