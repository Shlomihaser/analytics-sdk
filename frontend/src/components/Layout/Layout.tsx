import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-row">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header onMenuToggle={toggleSidebar} />
        <main>
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};