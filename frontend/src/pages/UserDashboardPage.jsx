import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { User, Mail, Plus, ArrowRight, Shield, FolderGit2, FileText, CheckCircle2, Clock } from 'lucide-react';

export const UserDashboardPage = () => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInquiries = async () => {
      try {
        const response = await apiService.get('/users/inquiries');
        if (response.data && response.data.success) {
          setInquiries(response.data.data);
        }
      } catch (err) {
        console.warn('Failed to fetch user inquiries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInquiries();
  }, []);

  const userName = user?.first_name || user?.name || 'Valued Client';

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Welcome Banner */}
      <div className="p-8 sm:p-10 rounded-[28px] glass-panel border border-[var(--border-subtle)] bg-gradient-to-r from-blue-500/5 to-violet-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>CLIENT PORTAL</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Welcome back, <span className="text-gradient">{userName}!</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 font-normal max-w-xl">
            Track your enterprise inquiries, manage your profile settings, and communicate with Krivexa technical leads.
          </p>
        </div>

        <Link to="/contact">
          <Button variant="primary" size="md" rightIcon={<Plus className="w-4 h-4" />}>
            Submit Project Inquiry
          </Button>
        </Link>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card hoverable className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-[var(--text-primary)]">{inquiries.length}</span>
          </div>
          <h3 className="font-extrabold text-base text-[var(--text-primary)] mb-1">My Inquiries</h3>
          <p className="text-xs text-[var(--text-muted)] mb-4">Track submitted consultation & project requests</p>
          <Link to="/dashboard/inquiries" className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
            <span>View All Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

        <Card hoverable className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-500">Verified</span>
          </div>
          <h3 className="font-extrabold text-base text-[var(--text-primary)] mb-1">My Profile</h3>
          <p className="text-xs text-[var(--text-muted)] mb-4">Update contact information & password</p>
          <Link to="/profile" className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
            <span>Edit Profile Settings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

        <Card hoverable className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-[var(--text-muted)]">Active</span>
          </div>
          <h3 className="font-extrabold text-base text-[var(--text-primary)] mb-1">Project Services</h3>
          <p className="text-xs text-[var(--text-muted)] mb-4">Explore custom engineering capabilities</p>
          <Link to="/services" className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
            <span>Explore Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Card>
      </div>

      {/* Recent Inquiries List */}
      <Card>
        <CardBody className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-[var(--text-primary)]">My Recent Inquiries</h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">Your submitted technical inquiry records</p>
            </div>
            <Link to="/dashboard/inquiries" className="text-xs font-bold text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-[var(--text-muted)]">Loading inquiries...</div>
          ) : inquiries.length === 0 ? (
            <div className="py-12 text-center text-xs font-semibold text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] rounded-2xl">
              No project requests submitted yet. Click below to submit your first inquiry.
              <div className="mt-4">
                <Link to="/contact">
                  <Button variant="primary" size="sm">Submit Project Inquiry</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {inquiries.slice(0, 3).map((inq) => (
                <div key={inq.id} className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="indigo" size="sm">{inq.service || 'Software Consulting'}</Badge>
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">
                        {new Date(inq.created_at || inq.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1 font-medium">{inq.message}</p>
                  </div>
                  <Badge variant="success" size="sm" icon={<Clock className="w-3 h-3" />}>
                    Received
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
