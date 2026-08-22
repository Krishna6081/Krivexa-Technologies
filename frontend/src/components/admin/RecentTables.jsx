import React from 'react';
import { Badge } from '../ui/Badge';
import { Mail, Briefcase, FolderGit2, Calendar } from 'lucide-react';

export const RecentInquiriesTable = ({ inquiries = [] }) => {
  return (
    <div className="p-6 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[var(--text-primary)]">Recent Contact Inquiries</h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Database records submitted via website contact form</p>
          </div>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="py-12 text-center text-xs font-semibold text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] rounded-2xl">
          No inquiries recorded yet. New submissions will appear here live.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase tracking-wider font-extrabold pb-3">
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">Email</th>
                <th className="py-3 px-3">Service</th>
                <th className="py-3 px-3">Budget</th>
                <th className="py-3 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-[var(--bg-elevated)]/50 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-[var(--text-primary)]">{inq.full_name || inq.fullName}</td>
                  <td className="py-3.5 px-3 text-[var(--text-secondary)]">{inq.email}</td>
                  <td className="py-3.5 px-3">
                    <Badge variant="indigo" size="sm">{inq.service || 'General'}</Badge>
                  </td>
                  <td className="py-3.5 px-3 text-[var(--text-muted)] font-mono">{inq.budget || 'N/A'}</td>
                  <td className="py-3.5 px-3 text-[var(--text-muted)] font-mono">
                    {new Date(inq.created_at || inq.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const RecentApplicationsTable = ({ applications = [] }) => {
  return (
    <div className="p-6 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-500">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[var(--text-primary)]">Recent Job Applications</h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Submissions received through careers portal</p>
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="py-12 text-center text-xs font-semibold text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] rounded-2xl">
          No job applications received yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase tracking-wider font-extrabold pb-3">
                <th className="py-3 px-3">Applicant</th>
                <th className="py-3 px-3">Email</th>
                <th className="py-3 px-3">Phone</th>
                <th className="py-3 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-[var(--bg-elevated)]/50 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-[var(--text-primary)]">{app.name}</td>
                  <td className="py-3.5 px-3 text-[var(--text-secondary)]">{app.email}</td>
                  <td className="py-3.5 px-3 text-[var(--text-muted)] font-mono">{app.phone || 'N/A'}</td>
                  <td className="py-3.5 px-3 text-[var(--text-muted)] font-mono">
                    {new Date(app.created_at || app.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
