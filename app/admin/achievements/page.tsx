import Link from 'next/link';
import { supabase } from '@/lib/supabase-admin';
import { requireAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Plus, Trophy } from 'lucide-react';
import AchievementDeleteButton from './_components/AchievementDeleteButton';

export const dynamic = 'force-dynamic';

const LEVEL_COLORS: Record<string, { bg: string; color: string }> = {
  International: { bg: 'rgba(139,0,0,0.08)', color: '#8B0000' },
  National:      { bg: 'rgba(139,0,0,0.08)', color: '#8B0000' },
  State:         { bg: '#FEF3C7',            color: '#92400E' },
  University:    { bg: '#F4F4F5',            color: '#52525B' },
};

export default async function AchievementsAdminPage() {
  const { error } = await requireAdmin();
  if (error) redirect('/admin/login');

  const { data } = await supabase.from('achievements').select('*').order('sort_order', { ascending: true }).order('year', { ascending: false });
  const achievements = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black" style={{ color: '#0D0D0D', letterSpacing: '-0.02em' }}>
            Achievements
          </h1>
          <p className="text-sm mt-0.5" style={{ color: '#71717A' }}>
            {achievements.length} achievement{achievements.length !== 1 ? 's' : ''} — recognitions, wins, and milestones
          </p>
        </div>
        <Link
          href="/admin/achievements/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
          style={{ background: '#8B0000', color: '#fff' }}>
          <Plus size={15} /> Add Achievement
        </Link>
      </div>

      {achievements.length === 0 ? (
        <div className="rounded-2xl border p-16 text-center" style={{ borderColor: '#E4E4E7' }}>
          <Trophy size={32} className="mx-auto mb-3" style={{ color: '#D1D1D6' }} />
          <p className="font-semibold mb-1" style={{ color: '#0D0D0D' }}>No achievements yet</p>
          <p className="text-sm mb-4" style={{ color: '#A1A1AA' }}>Add awards, qualifications, and milestones earned by SAC students.</p>
          <Link href="/admin/achievements/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: '#8B0000', color: '#fff' }}>
            <Plus size={14} /> Add first achievement
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {achievements.map((a: any) => {
            const ls = LEVEL_COLORS[a.level] ?? LEVEL_COLORS.University;
            return (
              <div key={a.id} className="rounded-2xl border p-5 flex items-start gap-4"
                   style={{ background: '#fff', borderColor: '#E4E4E7' }}>
                {a.photo && (
                  <img src={a.photo} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0"
                       style={{ border: '1px solid #E4E4E7' }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                          style={{ background: ls.bg, color: ls.color }}>
                      {a.level}
                    </span>
                    <span className="text-[10px] font-bold" style={{ color: '#A1A1AA' }}>
                      {a.domain_code} · {a.year}
                    </span>
                  </div>
                  <p className="font-bold text-sm leading-snug mb-0.5" style={{ color: '#0D0D0D' }}>{a.title}</p>
                  <p className="text-xs" style={{ color: '#A1A1AA' }}>{a.club_name} · {a.organization}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/admin/achievements/${a.id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all hover:bg-gray-50"
                    style={{ borderColor: '#E4E4E7', color: '#3F3F46' }}>
                    Edit
                  </Link>
                  <AchievementDeleteButton id={a.id} title={a.title} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
