import { Toaster } from 'react-hot-toast';
import AdminNav from './_components/AdminNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--muted)' }}>
      <Toaster position="top-right" />
      <AdminNav />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
        {children}
      </main>
    </div>
  );
}
