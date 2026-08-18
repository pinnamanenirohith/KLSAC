import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { DOMAINS } from '@/lib/content/domains';

const NAVIGATE = [
  { href: '/about',         label: 'About SAC'      },
  { href: '/domains',       label: 'Domains'         },
  { href: '/clubs',         label: 'All Clubs'       },
  { href: '/events',        label: 'Events'          },
  { href: '/stories',       label: 'Student Stories' },
  { href: '/achievements',  label: 'Achievements'    },
  { href: '/news',          label: 'News'            },
  { href: '/publications',  label: 'Publications'    },
];

const ENGAGE = [
  { href: '/leadership',   label: 'Leadership'          },
  { href: '/collaborate',  label: 'Collaborate with SAC' },
  { href: '/contact',      label: 'Contact Us'           },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0F', color: '#fff' }}>

      {/* ── Main columns ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

        {/* Brand */}
        <div>
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="KL SAC — Student Activity Center, KL University"
              height={44}
              width={200}
              style={{
                height: '44px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                opacity: 0.88,
              }}
            />
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Student Activity Center<br />
            KL University, Vijayawada<br />
            Andhra Pradesh — 522 502
          </p>

          <p className="text-xs font-bold tracking-widest uppercase mb-4"
             style={{ color: 'rgba(255,255,255,0.2)' }}>
            Empowering <span style={{ color: '#8B0000' }}>Tomorrow's Leaders</span>
          </p>

          {/* Social placeholder */}
          <div className="flex items-center gap-3">
            {['Instagram', 'LinkedIn', 'YouTube'].map(s => (
              <a key={s} href="#" aria-label={s}
                 className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors hover:bg-white/10"
                 style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="text-[10px] font-black tracking-[0.18em] uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.35)' }}>Navigate</h4>
          <ul className="space-y-3">
            {NAVIGATE.map(l => (
              <li key={l.href}>
                <Link href={l.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Domains */}
        <div>
          <h4 className="text-[10px] font-black tracking-[0.18em] uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.35)' }}>Domains</h4>
          <ul className="space-y-3">
            {DOMAINS.map(d => (
              <li key={d.code}>
                <Link href={`/domains/${d.slug}`}
                      className="flex items-center gap-2.5 text-sm transition-colors hover:text-white group"
                      style={{ color: 'rgba(255,255,255,0.42)' }}>
                  <span className="font-black text-xs shrink-0"
                        style={{ color: d.color, opacity: 0.8 }}>{d.code}</span>
                  <span>{d.shortName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Engage */}
        <div>
          <h4 className="text-[10px] font-black tracking-[0.18em] uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.35)' }}>Engage</h4>
          <ul className="space-y-3 mb-8">
            {ENGAGE.map(l => (
              <li key={l.href}>
                <Link href={l.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Register for clubs, track SDC credits and manage your student journey.
            </p>
            <Link href="https://sac.kluniversity.in" target="_blank" rel="noopener"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-[1.03]"
                  style={{ background: '#8B0000', color: '#fff' }}>
              Student Dashboard
              <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
           style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
          © {new Date().getFullYear()} KL University — Student Activity Center. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {['Privacy Policy', 'Terms of Use'].map(l => (
            <span key={l} className="text-xs cursor-default"
                  style={{ color: 'rgba(255,255,255,0.18)' }}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
