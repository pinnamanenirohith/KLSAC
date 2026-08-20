import { Toaster } from 'react-hot-toast';
import { getAdminSession } from '@/lib/auth';
import AdminSidebar from './_components/AdminSidebar';

export const metadata = { title: 'KL SAC Admin' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  // No valid session → render children only (middleware already redirected everything
  // except /admin/login here, so this branch is only the login page)
  if (!session) {
    return (
      <>
        <Toaster position="top-right" />
        {children}
      </>
    );
  }

  // Valid session → full sidebar layout
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
