import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NEWS_ARTICLES } from '@/lib/content/site-content';
import { FadeIn } from '../_components/FadeIn';

export const metadata = {
  title: 'News & Updates',
  description: 'Latest news, announcements, and updates from KL SAC.',
};

export default function NewsPage() {
  const featured = NEWS_ARTICLES[0];
  const rest = NEWS_ARTICLES.slice(1);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', paddingTop: '92px', paddingBottom: '56px' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 pt-8">
          <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-4" style={{ color: '#8B0000' }}>
            News & Updates
          </p>
          <h1
            className="font-black leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#0D0D0D', letterSpacing: '-0.025em' }}>
            What's Happening at SAC.
          </h1>
          <p className="text-lg" style={{ color: '#71717A', maxWidth: '54ch' }}>
            Announcements, activity wrap-ups, and institutional updates from KL SAC.
          </p>
          <p className="mt-3 text-xs" style={{ color: '#C7C7CC' }}>
            [PLACEHOLDER — Official news content required]
          </p>
        </div>
      </section>

      {/* ─── Featured Article ─────────────────────────────────────────── */}
      {featured && (
        <section style={{ background: '#fff' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-10 pb-16">
            <FadeIn>
              <Link
                href={`/news/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden transition-shadow hover:shadow-lg"
                style={{ border: '1px solid #E4E4E7' }}>

                {/* Image placeholder */}
                <div
                  className="lg:col-span-2 min-h-56"
                  style={{ background: 'linear-gradient(135deg, #8B000012, #C9A84C0A)' }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-black text-4xl" style={{ color: '#E4E4E7' }}>KL</span>
                  </div>
                </div>

                <div className="lg:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase tracking-widest mb-3 block" style={{ color: '#8B0000' }}>
                    {featured.category}
                  </span>
                  <h2
                    className="font-black leading-tight mb-4"
                    style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', color: '#0D0D0D', letterSpacing: '-0.02em' }}>
                    {featured.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#71717A' }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: '#A1A1AA' }}>
                      {new Date(featured.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold transition-colors group-hover:text-crimson" style={{ color: '#8B0000' }}>
                      Read more <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ─── News List ────────────────────────────────────────────────── */}
      <section style={{ background: '#F7F7F8' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20">
          <FadeIn>
            <div style={{ borderTop: '1px solid #E4E4E7' }}>
              {rest.map(article => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="group flex flex-col sm:flex-row gap-5 sm:gap-8 py-7 transition-colors hover:bg-white/50"
                  style={{ borderBottom: '1px solid #E4E4E7' }}>

                  {/* Date */}
                  <div className="sm:w-20 shrink-0">
                    <p className="font-black text-2xl leading-none" style={{ color: '#0D0D0D' }}>
                      {new Date(article.date).getDate()}
                    </p>
                    <p className="text-[10px] font-bold uppercase mt-0.5" style={{ color: '#A1A1AA' }}>
                      {new Date(article.date).toLocaleString('en-IN', { month: 'short' })}
                      {' '}{new Date(article.date).getFullYear().toString().slice(2)}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: '#8B0000' }}>
                      {article.category}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg leading-snug mb-2" style={{ color: '#0D0D0D' }}>
                      {article.title}
                    </h3>
                    <p className="text-sm line-clamp-2" style={{ color: '#71717A' }}>
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center shrink-0">
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                      style={{ color: '#D1D1D6' }} />
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
