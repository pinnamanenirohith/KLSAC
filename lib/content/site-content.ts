import type { DomainCode } from './domains';

// ─── News ──────────────────────────────────────────────────────────────────

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  author: string;
  featured: boolean;
  tags: string[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'sac-launches-2026-27-academic-year',
    title: 'KL SAC Launches Academic Year 2026-27 with Campus-Wide Activities Drive',
    excerpt:
      'The Student Activity Center has opened registrations across all 25 clubs and 5 domains for the new academic year, with expanded programmes, new leadership opportunities, and a heightened focus on student development.',
    body: '[PLACEHOLDER — Official news article body required. Please provide verified content from SAC Communications.]',
    category: 'Announcement',
    date: '2026-08-01',
    author: 'KL SAC Communications',
    featured: true,
    tags: ['Academic Year', 'Club Registration', 'SAC'],
  },
  {
    slug: 'zeroone-hackathon-2026',
    title: 'ZeroOne Code Club Represents KL at National Hackathon — Reaches Finals',
    excerpt:
      'A team from ZeroOne Code Club competed in the national finals of a prominent intercollegiate hackathon, presenting an innovative solution to a real-world public health challenge.',
    body: '[PLACEHOLDER — Official news article body required. Please provide verified content from SAC Communications.]',
    category: 'Achievement',
    date: '2026-07-28',
    author: 'KL SAC Communications',
    featured: false,
    tags: ['ZeroOne', 'Hackathon', 'TEC', 'Achievement'],
  },
  {
    slug: 'svr-outreach-2026',
    title: 'SVR Club Completes Annual Village Outreach Programme — 500+ Families Reached',
    excerpt:
      'The SVR Club concluded its three-day annual village outreach programme serving communities in the Vijayawada district, providing health awareness, education support, and livelihood resources.',
    body: '[PLACEHOLDER — Official news article body required. Please provide verified content from SAC Communications.]',
    category: 'Community',
    date: '2026-07-15',
    author: 'KL SAC Communications',
    featured: false,
    tags: ['SVR Club', 'Outreach', 'ESO', 'Community Service'],
  },
  {
    slug: 'classical-dance-festival-2026',
    title: 'Dance Club to Host Classical Dance Festival — Auditions Open',
    excerpt:
      'KL SAC Dance Club has announced the return of its flagship Classical Dance Festival, inviting students across all dance forms to audition for the annual performance showcase.',
    body: '[PLACEHOLDER — Official news article body required. Please provide verified content from SAC Communications.]',
    category: 'Event',
    date: '2026-08-08',
    author: 'KL SAC Communications',
    featured: false,
    tags: ['Dance Club', 'Festival', 'LCH', 'Auditions'],
  },
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((n) => n.slug === slug);
}

export const NEWS_SLUGS = NEWS_ARTICLES.map((n) => n.slug);

// ─── Student Stories ────────────────────────────────────────────────────────

export interface StudentStory {
  slug: string;
  title: string;
  studentName: string;
  studentYear: string;
  clubName: string;
  domainCode: DomainCode;
  excerpt: string;
  body: string;
  tags: string[];
}

