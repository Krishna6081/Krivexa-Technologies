import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiService.post('/auth/forgot-password', { email });
      setMessage(response.data?.message || 'If an account exists for this email, a password reset link will be sent.');
    } catch (err) {
      setMessage('If an account exists for this email, a password reset link will be sent.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-between">
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-lg">
            K
          </div>
          <span className="font-extrabold text-lg text-[var(--text-primary)] tracking-tight">KRIVEXA TECHNOLOGIES</span>
        </Link>
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-8 flex items-center">
        <div className="w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2">Reset Password</h1>
            <p className="text-sm text-[var(--text-secondary)]">Enter your account email to receive a password reset link.</p>
          </div>

          <Card>
            <CardBody className="p-8">
              {message ? (
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] font-semibold leading-relaxed">{message}</p>
                  <Link to="/login">
                    <Button variant="outline" size="md" className="w-full mt-4">
                      Return to Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail className="w-4 h-4" />}
                    placeholder="name@company.com"
                  />
                  <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full mt-2">
                    Send Reset Link
                  </Button>
                </form>
              )}
            </CardBody>
          </Card>
        </div>
      </main>

      <footer className="p-6 text-center text-xs text-[var(--text-muted)]">
        © 2026 Krivexa Technologies. All Rights Reserved.
      </footer>
    </div>
  );
};
