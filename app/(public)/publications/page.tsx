import { PUBLICATIONS, type Publication } from '@/lib/content/site-content';
import { FadeIn } from '../_components/FadeIn';
import { ArrowUpRight, FileText } from 'lucide-react';
import Link from 'next/link';

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
          <p className="text-xs font-semibold" style={{ color: '#A1A1AA' }}>
            Official KL SAC publications — downloadable PDFs
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

                    {pub.downloadAvailable && pub.url && (
                      <div className="shrink-0 hidden sm:flex items-center">
                        <Link
                          href={pub.url}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-full transition-all hover:opacity-80"
                          style={{ background: '#8B0000', color: '#fff' }}>
                          Download PDF <ArrowUpRight size={11} />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </FadeIn>

        </div>
      </section>
    </>
  );
}