export const STUDENT_STORIES: StudentStory[] = [
  {
    slug: 'journey-of-a-coder',
    title: 'From Curious Fresher to National Finalist: A Coder\'s Journey',
    studentName: '[PLACEHOLDER — Student Name Required]',
    studentYear: 'B.Tech CSE, Year 3',
    clubName: 'ZeroOne Code Club',
    domainCode: 'TEC',
    excerpt:
      'When I joined KL University, I barely knew how to write a basic function. Two years, hundreds of problems, and one national hackathon later, everything had changed.',
    body: '[PLACEHOLDER — Official student story required. Please work with the student and SAC Communications to produce verified, consented content.]',
    tags: ['ZeroOne', 'Competitive Programming', 'Hackathon', 'TEC'],
  },
  {
    slug: 'dance-changed-my-university-years',
    title: 'How the Dance Club Gave Me Confidence I Never Knew I Had',
    studentName: '[PLACEHOLDER — Student Name Required]',
    studentYear: 'B.Tech ECE, Year 2',
    clubName: 'Dance Club',
    domainCode: 'LCH',
    excerpt:
      'I had never performed on a stage before university. The Dance Club didn\'t just teach me Bharatanatyam — it taught me that I was capable of something beautiful.',
    body: '[PLACEHOLDER — Official student story required. Please work with the student and SAC Communications to produce verified, consented content.]',
    tags: ['Dance Club', 'Bharatanatyam', 'Performance', 'LCH'],
  },
  {
    slug: 'marathon-more-than-running',
    title: 'The Marathon Club Taught Me That Limits Are Mostly in Your Head',
    studentName: '[PLACEHOLDER — Student Name Required]',
    studentYear: 'B.Tech Mech, Year 4',
    clubName: 'Marathon Club',
    domainCode: 'HWB',
    excerpt:
      'I joined the Marathon Club thinking I\'d get fitter. I didn\'t expect it to change how I approach every challenge in my life — academic, professional, and personal.',
    body: '[PLACEHOLDER — Official student story required. Please work with the student and SAC Communications to produce verified, consented content.]',
    tags: ['Marathon Club', 'Running', 'Wellness', 'HWB'],
  },
  {
    slug: 'svr-service-changed-perspective',
    title: 'Three Days in the Village Changed How I See My Education',
    studentName: '[PLACEHOLDER — Student Name Required]',
    studentYear: 'B.Tech IT, Year 3',
    clubName: 'SVR Club',
    domainCode: 'ESO',
    excerpt:
      'The SVR outreach programme was three days of discomfort, hard work, and genuine human connection. I came back to campus and couldn\'t look at my studies the same way again.',
    body: '[PLACEHOLDER — Official student story required. Please work with the student and SAC Communications to produce verified, consented content.]',
    tags: ['SVR Club', 'Outreach', 'Community', 'ESO'],
  },
  {
    slug: 'acic-startup-journey',
    title: 'We Started as Freshers with an Idea. ACIC Helped Us Build a Company.',
    studentName: '[PLACEHOLDER — Student Name Required]',
    studentYear: 'B.Tech CSE, Year 4',
    clubName: 'ACIC',
    domainCode: 'IIE',
    excerpt:
      'When we walked into ACIC with a half-formed idea and no business plan, we didn\'t know what we were getting into. A year later, we had a prototype, a pitch deck, and our first customers.',
    body: '[PLACEHOLDER — Official student story required. Please work with the student and SAC Communications to produce verified, consented content.]',
    tags: ['ACIC', 'Entrepreneurship', 'Startup', 'IIE'],
  },
];

export function getStoryBySlug(slug: string): StudentStory | undefined {
  return STUDENT_STORIES.find((s) => s.slug === slug);
}

export const STORY_SLUGS = STUDENT_STORIES.map((s) => s.slug);

// ─── Achievements ────────────────────────────────────────────────────────────

export type AchievementLevel = 'International' | 'National' | 'State' | 'University';

export interface Achievement {
  id: string;
  level: AchievementLevel;
  title: string;
  clubName: string;
  domainCode: DomainCode;
  organization: string;
  year: string;
  description: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-001',
    level: 'National',
    title: '[PLACEHOLDER — Achievement Title]',
    clubName: 'ZeroOne Code Club',
    domainCode: 'TEC',
    organization: '[PLACEHOLDER — Organizing Body]',
    year: '2025',
    description:
      '[PLACEHOLDER — Official achievement data required. Please provide verified information from SAC records.]',
  },
  {
    id: 'ach-002',
    level: 'National',
    title: '[PLACEHOLDER — Achievement Title]',
    clubName: 'Dance Club',
    domainCode: 'LCH',
    organization: '[PLACEHOLDER — Organizing Body]',
    year: '2025',
    description:
      '[PLACEHOLDER — Official achievement data required. Please provide verified information from SAC records.]',
  },
  {
    id: 'ach-003',
    level: 'State',
    title: '[PLACEHOLDER — Achievement Title]',
    clubName: 'SVR Club',
    domainCode: 'ESO',
    organization: '[PLACEHOLDER — Organizing Body]',
    year: '2025',
    description:
      '[PLACEHOLDER — Official achievement data required. Please provide verified information from SAC records.]',
  },
  {
    id: 'ach-004',
    level: 'National',
    title: '[PLACEHOLDER — Achievement Title]',
    clubName: 'Cyber Security Club',
    domainCode: 'TEC',
    organization: '[PLACEHOLDER — Organizing Body]',
    year: '2024',
    description:
      '[PLACEHOLDER — Official achievement data required. Please provide verified information from SAC records.]',
  },
  {
    id: 'ach-005',
    level: 'University',
    title: '[PLACEHOLDER — Achievement Title]',
    clubName: 'Vastraa (Fashion) Club',
    domainCode: 'LCH',
    organization: 'KL University',
    year: '2025',
    description:
      '[PLACEHOLDER — Official achievement data required. Please provide verified information from SAC records.]',
  },
  {
    id: 'ach-006',
    level: 'State',
    title: '[PLACEHOLDER — Achievement Title]',
    clubName: 'ACIC',
    domainCode: 'IIE',
    organization: '[PLACEHOLDER — Organizing Body]',
    year: '2025',
    description:
      '[PLACEHOLDER — Official achievement data required. Please provide verified information from SAC records.]',
  },
];

