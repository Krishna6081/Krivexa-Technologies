import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight, Lock, Mail, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login({ email, password });
    if (res.success) {
      // Redirect to target or dashboard based on user role
      if (res.user?.role === 'SUPER_ADMIN' || res.user?.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-between">
      {/* Top Header */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-lg">
            K
          </div>
          <span className="font-extrabold text-lg text-[var(--text-primary)] tracking-tight">KRIVEXA TECHNOLOGIES</span>
        </Link>

        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to website</span>
        </Link>
      </header>

      {/* Main 2-Column Authentication Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column: Login Form */}
          <div className="lg:col-span-6 max-w-md mx-auto lg:mx-0 w-full">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2">
                Welcome Back
              </h1>
              <p className="text-sm text-[var(--text-secondary)]">
                Sign in to your Krivexa account to view your dashboard & inquiries.
              </p>
            </div>

            <Card>
              <CardBody className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-500 text-center">
                      {error}
                    </div>
                  )}

                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail className="w-4 h-4" />}
                    placeholder="name@company.com"
                  />

                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      leftIcon={<Lock className="w-4 h-4" />}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-[var(--text-muted)] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-medium cursor-pointer">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                      <span>Remember Me</span>
                    </label>

                    <Link to="/forgot-password" className="text-xs font-bold text-blue-600 hover:underline">
                      Forgot Password?
                    </Link>
                  </div>

                  <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full mt-4" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Sign In
                  </Button>
                </form>

                <div className="mt-6 text-center text-xs text-[var(--text-secondary)] font-medium">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 font-extrabold hover:underline">
                    Create Account
                  </Link>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] text-center">
                  Are you a system administrator? <Link to="/admin/login" className="text-[var(--text-primary)] font-bold hover:underline">Admin Login →</Link>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column: Visual Feature Box */}
          <div className="hidden lg:block lg:col-span-6">
            <div className="glass-panel p-10 rounded-[32px] border border-[var(--border-subtle)] space-y-6 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>USER DASHBOARD PORTAL</span>
              </div>

              <h2 className="text-3xl font-extrabold text-[var(--text-primary)] leading-tight">
                Streamline Your Software Architecture & Deliveries
              </h2>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                Log in to monitor project statuses, view submitted enterprise inquiries, and update your client account details.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-xs text-[var(--text-muted)]">
        © 2026 Krivexa Technologies. All Rights Reserved.
      </footer>
    </div>
  );
};
