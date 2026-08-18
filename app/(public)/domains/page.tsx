import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DOMAINS } from '@/lib/content/domains';
import { FadeIn } from '../_components/FadeIn';

export const metadata = {
  title: 'Domains',
  description: 'Five domains. Twenty-five clubs. Every student passion covered.',
};

export default function DomainsPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0F', paddingTop: '92px', paddingBottom: '72px' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-5" style={{ color: '#8B0000' }}>
            Discovery
          </p>
          <h1
            className="font-black leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#FFFFFF', letterSpacing: '-0.025em', maxWidth: '20ch' }}>
            Five Domains.<br />Every Passion.
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '56ch' }}>
            KL SAC organises all 25 clubs into five domains — each with a distinct purpose, philosophy, and community. Find yours.
          </p>
        </div>
      </section>

      {/* ─── Domain List ──────────────────────────────────────────────── */}
      <section style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20">
          <div className="flex flex-col gap-0" style={{ borderTop: '1px solid #E4E4E7' }}>
            {DOMAINS.map((d, i) => (
              <FadeIn key={d.code} delay={i * 0.08}>
                <Link
                  href={`/domains/${d.slug}`}
                  className="group flex flex-col sm:flex-row gap-6 sm:gap-10 py-10 transition-all"
                  style={{ borderBottom: '1px solid #E4E4E7' }}>

                  {/* Left: Code + Badge */}
                  <div className="flex items-start gap-4 sm:w-56 shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                      style={{ background: d.accentBg, color: d.color }}>
                      {d.code}
                    </div>
                    <div>
                      <p className="font-black text-base leading-tight" style={{ color: '#0D0D0D' }}>
                        {d.shortName}
                      </p>
                      <p className="text-xs font-semibold mt-1" style={{ color: d.color }}>
                        {d.clubCount} clubs
                      </p>
                    </div>
                  </div>

                  {/* Middle: Description + competencies */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg mb-1" style={{ color: '#0D0D0D' }}>
                      {d.name}
                    </p>
                    <p className="text-base mb-4 italic" style={{ color: '#A1A1AA' }}>
                      {d.tagline}
                    </p>
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: '#71717A' }}>
                      {d.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {d.competencies.slice(0, 4).map(c => (
                        <span
                          key={c}
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: d.accentBg, color: d.textColor }}>
                          {c}
                        </span>
                      ))}
                      {d.competencies.length > 4 && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                              style={{ background: '#F4F4F5', color: '#71717A' }}>
                          +{d.competencies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Arrow */}
                  <div className="hidden sm:flex items-center">
                    <ArrowRight
                      size={22}
                      className="transition-transform group-hover:translate-x-1.5"
                      style={{ color: '#D1D1D6' }} />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Browse Clubs CTA ─────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0F' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20 text-center">
          <h2
            className="font-black leading-tight mb-5"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#fff', letterSpacing: '-0.02em' }}>
            Ready to explore the clubs?
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.42)' }}>
            Browse all 25 clubs across the five domains and find the one that matches your ambition.
          </p>
          <Link
            href="/clubs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-base transition-all hover:scale-[1.03]"
            style={{ background: '#8B0000', color: '#fff' }}>
            Browse All 25 Clubs
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
