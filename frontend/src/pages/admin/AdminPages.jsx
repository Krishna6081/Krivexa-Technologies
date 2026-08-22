import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import {
  SERVICES_DATA,
  PROJECTS_DATA,
  CASE_STUDIES_DATA,
  BLOG_POSTS_DATA,
  CAREERS_DATA,
  TEAM_DATA
} from '../../data/mockData';
import {
  Lock,
  Mail,
  Edit3,
  Trash2,
  Plus,
  Search,
  UserCheck,
  Code,
  FolderGit2,
  BookOpen,
  FileText,
  Users,
  MessageSquareQuote,
  Briefcase,
  Newspaper,
  Settings,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';

export { AdminDashboardPage } from './AdminDashboardPage';

// --- ADMIN LOGIN WITH PUBLIC HEADER & FOOTER ---
export const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@krivexa.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login({ email, password });
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--bg-primary)]">
      {/* Public Sticky Header */}
      <Navbar />

      {/* Main Login Body */}
      <main className="flex-1 flex items-center justify-center px-4 pt-36 pb-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
              K
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">Krivexa Admin Console</h1>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-semibold">Authorized personnel & engineering administrators only</p>
          </div>

          <Card>
            <CardBody className="p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-500 text-center">
                    {error}
                  </div>
                )}
                <Input
                  label="Admin Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4" />}
                />
                <Input
                  label="Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                />
                <Button type="submit" variant="primary" size="lg" isLoading={loading} className="mt-2">
                  Sign In to Admin Console
                </Button>
              </form>
              <div className="mt-6 text-center text-xs text-[var(--text-secondary)] font-medium">
                Standard client user?{' '}
                <Link to="/login" className="text-blue-600 font-extrabold hover:underline">
                  User Sign In
                </Link>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] text-center font-mono">
                Demo Credentials: <span className="font-bold text-[var(--text-primary)]">admin@krivexa.com</span> / <span className="font-bold text-[var(--text-primary)]">admin123</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>

      {/* Public 5-Column Footer */}
      <Footer />
    </div>
  );
};

