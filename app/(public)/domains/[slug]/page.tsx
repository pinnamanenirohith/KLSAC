import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { getDomainBySlug, DOMAIN_SLUGS } from '@/lib/content/domains';
import { getClubsByDomain } from '@/lib/content/clubs';
import { FadeIn } from '../../_components/FadeIn';

export function generateStaticParams() {
  return DOMAIN_SLUGS.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = getDomainBySlug(slug);
  if (!domain) return {};
  return {
    title: `${domain.name}`,
    description: domain.description,
  };
}

export default async function DomainDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = getDomainBySlug(slug);
  if (!domain) notFound();

  const clubs = getClubsByDomain(domain.code);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: '92px',
          paddingBottom: '72px',
          background: `linear-gradient(135deg, ${domain.color}22 0%, ${domain.color}08 100%)`,
          borderBottom: `2px solid ${domain.color}20`,
        }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <Link
            href="/domains"
            className="inline-flex items-center gap-2 text-xs font-bold mb-8 transition-opacity hover:opacity-70"
            style={{ color: '#71717A' }}>
            <ArrowLeft size={12} />
            All Domains
          </Link>

          <div className="flex items-start gap-5 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-lg shrink-0"
              style={{ background: domain.accentBg, color: domain.color }}>
              {domain.code}
            </div>
            <div>
              <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: domain.color }}>
                Domain
              </p>
              <h1
                className="font-black leading-tight"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', color: '#0D0D0D', letterSpacing: '-0.025em' }}>
                {domain.name}
              </h1>
            </div>
          </div>

          <p
            className="font-bold text-xl sm:text-2xl mb-6"
            style={{ color: domain.color, letterSpacing: '-0.01em' }}>
            {domain.tagline}
          </p>

          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <span className="font-black text-2xl" style={{ color: domain.color }}>
                {domain.clubCount}
              </span>
              <span className="ml-2" style={{ color: '#71717A' }}>Clubs</span>
            </div>
            <div>
              <span className="font-black text-2xl" style={{ color: domain.color }}>
                {domain.competencies.length}
              </span>
              <span className="ml-2" style={{ color: '#71717A' }}>Competencies developed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About ────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <FadeIn className="lg:col-span-2">
              <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-5"
                 style={{ color: domain.color }}>
                About This Domain
              </p>
              <h2
                className="font-black leading-tight mb-8"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#0D0D0D', letterSpacing: '-0.02em' }}>
                {domain.headline}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#71717A', maxWidth: '68ch' }}>
                {domain.philosophy}
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-5"
                 style={{ color: '#A1A1AA' }}>
                Competencies Developed
              </p>
              <ul className="flex flex-col gap-3">
                {domain.competencies.map(c => (
                  <li key={c} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ background: domain.color }} />
                    <span className="text-sm leading-relaxed" style={{ color: '#3F3F46' }}>{c}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Clubs in this domain ─────────────────────────────────────── */}
      <section style={{ background: '#F7F7F8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-24">
          <FadeIn className="mb-12">
            <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-4"
               style={{ color: domain.color }}>
              {domain.clubCount} Clubs in {domain.shortName}
            </p>
            <h2
              className="font-black leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#0D0D0D', letterSpacing: '-0.02em' }}>
              Find your community.
            </h2>
          </FadeIn>

          <FadeIn>
            <div style={{ borderTop: '1px solid #E4E4E7' }}>
              {clubs.map(club => (
                <Link
                  key={club.slug}
                  href={`/clubs/${club.slug}`}
                  className="group flex items-center gap-6 py-5 transition-colors hover:bg-white/50"
                  style={{ borderBottom: '1px solid #E4E4E7' }}>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base sm:text-lg leading-tight text-gray-900 group-hover:text-gray-600 transition-colors mb-1">
                      {club.name}
                    </p>
                    <p className="text-sm" style={{ color: '#A1A1AA' }}>{club.tagline}</p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                    style={{ color: '#D1D1D6' }} />
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: domain.color }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="font-black text-2xl sm:text-3xl mb-2 leading-tight"
              style={{ color: '#fff', letterSpacing: '-0.02em' }}>
              Explore {domain.shortName} clubs.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>
              Register for a club and start building your development record.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href={`/clubs#${domain.code}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-[1.03]"
              style={{ background: '#fff', color: domain.color }}>
              See All Clubs
              <ArrowRight size={14} />
            </Link>
            <Link
              href="https://sac.kluniversity.in"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:bg-white/15"
              style={{ border: '1px solid rgba(255,255,255,0.35)', color: '#fff' }}>
              Student Dashboard
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
