import NewsForm from '../_components/NewsForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = { title: 'New Article — KL SAC Admin' };

export default function NewArticlePage() {
  return (
    <div>
      <Link href="/admin/news"
            className="inline-flex items-center gap-1 text-sm mb-6 font-semibold"
            style={{ color: '#71717A' }}>
        <ChevronLeft size={14} /> Back to News
      </Link>
      <h1 className="text-2xl font-black mb-8" style={{ color: '#0D0D0D', letterSpacing: '-0.02em' }}>
        New Article
      </h1>
      <NewsForm mode="create" />
    </div>
  );
}
