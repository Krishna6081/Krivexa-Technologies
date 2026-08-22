import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, Mail, User, Phone, Building, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const passwordLength = formData.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasLowercase = /[a-z]/.test(formData.password);
  const hasNumber = /\d/.test(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);
    const res = await register(formData);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-between">
      {/* Top Simple Header */}
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
          {/* Left Column: Registration Form */}
          <div className="lg:col-span-7 max-w-xl mx-auto lg:mx-0 w-full">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2">
                Create Your Account
              </h1>
              <p className="text-sm text-[var(--text-secondary)]">
                Join Krivexa Technologies to manage digital projects and client inquiries.
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      leftIcon={<User className="w-4 h-4" />}
                      placeholder="Krishna"
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Jadhav"
                    />
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    leftIcon={<Mail className="w-4 h-4" />}
                    placeholder="name@company.com"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number (Optional)"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      leftIcon={<Phone className="w-4 h-4" />}
                      placeholder="+91 9876543210"
                    />
                    <Input
                      label="Company Name (Optional)"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      leftIcon={<Building className="w-4 h-4" />}
                      placeholder="Krivexa Inc"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Input
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
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

                    <Input
                      label="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      leftIcon={<Lock className="w-4 h-4" />}
                    />
                  </div>

                  {/* Password Checklist */}
                  <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[11px] grid grid-cols-2 gap-2 font-semibold">
                    <div className={passwordLength ? 'text-emerald-500 font-bold' : 'text-[var(--text-muted)]'}>
                      {passwordLength ? '✓' : '○'} 8+ characters
                    </div>
                    <div className={hasUppercase ? 'text-emerald-500 font-bold' : 'text-[var(--text-muted)]'}>
                      {hasUppercase ? '✓' : '○'} Uppercase letter
                    </div>
                    <div className={hasLowercase ? 'text-emerald-500 font-bold' : 'text-[var(--text-muted)]'}>
                      {hasLowercase ? '✓' : '○'} Lowercase letter
                    </div>
                    <div className={hasNumber ? 'text-emerald-500 font-bold' : 'text-[var(--text-muted)]'}>
                      {hasNumber ? '✓' : '○'} One number
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-2.5 pt-2">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-1 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="agreeTerms" className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      I agree to the <Link to="/terms" className="text-blue-600 font-bold hover:underline">Terms & Conditions</Link> and <Link to="/privacy-policy" className="text-blue-600 font-bold hover:underline">Privacy Policy</Link>.
                    </label>
                  </div>

                  <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full mt-4" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Create Account
                  </Button>
                </form>

                <div className="mt-6 text-center text-xs text-[var(--text-secondary)] font-medium">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 font-extrabold hover:underline">
                    Sign In
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column: Technology Visual */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="glass-panel p-8 rounded-[32px] border border-[var(--border-subtle)] space-y-6 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-[var(--text-primary)] leading-snug">
                Building Modern Software for Ambitious Enterprises
              </h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                Access your Krivexa client dashboard to manage project deliverables, request technical consultations, and track architectural milestones.
              </p>

              <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-3 text-xs font-bold text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>256-bit JWT Encryption & Security</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Real-Time Project Inquiry Dashboard</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Direct Communication with Engineering Leads</span>
                </div>
              </div>
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
