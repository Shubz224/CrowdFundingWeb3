import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-[#000000] flex flex-row text-gray-300">
      {/* Sidebar */}
      <div className="sm:flex hidden mr-8">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto p-4 sm:pr-5">
        <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};
