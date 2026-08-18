// Shared demo / fallback data — used by all public pages when DB is not connected

export const DEMO_CLUBS = [
  // TEC
  { id: 1,  name: 'ZeroOne Code Club',            domain: 'TEC', description: 'Competitive programming, hackathons and coding excellence.',                memberCount: 320, memberLimit: 400 },
  { id: 2,  name: 'Cyber Security Club',           domain: 'TEC', description: 'Ethical hacking, CTF challenges and digital security awareness.',            memberCount: 210, memberLimit: 250 },
  { id: 3,  name: 'WebApps Club',                  domain: 'TEC', description: 'Web development, UI/UX design and full-stack projects.',                     memberCount: 280, memberLimit: 350 },
  { id: 4,  name: 'Electric Vehicle Club',         domain: 'TEC', description: 'EV technology, sustainable transport and green engineering.',                memberCount: 175, memberLimit: 200 },
  { id: 5,  name: 'Automation Club',               domain: 'TEC', description: 'Robotics, IoT and industrial automation projects.',                          memberCount: 190, memberLimit: 250 },
  // LCH
  { id: 6,  name: 'Swara Music Club',              domain: 'LCH', description: 'Classical and contemporary music performances and workshops.',                memberCount: 350, memberLimit: 400 },
  { id: 7,  name: 'Dance Club',                    domain: 'LCH', description: 'Classical, folk and contemporary dance forms and competitions.',              memberCount: 420, memberLimit: 500 },
  { id: 8,  name: 'Theatre Arts (Dramatics) Club', domain: 'LCH', description: 'Stage performances, street plays and acting workshops.',                      memberCount: 180, memberLimit: 220 },
  { id: 9,  name: 'Short Film Makers Club',        domain: 'LCH', description: 'Script writing, direction and short film production.',                        memberCount: 160, memberLimit: 200 },
  { id: 10, name: 'Photography Club',              domain: 'LCH', description: 'Campus photography, editing techniques and photo exhibitions.',               memberCount: 290, memberLimit: 350 },
  { id: 11, name: 'Arts / Painting Club',          domain: 'LCH', description: 'Visual arts, painting, sketching and art exhibitions.',                      memberCount: 220, memberLimit: 300 },
  { id: 12, name: 'Handicrafts Club',              domain: 'LCH', description: 'Traditional and modern craft-making, origami and DIY projects.',              memberCount: 140, memberLimit: 180 },
  { id: 13, name: 'Vastraa (Fashion) Club',        domain: 'LCH', description: 'Fashion design, styling and cultural fashion shows.',                         memberCount: 195, memberLimit: 250 },
  { id: 14, name: 'Adventure Club',                domain: 'LCH', description: 'Trekking, outdoor activities and adventure sports.',                          memberCount: 245, memberLimit: 300 },
  { id: 15, name: 'KL eSports Club',               domain: 'LCH', description: 'Competitive gaming, esports tournaments and gaming communities.',             memberCount: 380, memberLimit: 500 },
  { id: 16, name: 'Vachas Club',                   domain: 'LCH', description: 'Public speaking, debate and oratory skill development.',                      memberCount: 165, memberLimit: 200 },
  // HWB
  { id: 17, name: 'SafeLife Club',                 domain: 'HWB', description: 'First aid, health awareness and emergency response training.',                 memberCount: 200, memberLimit: 250 },
  { id: 18, name: 'Yoga Club',                     domain: 'HWB', description: 'Daily yoga practice, meditation and mental wellness sessions.',                memberCount: 310, memberLimit: 400 },
  { id: 19, name: 'Marathon Club',                 domain: 'HWB', description: 'Running events, fitness training and campus marathons.',                       memberCount: 275, memberLimit: 350 },
  // ESO
  { id: 20, name: 'Yuva Tourism Club',             domain: 'ESO', description: 'Heritage tourism, cultural visits and sustainable travel.',                    memberCount: 180, memberLimit: 220 },
  { id: 21, name: 'SVR Club',                      domain: 'ESO', description: 'Social service, village outreach and community development.',                  memberCount: 320, memberLimit: 400 },
  { id: 22, name: 'Spiritual Sciences Club',       domain: 'ESO', description: 'Spiritual growth, mindfulness and value-based education.',                     memberCount: 150, memberLimit: 200 },
  { id: 23, name: 'KL Youth Policy Club',          domain: 'ESO', description: 'Youth governance, policy debates and civic leadership.',                       memberCount: 125, memberLimit: 150 },
  // IIE
  { id: 24, name: 'ACIC',                          domain: 'IIE', description: 'Atal Community Innovation Centre — startup incubation and innovation.',        memberCount: 210, memberLimit: 300 },
  { id: 25, name: 'TBI',                           domain: 'IIE', description: 'Technology Business Incubator — mentoring student entrepreneurs.',              memberCount: 185, memberLimit: 250 },
];

