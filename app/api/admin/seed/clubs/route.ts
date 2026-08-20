import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase-admin';

const TEST_CLUBS = [
  // Technology (TEC)
  { slug: 'kltech-robotics', name: 'KL Robotics Club',       domain_code: 'TEC', domain_slug: 'technology', tagline: 'Build the machines of tomorrow', sort_order: 0 },
  { slug: 'kltech-coding',   name: 'Competitive Coding Club', domain_code: 'TEC', domain_slug: 'technology', tagline: 'Code. Compete. Conquer.', sort_order: 1 },
  { slug: 'kltech-ai',       name: 'AI & ML Club',            domain_code: 'TEC', domain_slug: 'technology', tagline: 'Exploring intelligence, artificial and beyond', sort_order: 2 },
  { slug: 'kltech-cybersec', name: 'CyberSec Club',           domain_code: 'TEC', domain_slug: 'technology', tagline: 'Hack to protect', sort_order: 3 },

  // Liberal Arts, Cultural & Hobby (LCH)
  { slug: 'kllch-drama',       name: 'Drama & Theatre Club', domain_code: 'LCH', domain_slug: 'liberal-arts', tagline: 'Stories that move people', sort_order: 0 },
  { slug: 'kllch-music',       name: 'Music Club',           domain_code: 'LCH', domain_slug: 'liberal-arts', tagline: 'Where notes become stories', sort_order: 1 },
  { slug: 'kllch-dance',       name: 'Dance Club',           domain_code: 'LCH', domain_slug: 'liberal-arts', tagline: 'Expression through movement', sort_order: 2 },
  { slug: 'kllch-literary',    name: 'Literary Club',        domain_code: 'LCH', domain_slug: 'liberal-arts', tagline: 'Readers, writers, thinkers', sort_order: 3 },
  { slug: 'kllch-photography', name: 'Photography Club',     domain_code: 'LCH', domain_slug: 'liberal-arts', tagline: 'Capturing moments that matter', sort_order: 4 },

  // Health & Wellbeing (HWB)
  { slug: 'klhwb-sports',  name: 'Sports Club',           domain_code: 'HWB', domain_slug: 'health-wellbeing', tagline: 'Play hard, recover harder', sort_order: 0 },
  { slug: 'klhwb-yoga',    name: 'Yoga & Mindfulness Club', domain_code: 'HWB', domain_slug: 'health-wellbeing', tagline: 'Mind and body in balance', sort_order: 1 },
  { slug: 'klhwb-fitness', name: 'Fitness Club',           domain_code: 'HWB', domain_slug: 'health-wellbeing', tagline: 'Build strength, build discipline', sort_order: 2 },

  // Extension & Social Outreach (ESO)
  { slug: 'kleso-nss',      name: 'NSS Unit',            domain_code: 'ESO', domain_slug: 'social-outreach', tagline: 'Not me but you', sort_order: 0 },
  { slug: 'kleso-green',    name: 'Green Campus Club',   domain_code: 'ESO', domain_slug: 'social-outreach', tagline: 'Sustainability in action', sort_order: 1 },
  { slug: 'kleso-blood',    name: 'Blood Donation Club', domain_code: 'ESO', domain_slug: 'social-outreach', tagline: 'Give life, give blood', sort_order: 2 },
  { slug: 'kleso-heritage', name: 'Heritage Club',       domain_code: 'ESO', domain_slug: 'social-outreach', tagline: 'Preserving what makes us us', sort_order: 3 },

  // Innovation, Incubation & Entrepreneurship (IIE)
  { slug: 'kliie-startup',  name: 'Startup Club',             domain_code: 'IIE', domain_slug: 'innovation', tagline: 'Ideas that become companies', sort_order: 0 },
  { slug: 'kliie-design',   name: 'Design Thinking Club',     domain_code: 'IIE', domain_slug: 'innovation', tagline: 'Solve real problems creatively', sort_order: 1 },
  { slug: 'kliie-finance',  name: 'Finance & Investing Club', domain_code: 'IIE', domain_slug: 'innovation', tagline: 'Money is a tool — learn to use it', sort_order: 2 },
];

export async function POST(req: NextRequest) {
  if (req.headers.get('x-setup-key') !== 'KLSACsetup2026')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const rows = TEST_CLUBS.map(c => ({
    ...c,
    logo_url:        null,
    cover_url:       null,
    gallery:         [],
    about:           [],
    purpose:         '',
    competencies:    [],
    activities_list: [],
    updated_at:      new Date().toISOString(),
  }));

  const { error } = await supabase.from('clubs').upsert(rows, { onConflict: 'slug' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/clubs');
  revalidatePath('/');
  return NextResponse.json({ success: true, count: rows.length });
}
