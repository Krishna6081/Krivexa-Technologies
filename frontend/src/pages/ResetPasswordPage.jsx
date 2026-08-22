import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../services/api';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number.');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.post('/auth/reset-password', { token, password });
      if (response.data && response.data.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(response.data?.message || 'Password reset failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed.');
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
            <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2">Create New Password</h1>
            <p className="text-sm text-[var(--text-secondary)]">Enter and confirm your new account password.</p>
          </div>

          <Card>
            <CardBody className="p-8">
              {success ? (
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">Password updated successfully.</p>
                  <p className="text-xs text-[var(--text-muted)]">Redirecting to Sign In...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-500 text-center">
                      {error}
                    </div>
                  )}

                  <Input
                    label="New Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftIcon={<Lock className="w-4 h-4" />}
                  />

                  <Input
                    label="Confirm New Password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    leftIcon={<Lock className="w-4 h-4" />}
                  />

                  <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full mt-2">
                    Reset Password
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
