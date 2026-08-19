import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { NEWS_ARTICLES, NEWS_SLUGS } from '@/lib/content/site-content';
import { FadeIn } from '../../_components/FadeIn';

export function generateStaticParams() {
  return NEWS_SLUGS.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find(a => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — KL SAC News`,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find(a => a.slug === slug);
  if (!article) notFound();

  const idx = NEWS_ARTICLES.indexOf(article);
  const next = NEWS_ARTICLES[(idx + 1) % NEWS_ARTICLES.length];

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', paddingTop: '92px', paddingBottom: '48px' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold mb-8 transition-opacity hover:opacity-70"
            style={{ color: '#A1A1AA' }}>
            <ArrowLeft size={12} />
            All News
          </Link>

          <span className="text-[10px] font-black uppercase tracking-widest block mb-4" style={{ color: '#8B0000' }}>
            {article.category}
          </span>

          <h1
            className="font-black leading-tight mb-5"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#0D0D0D', letterSpacing: '-0.025em' }}>
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm" style={{ color: '#A1A1AA' }}>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            {article.author && (
              <>
                <span>·</span>
                <span>{article.author}</span>
              </>
            )}
          </div>

        </div>
      </section>

      {/* ─── Cover image ──────────────────────────────────────────────── */}
      {article.photo && (
        <section style={{ background: '#F7F7F8' }}>
          <div className="max-w-4xl mx-auto px-5 sm:px-10">
            <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/7' }}>
              <img src={article.photo} alt={article.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* ─── Article body ─────────────────────────────────────────────── */}
      <section style={{ background: '#fff' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-10 py-16">
          <FadeIn>
            <p
              className="text-lg sm:text-xl font-semibold leading-relaxed mb-10"
              style={{ color: '#0D0D0D' }}>
              {article.excerpt}
            </p>

            <div className="flex flex-col gap-5">
              {article.body.split('\n\n').map((para, i) => (
                <p key={i} className="text-base sm:text-lg leading-relaxed" style={{ color: '#3F3F46' }}>
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Tags ─────────────────────────────────────────────────────── */}
      {article.tags.length > 0 && (
        <section style={{ background: '#F7F7F8' }}>
          <div className="max-w-4xl mx-auto px-5 sm:px-10 py-10">
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
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

      {/* ─── Next article ─────────────────────────────────────────────── */}
      {next && next.slug !== article.slug && (
        <section style={{ background: '#fff' }}>
          <div className="max-w-4xl mx-auto px-5 sm:px-10 py-16">
            <FadeIn>
              <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-5" style={{ color: '#A1A1AA' }}>
                Continue Reading
              </p>
              <Link
                href={`/news/${next.slug}`}
                className="group flex items-center gap-5 py-6 transition-colors"
                style={{ borderTop: '1px solid #E4E4E7', borderBottom: '1px solid #E4E4E7' }}>
                <div className="flex-1">
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: '#8B0000' }}>
                    {next.category}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg leading-tight" style={{ color: '#0D0D0D' }}>
                    {next.title}
                  </h3>
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
