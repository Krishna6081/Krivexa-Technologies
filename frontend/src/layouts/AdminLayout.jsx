import React, { useState, useEffect } from 'react';
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
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Plus,
  Home,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminLayout = ({ children, onRefresh, isRefreshing, dateRange, onDateRangeChange }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({
    content: true,
    business: true
  });

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Breadcrumb generator based on current route
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path.includes('/admin/services')) return [ { label: 'Admin', path: '/admin/dashboard' }, { label: 'Content' }, { label: 'Services' } ];
    if (path.includes('/admin/projects')) return [ { label: 'Admin', path: '/admin/dashboard' }, { label: 'Content' }, { label: 'Projects' } ];
    if (path.includes('/admin/case-studies')) return [ { label: 'Admin', path: '/admin/dashboard' }, { label: 'Content' }, { label: 'Case Studies' } ];
    if (path.includes('/admin/blog')) return [ { label: 'Admin', path: '/admin/dashboard' }, { label: 'Content' }, { label: 'Blog Posts' } ];
    if (path.includes('/admin/team')) return [ { label: 'Admin', path: '/admin/dashboard' }, { label: 'Content' }, { label: 'Team' } ];
    if (path.includes('/admin/testimonials')) return [ { label: 'Admin', path: '/admin/dashboard' }, { label: 'Content' }, { label: 'Testimonials' } ];
    if (path.includes('/admin/careers')) return [ { label: 'Admin', path: '/admin/dashboard' }, { label: 'Business' }, { label: 'Careers' } ];
    if (path.includes('/admin/applications')) return [ { label: 'Admin', path: '/admin/dashboard' }, { label: 'Business' }, { label: 'Applications' } ];
    if (path.includes('/admin/inquiries')) return [ { label: 'Admin', path: '/admin/dashboard' }, { label: 'Business' }, { label: 'Inquiries' } ];
    if (path.includes('/admin/newsletter')) return [ { label: 'Admin', path: '/admin/dashboard' }, { label: 'Business' }, { label: 'Newsletter' } ];
    if (path.includes('/admin/settings')) return [ { label: 'Admin', path: '/admin/dashboard' }, { label: 'System' }, { label: 'Settings' } ];
    return [ { label: 'Admin' }, { label: 'Dashboard' } ];
  };

  const breadcrumbs = getBreadcrumbs();

  const navSections = [
    {
      key: 'main',
      title: 'MAIN',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      key: 'content',
      title: 'CONTENT MANAGEMENT',
      expandable: true,
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
      key: 'business',
      title: 'BUSINESS & LEADS',
      expandable: true,
      items: [
        { name: 'Careers', path: '/admin/careers', icon: Briefcase },
        { name: 'Applications', path: '/admin/applications', icon: UserCheck },
        { name: 'Inquiries', path: '/admin/inquiries', icon: Mail },
        { name: 'Newsletter', path: '/admin/newsletter', icon: Newspaper }
      ]
    },
    {
      key: 'system',
      title: 'SYSTEM',
      items: [
        { name: 'Settings', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] text-[var(--text-primary)]">
      {/* Brand Header */}
      <div className="h-[72px] px-6 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
        <Link to="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
            K
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight leading-none text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">
              KRIVEXA
            </span>
            <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[var(--text-muted)] mt-0.5">
              Admin Panel
            </span>
          </div>
        </Link>

        <Link to="/" title="View Public Website" className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-blue-500 hover:border-blue-500/30 transition-colors">
          <Home className="w-4 h-4" />
        </Link>
      </div>

      {/* Navigation Links with Collapsible Static Flow Submenus */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {navSections.map((section) => {
          const isOpen = openSubmenus[section.key] !== false;
          return (
            <div key={section.title} className="space-y-1">
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {section.title}
                </span>
                {section.expandable && (
                  <button
                    onClick={() => toggleSubmenu(section.key)}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

              {isOpen && (
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/20'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[var(--text-muted)]'}`} />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fixed Admin User Profile Footer */}
      <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 shrink-0">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-extrabold text-[var(--text-primary)] truncate">{user?.name || 'Administrator'}</span>
            <span className="text-[10px] text-[var(--text-muted)] truncate">{user?.email || 'admin@krivexa.com'}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer border border-rose-500/10"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex">
      {/* 1. Fixed Desktop Sidebar (260px width) */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 z-30">
        {renderSidebarContent()}
      </aside>

      {/* 2. Mobile Backdrop Overlay & Off-Canvas Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 z-50 shadow-2xl"
            >
              {renderSidebarContent()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main Content Container (Padded left 260px on desktop to prevent any overlap) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 w-full">
        {/* Sticky Topbar with Breadcrumbs & Action Toolbar */}
        <header className="sticky top-0 z-20 h-[72px] glass-panel border-b border-[var(--border-subtle)] px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] cursor-pointer"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Breadcrumbs Trail */}
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] truncate">
              {breadcrumbs.map((bc, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[var(--border-strong)]">/</span>}
                  {bc.path ? (
                    <Link to={bc.path} className="hover:text-blue-500 transition-colors truncate">
                      {bc.label}
                    </Link>
                  ) : (
                    <span className={idx === breadcrumbs.length - 1 ? 'text-[var(--text-primary)] font-extrabold truncate' : 'truncate'}>
                      {bc.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right: Refresh Button, Date Filter, Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-blue-500/40 transition-all cursor-pointer shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`} />
                <span className="hidden sm:inline">Refresh Data</span>
              </button>
            )}

            {onDateRangeChange && (
              <select
                value={dateRange || '30d'}
                onChange={(e) => onDateRangeChange(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)] focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 3 Months</option>
                <option value="12m">Last 12 Months</option>
                <option value="all">All Time</option>
              </select>
            )}

            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer shadow-sm"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* 4. Page Content Body */}
        <main className="flex-1 px-4 sm:px-8 py-8 w-full max-w-full">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
