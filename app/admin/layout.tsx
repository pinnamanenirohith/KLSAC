import { Toaster } from 'react-hot-toast';
import AdminNav from './_components/AdminNav';

export const metadata = { title: 'KL SAC Admin' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#F7F7F8' }}>
      <Toaster position="top-right" />
      <AdminNav />
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
        {children}
      </main>
    </div>
  );
}
