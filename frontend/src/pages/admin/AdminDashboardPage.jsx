import React, { useState, useEffect, useCallback } from 'react';
import { getDashboardStats } from '../../services/dashboardService';
import { StatCard } from '../../components/admin/StatCard';
import { ActivityChart } from '../../components/admin/ActivityChart';
import { DistributionChart } from '../../components/admin/DistributionChart';
import { RecentInquiriesTable, RecentApplicationsTable } from '../../components/admin/RecentTables';
import { AdminSkeleton } from '../../components/admin/AdminSkeleton';
import { AdminErrorCard } from '../../components/admin/AdminErrorCard';
import { AdminLayout } from '../../layouts/AdminLayout';
import { FolderGit2, Code, BookOpen, FileText, Users, MessageSquareQuote, Briefcase, UserCheck, Mail, Newspaper } from 'lucide-react';

export const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [range, setRange] = useState('30d');
  const [data, setData] = useState(null);

  const fetchDashboardData = useCallback(async (selectedRange = range, isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');

    try {
      const resData = await getDashboardStats(selectedRange);
      setData(resData);
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err);
      setError(err.message || 'Unable to fetch database analytics.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [range]);

  useEffect(() => {
    fetchDashboardData(range);
  }, [range, fetchDashboardData]);

  const handleRangeChange = (newRange) => {
    setRange(newRange);
  };

  const handleRefresh = () => {
    fetchDashboardData(range, true);
  };

  if (loading) {
    return (
      <AdminLayout onRefresh={handleRefresh} isRefreshing={refreshing} dateRange={range} onDateRangeChange={handleRangeChange}>
        <AdminSkeleton />
      </AdminLayout>
    );
  }

  if (error || !data) {
    return (
      <AdminLayout onRefresh={handleRefresh} isRefreshing={refreshing} dateRange={range} onDateRangeChange={handleRangeChange}>
        <AdminErrorCard message={error} onRetry={() => fetchDashboardData(range)} />
      </AdminLayout>
    );
  }

  const { stats, recentInquiries = [], recentApplications = [], monthlyInquiries = [], monthlyApplications = [], serviceDistribution = [] } = data;

  return (
    <AdminLayout onRefresh={handleRefresh} isRefreshing={refreshing} dateRange={range} onDateRangeChange={handleRangeChange}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Good day, Administrator 👋
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-normal">
              Real database metrics and system activity analytics for Krivexa Technologies.
            </p>
          </div>
          <div className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-elevated)] px-4 py-2 rounded-xl border border-[var(--border-subtle)] w-fit">
            📅 {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* Top Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Projects"
            value={stats.projects}
            icon={FolderGit2}
            description="Active enterprise projects"
            color="blue"
          />
          <StatCard
            title="Active Services"
            value={stats.services}
            icon={Code}
            description="Core engineering capabilities"
            color="violet"
          />
          <StatCard
            title="Contact Inquiries"
            value={stats.inquiries}
            icon={Mail}
            description="Submissions from client lead form"
            color="cyan"
          />
          <StatCard
            title="Job Applications"
            value={stats.applications}
            icon={UserCheck}
            description="Applicants via careers portal"
            color="emerald"
          />
        </div>

        {/* Secondary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500"><BookOpen className="w-4 h-4" /></div>
            <div>
              <div className="text-xl font-bold text-[var(--text-primary)]">{stats.caseStudies}</div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Case Studies</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500"><FileText className="w-4 h-4" /></div>
            <div>
              <div className="text-xl font-bold text-[var(--text-primary)]">{stats.blogPosts}</div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Blog Posts</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500"><Users className="w-4 h-4" /></div>
            <div>
              <div className="text-xl font-bold text-[var(--text-primary)]">{stats.teamMembers}</div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Team Members</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500"><MessageSquareQuote className="w-4 h-4" /></div>
            <div>
              <div className="text-xl font-bold text-[var(--text-primary)]">{stats.testimonials}</div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Testimonials</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500"><Briefcase className="w-4 h-4" /></div>
            <div>
              <div className="text-xl font-bold text-[var(--text-primary)]">{stats.careers}</div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Careers</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500"><Newspaper className="w-4 h-4" /></div>
            <div>
              <div className="text-xl font-bold text-[var(--text-primary)]">{stats.subscribers}</div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Subscribers</div>
            </div>
          </div>
        </div>

        {/* Interactive Recharts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityChart inquiriesData={monthlyInquiries} applicationsData={monthlyApplications} />
          </div>
          <div>
            <DistributionChart data={serviceDistribution} title="Inquiry Service Ratio" />
          </div>
        </div>

        {/* Real Activity Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentInquiriesTable inquiries={recentInquiries} />
          <RecentApplicationsTable applications={recentApplications} />
        </div>
      </div>
    </AdminLayout>
  );
};
