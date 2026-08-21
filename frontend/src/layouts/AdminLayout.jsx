import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import {
  LayoutDashboard,
  Code,
  Briefcase,
  BookOpen,
  MessageSquareQuote,
  Users,
  FileText,
  UserCheck,
  Mail,
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Services', path: '/admin/services', icon: <Code className="w-4 h-4" /> },
    { name: 'Projects', path: '/admin/projects', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Case Studies', path: '/admin/case-studies', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <MessageSquareQuote className="w-4 h-4" /> },
    { name: 'Team', path: '/admin/team', icon: <Users className="w-4 h-4" /> },
    { name: 'Blog', path: '/admin/blog', icon: <FileText className="w-4 h-4" /> },
    { name: 'Careers', path: '/admin/careers', icon: <UserCheck className="w-4 h-4" /> },
    { name: 'Applications', path: '/admin/applications', icon: <UserCheck className="w-4 h-4" /> },
    { name: 'Inquiries', path: '/admin/inquiries', icon: <Mail className="w-4 h-4" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] transition-transform duration-300 flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Bar */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-subtle)]">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-extrabold text-sm">K</div>
              <span className="font-bold text-sm tracking-tight">Krivexa Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[var(--text-muted)]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-500'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-500 flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold truncate">{user?.name || 'Administrator'}</div>
              <div className="text-[10px] text-[var(--text-muted)] truncate">{user?.email || 'admin@krivexa.com'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 sticky top-0 z-40 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[var(--text-primary)]">
            <Menu className="w-6 h-6" />
          </button>

          <div className="text-xs font-semibold text-[var(--text-muted)] hidden sm:block">
            Krivexa Technologies Control Panel
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link to="/" className="text-xs font-semibold text-sky-500 hover:underline">
              View Public Site →
            </Link>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