// ─── Publications ────────────────────────────────────────────────────────────

export type PublicationType = 'Annual Report' | 'Magazine' | 'Research' | 'Newsletter';

export interface Publication {
  id: string;
  title: string;
  type: PublicationType;
  year: string;
  description: string;
  pages: number | null;
  downloadAvailable: boolean;
}

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-001',
    title: 'SAC Annual Report 2025-26',
    type: 'Annual Report',
    year: '2026',
    description:
      '[PLACEHOLDER — Official annual report content required. Please provide the verified SAC Annual Report PDF and summary content.]',
    pages: null,
    downloadAvailable: false,
  },
  {
    id: 'pub-002',
    title: 'SAC Annual Report 2024-25',
    type: 'Annual Report',
    year: '2025',
    description:
      '[PLACEHOLDER — Official annual report content required. Please provide the verified SAC Annual Report PDF and summary content.]',
    pages: null,
    downloadAvailable: false,
  },
  {
    id: 'pub-003',
    title: 'SAC Magazine — [PLACEHOLDER TITLE]',
    type: 'Magazine',
    year: '2026',
    description:
      '[PLACEHOLDER — Official SAC magazine content required. Please provide the verified SAC Magazine PDF and editorial content.]',
    pages: null,
    downloadAvailable: false,
  },
];

// ─── Leadership ──────────────────────────────────────────────────────────────

export interface LeadershipProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  bio: string;
  isOfficial: boolean;
}

export const LEADERSHIP: LeadershipProfile[] = [
  {
    id: 'lead-001',
    name: '[PLACEHOLDER — Director Name Required]',
    title: 'Director, Student Activity Center',
    department: 'KL University',
    bio: '[PLACEHOLDER — Official biography required. Please provide the verified biography and photograph of the SAC Director from official KL University sources.]',
    isOfficial: false,
  },
  {
    id: 'lead-002',
    name: '[PLACEHOLDER — TEC Domain Head Required]',
    title: 'Domain Head, Technology',
    department: 'Technology Domain (TEC)',
    bio: '[PLACEHOLDER — Official biography required.]',
    isOfficial: false,
  },
  {
    id: 'lead-003',
    name: '[PLACEHOLDER — LCH Domain Head Required]',
    title: 'Domain Head, Liberal Arts & Culture',
    department: 'Liberal Arts, Cultural & Hobby Domain (LCH)',
    bio: '[PLACEHOLDER — Official biography required.]',
    isOfficial: false,
  },
  {
    id: 'lead-004',
    name: '[PLACEHOLDER — HWB Domain Head Required]',
    title: 'Domain Head, Health & Wellbeing',
    department: 'Health & Wellbeing Domain (HWB)',
    bio: '[PLACEHOLDER — Official biography required.]',
    isOfficial: false,
  },
  {
    id: 'lead-005',
    name: '[PLACEHOLDER — ESO Domain Head Required]',
    title: 'Domain Head, Social Outreach',
    department: 'Extension & Social Outreach Domain (ESO)',
    bio: '[PLACEHOLDER — Official biography required.]',
    isOfficial: false,
  },
  {
    id: 'lead-006',
    name: '[PLACEHOLDER — IIE Domain Head Required]',
    title: 'Domain Head, Innovation & Entrepreneurship',
    department: 'Innovation, Incubation & Entrepreneurship Domain (IIE)',
    bio: '[PLACEHOLDER — Official biography required.]',
    isOfficial: false,
  },
];
