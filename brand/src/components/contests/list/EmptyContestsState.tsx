import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function EmptyContestsState() {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">まだコンテストがありません</h3>
      <p className="text-gray-500 mb-6">最初のコンテストを作成してクリエイターとつながりましょう</p>
      <Link href="/contests/create">
        <Button className="bg-black text-white hover:bg-gray-800">
          コンテストを作成する
        </Button>
      </Link>
    </div>
  );
} 