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
  photo?: string;
}

export const STUDENT_STORIES: StudentStory[] = [
  {
    slug: 'esports-national-finals-2025',
    title: 'From Campus to the National Stage: KL eSports Claims BGMI National Finals Spot',
    studentName: 'KL eSports Team',
    studentYear: 'B.Tech, Multiple Years',
    clubName: 'KL eSports Club',
    domainCode: 'LCH',
    excerpt:
      'We had one goal — to take KL University to the national stage. Winning the regional round of the University eSports Championship in BGMI and earning the chance to represent Andhra Pradesh in Kolkata made every late-night practice session worth it.',
    body:
      'The KL eSports Team advanced to the National Finals of the University eSports Championship, earning the opportunity to represent Andhra Pradesh at the national level in BGMI (Battlegrounds Mobile India).\n\nAhead of the finals in Kolkata, the team met with the Pro Vice Chancellor, alongside the Director of the Student Activity Center and the President of the KL Student Council, to share this achievement and receive their best wishes for the national championship.\n\nThe continued encouragement and support from university leadership, along with the constant guidance of the Student Activity Center, have been instrumental in enabling our students to pursue competitive excellence at the national level.\n\nFrom KL to the National Stage.',
    photo: '/success-stories/esports-national-2025.jpg',
    tags: ['KL eSports Club', 'BGMI', 'National Finals', 'eSports', 'LCH', 'Andhra Pradesh'],
  },
  {
    slug: 'pavan-karthik-motorola-solutions',
    title: 'From Student Leadership to Software Engineering: Pavan Karthik Begins Journey at Motorola Solutions',
    studentName: 'Pavan Karthik Mandadapu',
    studentYear: 'B.Tech CSE (Alumni)',
    clubName: 'Student Council',
    domainCode: 'IIE',
    excerpt:
      'Leading 15,000+ students and 42+ clubs taught me more about technology, collaboration, and accountability than any classroom ever could. Motorola Solutions was not just a placement — it was the proof that student leadership shapes real careers.',
    body:
      'Pavan Karthik Mandadapu, former President of the KL Student Activity Center, began his professional journey as a Software Engineer at Motorola Solutions.\n\nThis milestone marks more than the beginning of a professional career. It reflects years of learning, leadership, resilience, and meaningful experiences gained through academic and student leadership responsibilities at KL University.\n\nDuring his tenure as Student Council President, Pavan Karthik had the opportunity to represent more than 15,000 students, work alongside 42+ student clubs, and lead and coordinate numerous student initiatives. These experiences provided valuable exposure to leadership, strategic planning, teamwork, stakeholder coordination, and student service.\n\nHis tenure at the Student Activity Center was a transformative chapter in his personal and professional development. Working with students, faculty, councils, and student organisations enabled him to develop a strong perspective on leadership, collaboration, accountability, and service — lessons he now carries forward into the corporate environment.\n\nPavan Karthik expressed his sincere gratitude to Sai Vijay Pisini, Director of the Student Activity Center, for his constant guidance and unwavering belief throughout his leadership journey.\n\nOne Journey. Many Lessons. A New Beginning.',
    photo: '/success-stories/pavan-karthik-motorola.jpg',
    tags: ['Student Council', 'Alumni', 'Motorola Solutions', 'Software Engineering', 'IIE', 'Placement'],
  },
  {
    slug: 'sayani-datta-motorola-solutions',
    title: 'President by Day, Engineer by Ambition: Sayani Datta Joins Motorola Solutions',
    studentName: 'Sayani Datta',
    studentYear: 'B.Tech CSE, 4th Year',
    clubName: 'Student Council',
    domainCode: 'IIE',
    excerpt:
      'I lead the Student Activity Center, train as a professional badminton player, and am now a Software Engineering Intern at Motorola Solutions. None of these happened in spite of each other — they happened because of each other.',
    body:
      'Sayani Datta, current President of the KL Student Activity Center and a professional badminton player, began her professional journey as a Software Engineering Intern at Motorola Solutions.\n\nA curious and innovation-driven technology enthusiast, Sayani has demonstrated a strong interest in cloud infrastructure and software engineering while simultaneously taking on significant leadership responsibilities within the university.\n\nAs President of the KL Student Activity Center, Sayani plays an important role in student leadership, coordination, administration, and the planning and execution of student activities across the university. Her role involves working with student councils, clubs, student leaders, and various stakeholders to strengthen student engagement and create meaningful opportunities for the university community.\n\nBeyond academics and leadership, Sayani has also distinguished herself as a professional badminton player, demonstrating the discipline, competitive spirit, and consistency required to excel both on and off the field.\n\nHer selection as a Software Engineering Intern at Motorola Solutions reflects her ability to balance technology, leadership, and extracurricular excellence.\n\nFrom leading student initiatives to building the future of technology — a new chapter begins.',
    photo: '/success-stories/sayani-datta-motorola.jpg',
    tags: ['Student Council', 'Motorola Solutions', 'Software Engineering', 'Badminton', 'IIE', 'Placement'],
  },
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
  photo?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-esports-national-2025',
    level: 'National',
    title: 'BGMI National Finals Qualification — University eSports Championship 2025',
    clubName: 'KL eSports Club',
    domainCode: 'LCH',
    organization: 'University eSports Championship (presented by SRM, Infinitue & Zowie)',
    year: '2025',
    description:
      'The KL eSports Team won the regional round of the University eSports Championship 2025 in BGMI (Battlegrounds Mobile India), earning the right to represent Andhra Pradesh at the National Finals in Kolkata. Before departing, the team was felicitated by the Pro Vice Chancellor alongside the SAC Director and Student Council President.',
    photo: '/success-stories/esports-national-2025.jpg',
  },
  {
    id: 'ach-pavan-motorola-2025',
    level: 'University',
    title: 'Former SAC President Placed as Software Engineer at Motorola Solutions',
    clubName: 'Student Council',
    domainCode: 'IIE',
    organization: 'Motorola Solutions',
    year: '2025',
    description:
      'Pavan Karthik Mandadapu, former President of the KL Student Activity Center, began his professional career as a Software Engineer at Motorola Solutions. During his tenure he represented over 15,000 students across 42+ clubs. His leadership experience at SAC — spanning strategic planning, stakeholder coordination, and student governance — proved instrumental in his transition into the corporate world.',
    photo: '/success-stories/pavan-karthik-motorola.jpg',
  },
  {
    id: 'ach-sayani-motorola-2026',
    level: 'University',
    title: 'Sitting SAC President Selected as Software Engineering Intern at Motorola Solutions',
    clubName: 'Student Council',
    domainCode: 'IIE',
    organization: 'Motorola Solutions',
    year: '2026',
    description:
      'Sayani Datta, current President of the KL Student Activity Center (Internships & Career Development) and professional badminton player, was selected as a Software Engineering Intern at Motorola Solutions. Her achievement demonstrates that student leadership, technical ambition, and extracurricular discipline can work in concert to open significant professional opportunities.',
    photo: '/success-stories/sayani-datta-motorola.jpg',
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
  url?: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-aug-story',
    title: 'The August Story — Volume 1',
    type: 'Magazine',
    year: '2026',
    description:
      'A curated collection of stories, achievements, and highlights from KL SAC activities during August 2026. Covering cultural events, student milestones, and community initiatives across all five domains.',
    pages: null,
    downloadAvailable: true,
    url: '/publications/august-story-vol1.pdf',
  },
  {
    id: 'pub-independence-day',
    title: 'Independence Day 2026 — Event Report',
    type: 'Newsletter',
    year: '2026',
    description:
      'Official documentation of the Independence Day 2026 celebrations at KL University, organised by KL SAC. Includes event proceedings, participation records, and highlights from the flag-hoisting ceremony and cultural programmes.',
    pages: null,
    downloadAvailable: true,
    url: '/publications/independence-day-2026.pdf',
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
