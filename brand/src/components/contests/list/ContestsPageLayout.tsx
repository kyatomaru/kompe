import React from 'react';

interface ContestsPageLayoutProps {
  children: React.ReactNode;
}

export function ContestsPageLayout({ children }: ContestsPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
} 