import { useState } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Menu, Shield } from 'lucide-react';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed drawer on mobile, static column on md+ */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 shrink-0
          md:relative md:inset-auto md:z-auto
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b shrink-0 md:hidden"
          style={{ background: 'var(--sidebar)', borderColor: 'var(--sidebar-border)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded"
            style={{ color: 'var(--foreground)', borderRadius: 'var(--radius)' }}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-7 h-7 rounded"
              style={{ background: 'var(--primary)', borderRadius: 'var(--radius)' }}
            >
              <Shield size={14} color="white" />
            </div>
            <span style={{ fontFamily: 'var(--text-h3-family)', fontSize: 'var(--text-h3-size)', color: 'var(--foreground)', fontWeight: 500, letterSpacing: '0.06em' }}>
              SATRIA
            </span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
