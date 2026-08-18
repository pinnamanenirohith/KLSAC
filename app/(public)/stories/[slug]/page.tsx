import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { STUDENT_STORIES, STORY_SLUGS } from '@/lib/content/site-content';
import { FadeIn } from '../../_components/FadeIn';

const DOMAIN_COLORS: Record<string, string> = {
  TEC: '#8B0000', LCH: '#B91C1C', HWB: '#7C0000', ESO: '#991B1B', IIE: '#C53030',
};

export function generateStaticParams() {
  return STORY_SLUGS.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = STUDENT_STORIES.find(s => s.slug === slug);
  if (!story) return {};
  return {
    title: `${story.title} — KL SAC Stories`,
    description: story.excerpt,
  };
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = STUDENT_STORIES.find(s => s.slug === slug);
  if (!story) notFound();

  const idx = STUDENT_STORIES.indexOf(story);
  const next = STUDENT_STORIES[(idx + 1) % STUDENT_STORIES.length];
  const domainColor = DOMAIN_COLORS[story.domainCode] ?? '#8B0000';

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0F', paddingTop: '92px', paddingBottom: '72px' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-10">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-xs font-bold mb-8 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255,255,255,0.4)' }}>
            <ArrowLeft size={12} />
            All Stories
          </Link>

          <span
            className="text-[10px] font-black uppercase tracking-widest mb-5 block"
            style={{ color: domainColor }}>
            {story.domainCode} · {story.clubName}
          </span>

          <h1
            className="font-black leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: '#fff', letterSpacing: '-0.025em' }}>
            {story.title}
          </h1>

          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
              style={{ background: `${domainColor}25`, color: domainColor }}>
              {story.studentName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: '#fff' }}>{story.studentName}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{story.studentYear}</p>
            </div>
          </div>

          <p className="mt-5 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            [PLACEHOLDER — Official student story requires consent and editorial review]
          </p>
        </div>
      </section>

      {/* ─── Story Body ───────────────────────────────────────────────── */}
      <section style={{ background: '#fff' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-10 py-20">
          <FadeIn>
            <blockquote
              className="text-xl sm:text-2xl font-bold leading-relaxed mb-12 pl-6"
              style={{
                color: '#0D0D0D',
                borderLeft: `4px solid ${domainColor}`,
                letterSpacing: '-0.01em',
              }}>
              {story.excerpt}
            </blockquote>

            <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#3F3F46' }}>
              {story.body}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Tags ─────────────────────────────────────────────────────── */}
      {story.tags.length > 0 && (
        <section style={{ background: '#F7F7F8' }}>
          <div className="max-w-4xl mx-auto px-5 sm:px-10 py-10">
            <div className="flex flex-wrap gap-2">
              {story.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: '#fff', border: '1px solid #E4E4E7', color: '#71717A' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Next story ───────────────────────────────────────────────── */}
      {next && next.slug !== story.slug && (
        <section style={{ background: '#fff' }}>
          <div className="max-w-4xl mx-auto px-5 sm:px-10 py-16">
            <FadeIn>
              <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-5" style={{ color: '#A1A1AA' }}>
                Next Story
              </p>
              <Link
                href={`/stories/${next.slug}`}
                className="group flex items-center gap-6 py-6 transition-colors"
                style={{ borderTop: '1px solid #E4E4E7', borderBottom: '1px solid #E4E4E7' }}>
                <div className="flex-1">
                  <h3 className="font-bold text-lg leading-tight" style={{ color: '#0D0D0D' }}>
                    {next.title}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: '#A1A1AA' }}>{next.studentName}</p>
                </div>
                <ArrowRight
                  size={20}
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: '#D1D1D6' }} />
              </Link>
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}
