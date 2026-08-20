import { Toaster } from 'react-hot-toast';
import AdminSidebar from './_components/AdminSidebar';

export const metadata = { title: 'KL SAC Admin' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: '#F4F4F6' }}>
      <Toaster position="top-right" />
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <main className="flex-1 p-6 sm:p-8 max-w-5xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
