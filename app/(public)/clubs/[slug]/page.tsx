import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { getClubBySlug, CLUB_SLUGS } from '@/lib/content/clubs';
import { getDomainByCode } from '@/lib/content/domains';
import { DEMO_CLUBS } from '@/lib/demo-data';
import { FadeIn } from '../../_components/FadeIn';

export function generateStaticParams() {
  return CLUB_SLUGS.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) return {};
  return {
    title: `${club.name}`,
    description: club.tagline,
  };
}

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const domain = getDomainByCode(club.domainCode);
  if (!domain) notFound();

  // Get member count from demo data
  const demoClub = DEMO_CLUBS.find(dc => dc.name === club.name);
  const memberCount = demoClub?.memberCount ?? null;
  const memberLimit = demoClub?.memberLimit ?? null;

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: '92px',
          paddingBottom: '72px',
          background: `linear-gradient(135deg, ${domain.color}18 0%, ${domain.color}06 100%)`,
          borderBottom: `1px solid ${domain.color}18`,
        }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <Link
            href={`/domains/${domain.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold mb-8 transition-opacity hover:opacity-70"
            style={{ color: domain.color }}>
            <ArrowLeft size={12} />
            {domain.shortName} Domain
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{ background: domain.accentBg, color: domain.color }}>
              {domain.code}
            </span>
          </div>

          <h1
            className="font-black leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', color: '#0D0D0D', letterSpacing: '-0.025em' }}>
            {club.name}
          </h1>

          <p className="text-lg sm:text-xl font-medium mb-6 italic" style={{ color: domain.color }}>
            "{club.tagline}"
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="https://sac.kluniversity.in"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-[1.03]"
              style={{ background: domain.color, color: '#fff' }}>
              Register on Student Dashboard
              <ArrowUpRight size={14} />
            </Link>
            {memberCount != null && memberLimit != null && (
              <span className="text-sm" style={{ color: '#71717A' }}>
                <span className="font-bold" style={{ color: '#0D0D0D' }}>{memberCount}</span>
                {' '}/{' '}{memberLimit} members
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ─── About ────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-6"
                   style={{ color: domain.color }}>
                  About the Club
                </p>
                <div className="flex flex-col gap-5">
                  {club.about.map((para, i) => (
                    <p key={i} className="text-base sm:text-lg leading-relaxed" style={{ color: '#3F3F46' }}>
                      {para}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={0.1}>
                {/* Purpose */}
                <div className="rounded-2xl p-6 mb-6" style={{ background: '#F7F7F8', border: '1px solid #E4E4E7' }}>
                  <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-3"
                     style={{ color: '#A1A1AA' }}>
                    Our Purpose
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#3F3F46' }}>
                    {club.purpose}
                  </p>
                </div>

                {/* Domain link */}
                <Link
                  href={`/domains/${domain.slug}`}
                  className="flex items-center gap-3 p-4 rounded-xl transition-colors hover:bg-gray-50 group"
                  style={{ border: '1px solid #E4E4E7' }}>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-xs shrink-0"
                    style={{ background: domain.accentBg, color: domain.color }}>
                    {domain.code}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black uppercase tracking-wider" style={{ color: domain.color }}>
                      {domain.shortName} Domain
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#A1A1AA' }}>
                      {domain.tagline}
                    </p>
                  </div>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" style={{ color: '#D1D1D6' }} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Competencies ─────────────────────────────────────────────── */}
      <section style={{ background: '#F7F7F8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20">
          <FadeIn>
            <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-8"
               style={{ color: domain.color }}>
              Competencies You'll Develop
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {club.competencies.map(c => (
                <div key={c} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: domain.color }} />
                  <span className="text-sm font-semibold" style={{ color: '#3F3F46' }}>{c}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Activities ───────────────────────────────────────────────── */}
      <section style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20">
          <FadeIn>
            <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-8" style={{ color: '#8B0000' }}>
              What We Do
            </p>
            <div className="max-w-2xl" style={{ borderTop: '1px solid #E4E4E7' }}>
              {club.activities.map((activity, i) => (
                <div
                  key={i}
                  className="flex gap-6 py-5"
                  style={{ borderBottom: '1px solid #E4E4E7' }}>
                  <span
                    className="font-black text-2xl leading-none shrink-0 pt-0.5"
                    style={{ color: '#E8E8EC', width: '2rem', fontVariantNumeric: 'tabular-nums' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                    {activity}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Join CTA ─────────────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0F' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <h2
                  className="font-black text-2xl sm:text-3xl mb-2 leading-tight"
                  style={{ color: '#fff', letterSpacing: '-0.02em' }}>
                  Ready to join {club.name}?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Register on the Student Dashboard to join this club and start earning SDC credits.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 shrink-0">
                <Link
                  href="https://sac.kluniversity.in"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-[1.03]"
                  style={{ background: '#8B0000', color: '#fff' }}>
                  Register on Dashboard
                  <ArrowUpRight size={14} />
                </Link>
                <Link
                  href="/clubs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                  Browse All Clubs
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
