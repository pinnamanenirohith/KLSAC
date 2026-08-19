'use client';
import { useEffect, useState } from 'react';
import { Megaphone } from 'lucide-react';

interface Announcement { id: number; title: string; type: string; }

export default function AnnouncementTicker() {
  const [items, setItems] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch('/api/public/announcements').then(r => r.json())
      .then(d => setItems(d.data ?? [])).catch(() => {});
  }, []);

  if (!items.length) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-white overflow-hidden"
         style={{ background: 'var(--primary)' }}>
      <Megaphone size={16} className="shrink-0" />
      <div className="overflow-hidden whitespace-nowrap">
        <span className="inline-block animate-[marquee_20s_linear_infinite]">
          {items.map(a => a.title).join('  â€¢  ')}
          &nbsp;&nbsp;&nbsp;
          {items.map(a => a.title).join('  â€¢  ')}
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