export const DEMO_ACTIVITIES = [
  { code: 'ACT001', title: 'National Hackathon 2026',       domain: 'TEC', description: '36-hour national-level hackathon — build innovative solutions to real-world problems with teams from across India.',             difficulty: 'Intermediate', sdc_credits: 15, enrolledCount: 480, activity_date: '2026-09-15', venue: 'KL Tech Arena, Block A' },
  { code: 'ACT002', title: 'Classical Dance Festival',      domain: 'LCH', description: 'Annual cultural extravaganza showcasing Bharatanatyam, Kuchipudi and folk dance performances by student clubs.',                  difficulty: 'Beginner',      sdc_credits: 10, enrolledCount: 320, activity_date: '2026-09-28', venue: 'KL Auditorium' },
  { code: 'ACT003', title: 'Cybersecurity Workshop',        domain: 'TEC', description: 'Hands-on ethical hacking and penetration testing workshop led by industry experts from top security firms.',                      difficulty: 'Advanced',      sdc_credits: 12, enrolledCount: 215, activity_date: '2026-10-05', venue: 'Lab Block 3, Room 302' },
  { code: 'ACT004', title: 'Campus Marathon 2026',          domain: 'HWB', description: '5K and 10K campus marathon promoting fitness and a healthy lifestyle. Open to all KL University students and faculty.',            difficulty: 'Beginner',      sdc_credits:  8, enrolledCount: 560, activity_date: '2026-10-12', venue: 'KL University Main Ground' },
  { code: 'ACT005', title: 'Startup Pitch Competition',     domain: 'IIE', description: 'Present your startup idea to a panel of investors and industry leaders for seed funding and mentorship.',                         difficulty: 'Advanced',      sdc_credits: 20, enrolledCount: 150, activity_date: '2026-10-20', venue: 'Innovation Hub, Block B' },
  { code: 'ACT006', title: 'Photography Exhibition',        domain: 'LCH', description: 'Annual photography showcase displaying student work on themes of culture, nature, campus life and social impact.',                 difficulty: 'Beginner',      sdc_credits:  6, enrolledCount: 290, activity_date: '2026-10-25', venue: 'KL Art Gallery' },
  { code: 'ACT007', title: 'Yoga & Wellness Week',          domain: 'HWB', description: 'A week-long programme of morning yoga, meditation, nutrition talks and mental health awareness sessions.',                         difficulty: 'Beginner',      sdc_credits:  5, enrolledCount: 410, activity_date: '2026-11-01', venue: 'KL Open Grounds' },
  { code: 'ACT008', title: 'EV Design Challenge',           domain: 'TEC', description: 'Design and prototype an efficient electric vehicle component. Teams compete for the best energy-saving innovation.',               difficulty: 'Advanced',      sdc_credits: 18, enrolledCount: 95,  activity_date: '2026-11-08', venue: 'Engineering Workshop, Block C' },
  { code: 'ACT009', title: 'Street Play Festival',          domain: 'LCH', description: 'Theatre Arts clubs take to the campus streets with powerful social message performances open to all viewers.',                    difficulty: 'Intermediate', sdc_credits:  8, enrolledCount: 175, activity_date: '2026-11-14', venue: 'Campus Central Plaza' },
  { code: 'ACT010', title: 'Social Outreach Camp',          domain: 'ESO', description: 'Community outreach programme — students visit villages to provide education, health check-ups and livelihood support.',            difficulty: 'Beginner',      sdc_credits: 10, enrolledCount: 230, activity_date: '2026-11-20', venue: 'Vijayawada District Villages' },
  // Past events
  { code: 'ACT011', title: 'Freshers Coding Sprint',        domain: 'TEC', description: 'Entry-level coding competition designed for first-year students to showcase their programming skills.',                           difficulty: 'Beginner',      sdc_credits:  8, enrolledCount: 312, activity_date: '2026-07-20', venue: 'Computer Lab, Block A' },
  { code: 'ACT012', title: 'Vastraa Fashion Show 2026',     domain: 'LCH', description: 'Annual fashion extravaganza celebrating traditional Indian textiles, fusion wear and sustainable fashion by student designers.',   difficulty: 'Intermediate', sdc_credits:  9, enrolledCount: 265, activity_date: '2026-07-30', venue: 'KL Auditorium' },
];

