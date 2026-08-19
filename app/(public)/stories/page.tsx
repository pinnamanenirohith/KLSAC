import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { STUDENT_STORIES, type StudentStory } from '@/lib/content/site-content';
import { FadeIn, Stagger } from '../_components/FadeIn';

export const metadata = {
  title: 'Student Stories',
  description: 'Real stories from KL SAC students — the experiences, growth, and impact that shaped their university years.',
};

const DOMAIN_COLORS: Record<string, string> = {
  TEC: '#8B0000', LCH: '#B91C1C', HWB: '#7C0000', ESO: '#991B1B', IIE: '#C53030',
};

export default function StoriesPage() {
  const featured = STUDENT_STORIES[0];
  const rest = STUDENT_STORIES.slice(1);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0F', paddingTop: '92px', paddingBottom: '72px' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-5" style={{ color: '#8B0000' }}>
            Student Stories
          </p>
          <h1
            className="font-black leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#FFFFFF', letterSpacing: '-0.025em', maxWidth: '24ch' }}>
            The Experiences That Shape Careers.
          </h1>
          <p className="text-lg leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.42)', maxWidth: '56ch' }}>
            Behind every achievement is a student who chose to engage. These are their stories.
          </p>
        </div>
      </section>

      {/* ─── Featured Story ───────────────────────────────────────────── */}
      {featured && (
        <section style={{ background: '#fff' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20">
            <FadeIn>
              <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-6" style={{ color: '#8B0000' }}>
                Featured Story
              </p>
              <Link
                href={`/stories/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden transition-shadow hover:shadow-xl"
                style={{ border: '1px solid #E4E4E7' }}>

                <div
                  className="lg:col-span-2 min-h-64 lg:min-h-80 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${DOMAIN_COLORS[featured.domainCode] ?? '#8B0000'}18, ${DOMAIN_COLORS[featured.domainCode] ?? '#8B0000'}08)` }}>
                  {featured.photo ? (
                    <img src={featured.photo} alt={featured.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl font-black" style={{ color: `${DOMAIN_COLORS[featured.domainCode] ?? '#D1D1D6'}30` }}>
                        {featured.domainCode}
                      </span>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
                  <span
                    className="text-[10px] font-black uppercase tracking-widest mb-4 inline-block"
                    style={{ color: DOMAIN_COLORS[featured.domainCode] ?? '#8B0000' }}>
                    {featured.domainCode} · {featured.clubName}
                  </span>
                  <h2
                    className="font-black leading-tight mb-4"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#0D0D0D', letterSpacing: '-0.02em' }}>
                    {featured.title}
                  </h2>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: '#71717A' }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-bold text-sm" style={{ color: '#0D0D0D' }}>{featured.studentName}</p>
                      <p className="text-xs" style={{ color: '#A1A1AA' }}>{featured.studentYear}</p>
                    </div>
                    <div className="ml-auto">
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                        style={{ color: '#D1D1D6' }} />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ─── Story Grid ───────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section style={{ background: '#F7F7F8' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20">
            <FadeIn>
              <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-10" style={{ color: '#A1A1AA' }}>
                More Stories
              </p>
            </FadeIn>

            <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((story: StudentStory) => (
                <Link
                  key={story.slug}
                  href={`/stories/${story.slug}`}
                  className="group flex flex-col rounded-xl overflow-hidden transition-all hover:shadow-md"
                  style={{ background: '#fff', border: '1px solid #E4E4E7' }}>

                  <div
                    className="h-36 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${DOMAIN_COLORS[story.domainCode] ?? '#E4E4E7'}18, ${DOMAIN_COLORS[story.domainCode] ?? '#E4E4E7'}08)` }}>
                    {story.photo ? (
                      <img src={story.photo} alt={story.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl font-black" style={{ color: '#E4E4E7' }}>
                          {story.domainCode}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider mb-2 inline-block"
                      style={{ color: DOMAIN_COLORS[story.domainCode] ?? '#8B0000' }}>
                      {story.clubName}
                    </span>
                    <h3 className="font-bold text-base leading-snug mb-2 flex-1" style={{ color: '#0D0D0D' }}>
                      {story.title}
                    </h3>
                    <p className="text-xs line-clamp-2 mb-4" style={{ color: '#71717A' }}>
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold" style={{ color: '#3F3F46' }}>{story.studentName}</p>
                        <p className="text-[10px]" style={{ color: '#A1A1AA' }}>{story.studentYear}</p>
                      </div>
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5"
                        style={{ color: '#D1D1D6' }} />
                    </div>
                  </div>
                </Link>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0F' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20 text-center">
          <FadeIn>
            <h2
              className="font-black leading-tight mb-5"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#fff', letterSpacing: '-0.02em' }}>
              Write your own story.
            </h2>
            <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.42)' }}>
              Join a club, participate in activities, build your student development record.
            </p>
            <Link
              href="https://sacactivities.kluniversity.in"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-base transition-all hover:scale-[1.03]"
              style={{ background: '#8B0000', color: '#fff' }}>
              Get Started on the Dashboard
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
