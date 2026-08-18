import { PUBLICATIONS, type Publication } from '@/lib/content/site-content';
import { FadeIn } from '../_components/FadeIn';
import { ArrowUpRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Publications',
  description: 'Annual reports, magazines, and research publications from KL SAC.',
};

const TYPE_COLORS: Record<string, string> = {
  'Annual Report': '#8B0000',
  'Magazine':      '#B91C1C',
  'Research':      '#7C0000',
  'Newsletter':    '#991B1B',
};

export default function PublicationsPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', paddingTop: '92px', paddingBottom: '56px' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 pt-8">
          <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-4" style={{ color: '#8B0000' }}>
            Publications
          </p>
          <h1
            className="font-black leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#0D0D0D', letterSpacing: '-0.025em' }}>
            Reports & Publications
          </h1>
          <p className="text-lg mb-4" style={{ color: '#71717A', maxWidth: '52ch' }}>
            Annual reports, magazines, and documentation from KL SAC.
          </p>
          <p className="text-xs" style={{ color: '#D4D4D8' }}>
            [PLACEHOLDER — Official publications to be provided by SAC administration]
          </p>
        </div>
      </section>

      {/* ─── Publications List ────────────────────────────────────────── */}
      <section style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 pb-24">
          <FadeIn>
            <div style={{ borderTop: '1px solid #E4E4E7' }}>
              {PUBLICATIONS.map((pub: Publication) => {
                const typeColor = TYPE_COLORS[pub.type] ?? '#8B0000';
                return (
                  <div
                    key={pub.id}
                    className="group flex items-start gap-5 sm:gap-8 py-7"
                    style={{ borderBottom: '1px solid #E4E4E7' }}>

                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${typeColor}15` }}>
                      <FileText size={18} style={{ color: typeColor }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1.5">
                        <span
                          className="text-[10px] font-black uppercase tracking-widest"
                          style={{ color: typeColor }}>
                          {pub.type}
                        </span>
                        <span className="text-[10px] font-bold" style={{ color: '#C7C7CC' }}>
                          {pub.year}
                        </span>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg leading-snug mb-1" style={{ color: '#0D0D0D' }}>
                        {pub.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#71717A' }}>
                        {pub.description}
                      </p>
                    </div>

                    {pub.downloadAvailable && (
                      <div className="shrink-0 hidden sm:flex items-center">
                        <span
                          className="inline-flex items-center gap-1 text-xs font-bold"
                          style={{ color: '#8B0000' }}>
                          Download <ArrowUpRight size={11} />
                        </span>
                      </div>
                    )}
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
                Official publications coming soon
              </p>
              <p className="text-sm" style={{ color: '#A1A1AA' }}>
                SAC administration will provide verified annual reports and publications for display here.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
