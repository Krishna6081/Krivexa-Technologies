import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import {
  LayoutDashboard,
  Code,
  FolderGit2,
  BookOpen,
  FileText,
  Users,
  MessageSquareQuote,
  Briefcase,
  UserCheck,
  Mail,
  Newspaper,
  Settings,
  LogOut,
  Sun,
  Moon,
  Search,
  RefreshCw,
  Calendar,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminLayout = ({ children, onRefresh, isRefreshing, dateRange, onDateRangeChange }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navGroups = [
    {
      title: 'MAIN',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'CONTENT',
      items: [
        { name: 'Services', path: '/admin/services', icon: Code },
        { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
        { name: 'Case Studies', path: '/admin/case-studies', icon: BookOpen },
        { name: 'Blog Posts', path: '/admin/blog', icon: FileText },
        { name: 'Team Members', path: '/admin/team', icon: Users },
        { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote }
      ]
    },
    {
      title: 'BUSINESS',
      items: [
        { name: 'Careers', path: '/admin/careers', icon: Briefcase },
        { name: 'Applications', path: '/admin/applications', icon: UserCheck },
        { name: 'Inquiries', path: '/admin/inquiries', icon: Mail },
        { name: 'Newsletter', path: '/admin/newsletter', icon: Newspaper }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Settings', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-secondary)] fixed inset-y-0 left-0 z-30">
        {/* Brand Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
              K
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight leading-none text-[var(--text-primary)]">KRIVEXA</div>
              <div className="text-[9px] uppercase font-bold tracking-[0.2em] text-[var(--text-muted)] mt-0.5">Admin Console</div>
            </div>
          </Link>
        </div>

        {/* Navigation Group Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)] px-3 mb-2">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[var(--text-muted)]'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Admin User & Logout */}
        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 font-extrabold text-xs flex items-center justify-center border border-blue-500/20">
                A
              </div>
              <div className="text-xs truncate max-w-[110px]">
                <div className="font-extrabold text-[var(--text-primary)] truncate">{user?.name || 'Administrator'}</div>
                <div className="text-[10px] text-[var(--text-muted)] truncate">{user?.email || 'admin@krivexa.com'}</div>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 glass-panel border-b border-[var(--border-subtle)] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-primary)]"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-base sm:text-lg font-extrabold text-[var(--text-primary)] tracking-tight">
              Admin Portal
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Refresh Button */}
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-blue-500/40 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`} />
                <span className="hidden sm:inline">Refresh Data</span>
              </button>
            )}

            {/* Date Range Selector */}
            {onDateRangeChange && (
              <div className="relative inline-flex items-center">
                <select
                  value={dateRange || '30d'}
                  onChange={(e) => onDateRangeChange(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)] focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 3 Months</option>
                  <option value="12m">Last 12 Months</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-8">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