// --- USERS MANAGEMENT ---
export const AdminUsersPage = () => {
  const [search, setSearch] = useState('');
  const users = [
    { id: 1, name: 'Krivexa Administrator', email: 'admin@krivexa.com', role: 'SUPER_ADMIN', phone: '+91 9876543210', created: '2026-01-01' },
    { id: 2, name: 'Krishna Jadhav', email: 'krishna@example.com', role: 'USER', phone: '+91 9876543211', created: '2026-02-15' },
    { id: 3, name: 'Alex Rivera', email: 'alex@krivexa.com', role: 'ADMIN', phone: '+91 9876543212', created: '2026-02-20' }
  ];

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">User Accounts</h1>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Registered system users and roles</p>
        </div>
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
          className="w-full sm:w-64"
        />
      </div>

      <Card>
        <CardBody className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase tracking-wider font-extrabold">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Registered Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[var(--bg-elevated)]/50 transition-colors">
                  <td className="p-4 font-extrabold text-[var(--text-primary)]">{u.name}</td>
                  <td className="p-4 text-[var(--text-secondary)]">{u.email}</td>
                  <td className="p-4">
                    <Badge variant={u.role === 'SUPER_ADMIN' ? 'violet' : u.role === 'ADMIN' ? 'indigo' : 'cyan'} size="sm">
                      {u.role}
                    </Badge>
                  </td>
                  <td className="p-4 font-mono text-[var(--text-muted)]">{u.created}</td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-blue-500 hover:bg-blue-500/10 cursor-pointer mr-2"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-rose-500 hover:bg-rose-500/10 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

// --- SERVICES MANAGEMENT ---
export const AdminServicesPage = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Services Management</h1>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">Core engineering & software development capabilities</p>
      </div>
      <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Service</Button>
    </div>

    <Card>
      <CardBody className="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase tracking-wider font-extrabold">
            <tr>
              <th className="p-4">Service Title</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {SERVICES_DATA.map((s) => (
              <tr key={s.id} className="hover:bg-[var(--bg-elevated)]/50 transition-colors">
                <td className="p-4 font-extrabold text-[var(--text-primary)]">{s.title}</td>
                <td className="p-4 text-[var(--text-muted)] font-mono">{s.slug}</td>
                <td className="p-4 text-[var(--text-secondary)] line-clamp-1 max-w-xs">{s.shortDescription}</td>
                <td className="p-4 text-right">
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-blue-500 hover:bg-blue-500/10 cursor-pointer mr-2"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-rose-500 hover:bg-rose-500/10 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </div>
);

// --- PROJECTS MANAGEMENT ---
export const AdminProjectsPage = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Projects Management</h1>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">Portfolio deliverables & client software products</p>
      </div>
      <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Project</Button>
    </div>

    <Card>
      <CardBody className="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase tracking-wider font-extrabold">
            <tr>
              <th className="p-4">Project Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Technologies</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {PROJECTS_DATA.map((p) => (
              <tr key={p.id} className="hover:bg-[var(--bg-elevated)]/50 transition-colors">
                <td className="p-4 font-extrabold text-[var(--text-primary)]">{p.title}</td>
                <td className="p-4"><Badge variant="indigo" size="sm">{p.category}</Badge></td>
                <td className="p-4 text-[var(--text-muted)] truncate max-w-xs">{p.technologies?.join(', ')}</td>
                <td className="p-4 text-right">
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-blue-500 hover:bg-blue-500/10 cursor-pointer mr-2"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-rose-500 hover:bg-rose-500/10 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </div>
);

// --- CASE STUDIES ---
export const AdminCaseStudiesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Case Studies Management</h1>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">Enterprise challenge, solution, & outcome reports</p>
      </div>
      <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Case Study</Button>
    </div>
    <Card>
      <CardBody className="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase tracking-wider font-extrabold">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Industry</th>
              <th className="p-4">Outcome</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {CASE_STUDIES_DATA.map((c) => (
              <tr key={c.id} className="hover:bg-[var(--bg-elevated)]/50 transition-colors">
                <td className="p-4 font-extrabold text-[var(--text-primary)]">{c.title}</td>
                <td className="p-4"><Badge variant="violet" size="sm">{c.industry}</Badge></td>
                <td className="p-4 text-emerald-500 font-bold">{c.outcome}</td>
                <td className="p-4 text-right">
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-blue-500 hover:bg-blue-500/10 cursor-pointer mr-2"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-rose-500 hover:bg-rose-500/10 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </div>
);

// --- BLOG POSTS ---
export const AdminBlogPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Blog Posts Management</h1>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">Engineering articles and technical insights</p>
      </div>
      <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>New Post</Button>
    </div>
    <Card>
      <CardBody className="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase tracking-wider font-extrabold">
            <tr>
              <th className="p-4">Article Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {BLOG_POSTS_DATA.map((b) => (
              <tr key={b.id} className="hover:bg-[var(--bg-elevated)]/50 transition-colors">
                <td className="p-4 font-extrabold text-[var(--text-primary)]">{b.title}</td>
                <td className="p-4"><Badge variant="cyan" size="sm">{b.category}</Badge></td>
                <td className="p-4 text-[var(--text-secondary)]">{b.author}</td>
                <td className="p-4 text-right">
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-blue-500 hover:bg-blue-500/10 cursor-pointer mr-2"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-rose-500 hover:bg-rose-500/10 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </div>
);

// --- TEAM MEMBERS ---
export const AdminTeamPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Team Members Management</h1>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">Leadership team & engineering staff profiles</p>
      </div>
      <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Member</Button>
    </div>
    <Card>
      <CardBody className="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase tracking-wider font-extrabold">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Position</th>
              <th className="p-4">Bio</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {TEAM_DATA.map((t) => (
              <tr key={t.id} className="hover:bg-[var(--bg-elevated)]/50 transition-colors">
                <td className="p-4 font-extrabold text-[var(--text-primary)]">{t.name}</td>
                <td className="p-4 text-blue-500 font-bold">{t.position}</td>
                <td className="p-4 text-[var(--text-secondary)] line-clamp-1 max-w-xs">{t.bio}</td>
                <td className="p-4 text-right">
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-blue-500 hover:bg-blue-500/10 cursor-pointer mr-2"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-rose-500 hover:bg-rose-500/10 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </div>
);

// --- TESTIMONIALS ---
export const AdminTestimonialsPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] font-extrabold">Client Testimonials</h1>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">Approved client feedback & reviews</p>
      </div>
      <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Testimonial</Button>
    </div>
    <Card>
      <CardBody className="p-8 text-center text-xs text-[var(--text-muted)] font-semibold">
        No client testimonials submitted yet. Genuine reviews will be listed here.
      </CardBody>
    </Card>
  </div>
);

// --- CAREERS ---
export const AdminCareersPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Careers Management</h1>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">Open engineering job positions</p>
      </div>
      <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Position</Button>
    </div>
    <Card>
      <CardBody className="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase tracking-wider font-extrabold">
            <tr>
              <th className="p-4">Job Title</th>
              <th className="p-4">Location</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {CAREERS_DATA.map((c) => (
              <tr key={c.id} className="hover:bg-[var(--bg-elevated)]/50 transition-colors">
                <td className="p-4 font-extrabold text-[var(--text-primary)]">{c.title}</td>
                <td className="p-4 text-[var(--text-secondary)]">{c.location}</td>
                <td className="p-4 font-bold text-indigo-500">{c.type}</td>
                <td className="p-4"><Badge variant="success" size="sm">ACTIVE</Badge></td>
                <td className="p-4 text-right">
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-blue-500 hover:bg-blue-500/10 cursor-pointer mr-2"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-rose-500 hover:bg-rose-500/10 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </div>
);

// --- APPLICATIONS ---
export const AdminApplicationsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Job Applications</h1>
      <p className="text-xs text-[var(--text-muted)] mt-0.5">Resumes & applicant submissions from careers portal</p>
    </div>
    <Card>
      <CardBody className="p-8 text-center text-xs text-[var(--text-muted)] font-semibold border border-dashed border-[var(--border-subtle)] rounded-2xl">
        No candidate job applications received yet.
      </CardBody>
    </Card>
  </div>
);

// --- INQUIRIES ---
export const AdminInquiriesPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Contact Inquiries</h1>
      <p className="text-xs text-[var(--text-muted)] mt-0.5">Enterprise lead submissions from contact form</p>
    </div>
    <Card>
      <CardBody className="p-8 text-center text-xs text-[var(--text-muted)] font-semibold border border-dashed border-[var(--border-subtle)] rounded-2xl">
        No client inquiries recorded yet. Submissions will appear here live.
      </CardBody>
    </Card>
  </div>
);

// --- NEWSLETTER ---
export const AdminNewsletterPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Newsletter Subscribers</h1>
      <p className="text-xs text-[var(--text-muted)] mt-0.5">Subscribed email list for updates & engineering blog</p>
    </div>
    <Card>
      <CardBody className="p-8 text-center text-xs text-[var(--text-muted)] font-semibold border border-dashed border-[var(--border-subtle)] rounded-2xl">
        No newsletter subscribers registered yet.
      </CardBody>
    </Card>
  </div>
);

// --- SETTINGS ---
export const AdminSettingsPage = () => (
  <div className="space-y-6 max-w-3xl">
    <div>
      <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">System Settings</h1>
      <p className="text-xs text-[var(--text-muted)] mt-0.5">Platform configuration & security settings</p>
    </div>
    <Card>
      <CardBody className="p-8 space-y-4">
        <Input label="Company Name" defaultValue="Krivexa Technologies" />
        <Input label="Tagline" defaultValue="Innovate. Build. Transform." />
        <Input label="Admin Notification Email" defaultValue="admin@krivexa.com" />
        <Button variant="primary" size="md" className="mt-2">Save Platform Settings</Button>
      </CardBody>
    </Card>
  </div>
);

// --- ADMIN 404 NOT FOUND ---
export const AdminNotFoundPage = () => (
  <div className="py-16 text-center max-w-md mx-auto space-y-4">
    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
      <AlertTriangle className="w-7 h-7" />
    </div>
    <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Admin Page Not Found</h2>
    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
      The requested admin module route does not exist or has been moved.
    </p>
    <div>
      <Link to="/admin/dashboard">
        <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back to Admin Dashboard
        </Button>
      </Link>
    </div>
  </div>
);
