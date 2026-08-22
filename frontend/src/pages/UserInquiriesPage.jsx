import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Mail, Plus, ArrowLeft, Clock } from 'lucide-react';

export const UserInquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await apiService.get('/users/inquiries');
        if (response.data && response.data.success) {
          setInquiries(response.data.data);
        }
      } catch (err) {
        console.warn('Failed to fetch inquiries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/dashboard" className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">My Contact Inquiries</h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-normal">
            Track status and details of submitted consultation & engineering requests.
          </p>
        </div>

        <Link to="/contact">
          <Button variant="primary" size="md" rightIcon={<Plus className="w-4 h-4" />}>
            New Inquiry
          </Button>
        </Link>
      </div>

      <Card>
        <CardBody className="p-8">
          {loading ? (
            <div className="py-12 text-center text-xs text-[var(--text-muted)]">Loading your inquiries...</div>
          ) : inquiries.length === 0 ? (
            <div className="py-16 text-center space-y-4 border border-dashed border-[var(--border-subtle)] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[var(--text-primary)]">No Inquiries Found</h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                You haven't submitted any consultation requests yet. Submit an inquiry to get started.
              </p>
              <div>
                <Link to="/contact">
                  <Button variant="primary" size="md">Submit an Inquiry</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2">
                      <Badge variant="indigo" size="sm">{inq.service || 'General Consulting'}</Badge>
                      {inq.budget && <Badge variant="cyan" size="sm">Budget: {inq.budget}</Badge>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {new Date(inq.created_at || inq.createdAt || Date.now()).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <Badge variant="success" size="sm" icon={<Clock className="w-3 h-3" />}>Received</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">Message Content:</h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)]">
                      "{inq.message}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
