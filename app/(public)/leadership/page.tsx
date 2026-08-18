import { LEADERSHIP, type LeadershipProfile } from '@/lib/content/site-content';
import { FadeIn, Stagger } from '../_components/FadeIn';

export const metadata = {
  title: 'Leadership & Governance',
  description: 'The people and structure that guide KL SAC — leadership, advisory board, and governance framework.',
};

export default function LeadershipPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0F', paddingTop: '92px', paddingBottom: '72px' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-5" style={{ color: '#C9A84C' }}>
            Governance
          </p>
          <h1
            className="font-black leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#FFFFFF', letterSpacing: '-0.025em', maxWidth: '22ch' }}>
            Leadership & Governance
          </h1>
          <p className="text-lg leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.42)', maxWidth: '54ch' }}>
            The faculty, student leaders, and administrative team that make KL SAC function.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
            [PLACEHOLDER — Official leadership directory to be provided by SAC administration]
          </p>
        </div>
      </section>

      {/* ─── Leadership profiles ──────────────────────────────────────── */}
      <section style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20">
          <FadeIn>
            <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-10" style={{ color: '#8B0000' }}>
              SAC Leadership Team
            </p>
          </FadeIn>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEADERSHIP.map((person: LeadershipProfile) => (
              <div
                key={person.id}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{ border: '1px solid #E4E4E7', background: '#FAFAFA', opacity: person.isOfficial ? 1 : 0.7 }}>

                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                  style={{ background: '#E4E4E7', color: '#A1A1AA' }}>
                  {person.name.startsWith('[') ? '?' : person.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm leading-tight" style={{ color: '#0D0D0D' }}>
                    {person.isOfficial ? person.name : '[Name Pending]'}
                  </p>
                  <p className="text-xs mt-0.5 font-semibold" style={{ color: '#8B0000' }}>
                    {person.title}
                  </p>
                  {person.department && (
                    <p className="text-xs mt-0.5" style={{ color: '#A1A1AA' }}>
                      {person.department}
                    </p>
                  )}
                  {!person.isOfficial && (
                    <p className="text-[10px] mt-1.5" style={{ color: '#D4D4D8' }}>
                      [PLACEHOLDER — awaiting official data]
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Governance Framework ─────────────────────────────────────── */}
      <section style={{ background: '#0A0A0F' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20">
          <FadeIn>
            <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-5" style={{ color: '#C9A84C' }}>
              Governance Framework
            </p>
            <h2
              className="font-black leading-tight mb-10"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#fff', letterSpacing: '-0.02em' }}>
              How SAC is organised.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
              {[
                { title: 'Faculty Oversight', desc: 'SAC operates under direct university faculty supervision, ensuring alignment with academic and institutional values.' },
                { title: 'Student Leadership', desc: 'Elected and appointed student officers manage day-to-day operations of each domain and its clubs.' },
                { title: 'Five Domain Structure', desc: 'All 25 clubs are organised into five domains — each with a dedicated coordinator and advisory faculty.' },
                { title: 'Student Development Commission', desc: 'An SDC framework awards credits for participation, enabling holistic development tracking across all activities.' },
                { title: 'Annual Review', desc: 'All clubs and domains undergo an annual performance review with student and faculty participation.' },
                { title: 'Open Membership', desc: 'Any enrolled KL University student may join clubs and participate in activities regardless of branch or year.' },
              ].map(item => (
                <div key={item.title} className="p-7" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <h3 className="font-bold text-base mb-2" style={{ color: '#fff' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
