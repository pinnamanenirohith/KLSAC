'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Clock, Megaphone, LogOut } from 'lucide-react';

const links = [
  { href: '/admin',               label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/admin/pending',       label: 'Pending',       icon: Clock },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router   = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <header className="border-b" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-bold text-lg" style={{ color: 'var(--primary)' }}>
            ⚡ KL SAC Admin
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      background: pathname === href ? 'var(--muted)' : 'transparent',
                      color: pathname === href ? 'var(--primary)' : 'var(--muted-foreground)',
                    }}>
                <Icon size={14} /> {label}
              </Link>
            ))}
          </nav>
        </div>
        <button onClick={logout}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors hover:bg-red-50 text-red-600">
          <LogOut size={14} /> Logout
        </button>
      </div>
    </header>
  );
}