export const DEMO_ANNOUNCEMENTS = [
  {
    id: 1,
    type: 'urgent' as const,
    title: 'Club Registration Deadline — 25 August 2026',
    content: 'All students must complete their club registrations on the Student Portal before 25 August 2026. Late registrations will not be accepted. Visit sac.kluniversity.in to register now.',
    created_at: '2026-08-10T09:00:00',
    expires_at: '2026-08-25T23:59:00',
  },
  {
    id: 2,
    type: 'event' as const,
    title: 'National Hackathon 2026 — Registration Open',
    content: 'ZeroOne Code Club is hosting the National Hackathon 2026 on 15 September. Form teams of 2-4 and register on the portal. Last date to register: 10 September 2026.',
    created_at: '2026-08-08T10:30:00',
    expires_at: '2026-09-10T23:59:00',
  },
  {
    id: 3,
    type: 'general' as const,
    title: 'SDC Credit Policy Update — Semester 1 2026',
    content: 'Students must earn a minimum of 30 SDC credits per semester to be eligible for club leadership roles. Credits earned through activities, workshops and events all count. Check your portal dashboard for your current balance.',
    created_at: '2026-08-05T11:00:00',
    expires_at: null,
  },
  {
    id: 4,
    type: 'event' as const,
    title: 'Classical Dance Festival — Auditions Open',
    content: 'Dance Club is conducting auditions for the Classical Dance Festival on 28 September. All dance forms welcome. Auditions will be held on 5 & 6 September at the KL Auditorium. Register on the portal.',
    created_at: '2026-08-01T14:00:00',
    expires_at: '2026-09-06T18:00:00',
  },
  {
    id: 5,
    type: 'general' as const,
    title: 'Welcome to KL SAC — Academic Year 2026-27',
    content: 'The Student Activity Center welcomes all students to the new academic year. Explore our 25 clubs across 5 domains, enroll in activities, and make your university years count. Together we grow!',
    created_at: '2026-07-25T09:00:00',
    expires_at: null,
  },
];

export const DOMAIN_META: Record<string, { label: string; color: string; bg: string }> = {
  TEC: { label: 'Technology',                          color: '#8B0000', bg: 'bg-red-100 text-red-900' },
  LCH: { label: 'Liberal Arts, Cultural & Hobby',      color: '#B91C1C', bg: 'bg-red-100 text-red-900' },
  HWB: { label: 'Health & Wellbeing',                  color: '#7C0000', bg: 'bg-red-100 text-red-900' },
  ESO: { label: 'Extension & Social Outreach',         color: '#991B1B', bg: 'bg-red-100 text-red-900' },
  IIE: { label: 'Innovation, Incubation & Entrepreneurship', color: '#C53030', bg: 'bg-red-100 text-red-900' },
};
