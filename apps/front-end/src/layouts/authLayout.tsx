import MemoLogo from '@/components/Logo';
import React, { ReactNode } from 'react';

export const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex mx-auto h-screen">
      <div className="hidden md:flex flex-col w-1/2 bg-primary px-20 py-40 bg-[linear-gradient(to_left,#32B7C5,rgba(0,0,0,0)),url('/login-bg.png')] bg-cover">
        <div className="flex items-center gap-x-2">
          <MemoLogo fontSize={120} />
          <h1 className="text-white">من قرآن می‌خوانم</h1>
        </div>
        <p className="mt-auto text-white">
          تولید شده در عقیدتی سیاسی فرماندهی انتظامی استان همدان
        </p>
      </div>
      {children}
    </div>
  );
};