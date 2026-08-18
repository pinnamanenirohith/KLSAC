import { requireAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import pool from '@/lib/db';
import { ensureSACTables } from '@/lib/db-setup';
import Link from 'next/link';
import { Clock, CheckCircle, XCircle, Megaphone } from 'lucide-react';

export const metadata = { title: 'Admin Dashboard — KL SAC' };

async function getDashboardStats() {
  await ensureSACTables();
  const [[pending], [approved], [denied], [announcements]] = await Promise.all([
    pool.execute(`
      SELECT COUNT(*) as count FROM (
        SELECT code as id FROM activity_catalogue
        WHERE NOT EXISTS (SELECT 1 FROM website_approvals WHERE content_type='activity' AND content_id=code)
        UNION ALL
        SELECT CAST(id AS CHAR) FROM clubs
        WHERE NOT EXISTS (SELECT 1 FROM website_approvals WHERE content_type='club' AND content_id=CAST(id AS CHAR))
      ) as unreviewed
    `),
    pool.execute(`SELECT COUNT(*) as count FROM website_approvals WHERE status='approved'`),
    pool.execute(`SELECT COUNT(*) as count FROM website_approvals WHERE status='denied'`),
    pool.execute(`SELECT COUNT(*) as count FROM sac_announcements WHERE is_active=TRUE`),
  ]);
  return {
    pending:       (pending as any[])[0].count,
    approved:      (approved as any[])[0].count,
    denied:        (denied as any[])[0].count,
    announcements: (announcements as any[])[0].count,
  };
}

export default async function AdminDashboard() {
  const { error } = await requireAdmin();
  if (error) redirect('/admin/login');

  const stats = await getDashboardStats();

  const cards = [
    { label: 'Awaiting Review', value: stats.pending,       icon: Clock,        color: 'text-yellow-600', bg: 'bg-yellow-50', href: '/admin/pending' },
    { label: 'Approved',        value: stats.approved,      icon: CheckCircle,  color: 'text-green-600',  bg: 'bg-green-50' },
    { label: 'Denied',          value: stats.denied,        icon: XCircle,      color: 'text-red-600',    bg: 'bg-red-50' },
    { label: 'Announcements',   value: stats.announcements, icon: Megaphone,    color: 'text-blue-600',   bg: 'bg-blue-50', href: '/admin/announcements' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-2">Dashboard</h1>
      <p className="mb-8 text-sm" style={{ color: 'var(--muted-foreground)' }}>
        Manage what appears on the public KL SAC website.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {cards.map(({ label, value, icon: Icon, color, bg, href }) => (
          <div key={label} className="rounded-2xl border p-6 flex flex-col gap-3"
               style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
              <Icon size={20} className={color} />
            </div>
            <div className="text-3xl font-extrabold">{value}</div>
            <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{label}</div>
            {href && (
              <Link href={href} className="text-xs font-semibold hover:underline mt-auto"
                    style={{ color: 'var(--primary)' }}>
                View →
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <h2 className="font-bold text-lg mb-3">How it works</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          <li>New activities and clubs added in the Student Portal appear in <strong>Pending</strong>.</li>
          <li>You review each item and click <strong>Approve</strong> or <strong>Deny</strong>.</li>
          <li>Approved items immediately appear on the public website.</li>
          <li>Use <strong>Announcements</strong> to post manual notices to the ticker and announcements page.</li>
        </ol>
      </div>
    </div>
  );
}
