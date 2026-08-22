import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { SERVICES_DATA, PROJECTS_DATA } from '../../data/mockData';
import { Lock, Mail, Edit3, Trash2, Plus } from 'lucide-react';

export { AdminDashboardPage } from './AdminDashboardPage';

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
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/20">
            K
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Krivexa Admin Console</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">Authorized personnel login</p>
        </div>

        <Card>
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-500 text-center">
                  {error}
                </div>
              )}
              <Input
                label="Email"
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
            <div className="mt-4 text-[11px] text-[var(--text-muted)] text-center">
              Demo Credentials: <span className="font-mono text-[var(--text-primary)]">admin@krivexa.com</span> / <span className="font-mono text-[var(--text-primary)]">admin123</span>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export const AdminServicesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">Services Management</h1>
      <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Service</Button>
    </div>
    <Card>
      <CardBody className="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {SERVICES_DATA.map((s) => (
              <tr key={s.id}>
                <td className="p-4 font-bold text-[var(--text-primary)]">{s.title}</td>
                <td className="p-4 text-[var(--text-muted)]">{s.slug}</td>
                <td className="p-4 flex gap-2">
                  <button className="p-1.5 rounded bg-[var(--bg-elevated)] text-sky-500"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded bg-[var(--bg-elevated)] text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </div>
);

export const AdminProjectsPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">Projects Management</h1>
      <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Project</Button>
    </div>
    <Card>
      <CardBody className="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase">
            <tr>
              <th className="p-4">Project Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {PROJECTS_DATA.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-bold text-[var(--text-primary)]">{p.title}</td>
                <td className="p-4"><Badge variant="indigo" size="sm">{p.category}</Badge></td>
                <td className="p-4 flex gap-2">
                  <button className="p-1.5 rounded bg-[var(--bg-elevated)] text-sky-500"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded bg-[var(--bg-elevated)] text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </div>
);

export const AdminCaseStudiesPage = () => <div className="space-y-6"><h1 className="text-2xl font-bold">Case Studies CRUD</h1></div>;
export const AdminTestimonialsPage = () => <div className="space-y-6"><h1 className="text-2xl font-bold">Testimonials CRUD</h1></div>;
export const AdminTeamPage = () => <div className="space-y-6"><h1 className="text-2xl font-bold">Team CRUD</h1></div>;
export const AdminBlogPage = () => <div className="space-y-6"><h1 className="text-2xl font-bold">Blog Posts CRUD</h1></div>;
export const AdminCareersPage = () => <div className="space-y-6"><h1 className="text-2xl font-bold">Careers CRUD</h1></div>;
export const AdminApplicationsPage = () => <div className="space-y-6"><h1 className="text-2xl font-bold">Job Applications</h1></div>;
export const AdminInquiriesPage = () => <div className="space-y-6"><h1 className="text-2xl font-bold">Inquiries</h1></div>;
export const AdminSettingsPage = () => <div className="space-y-6"><h1 className="text-2xl font-bold">Settings</h1></div>;
