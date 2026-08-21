import React, { useState } from 'react';
import { CAREERS_DATA } from '../data/mockData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Toast } from '../components/ui/Toast';
import { apiService } from '../services/api';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    coverMessage: '',
  });

  const handleOpenJob = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.submitApplication({ ...formData, jobId: selectedJob?.id });
      setToastOpen(true);
      setModalOpen(false);
      setFormData({ name: '', email: '', phone: '', linkedin: '', coverMessage: '' });
    } catch {
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Join Our Team"
          title="Build the Future of Enterprise"
          gradientText="Software & AI."
          subtitle="Explore open engineering and design opportunities at Krivexa Technologies."
        />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          <div className="glass-panel p-6 rounded-2xl border border-[var(--border-subtle)] text-center">
            <h4 className="font-bold text-base text-[var(--text-primary)] mb-2">Remote-First Culture</h4>
            <p className="text-xs text-[var(--text-secondary)]">Work from anywhere with flexible operating hours and asynchronous workflows.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-[var(--border-subtle)] text-center">
            <h4 className="font-bold text-base text-[var(--text-primary)] mb-2">Continuous Learning</h4>
            <p className="text-xs text-[var(--text-secondary)]">Dedicated budget for courses, certifications, and technical conferences.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-[var(--border-subtle)] text-center">
            <h4 className="font-bold text-base text-[var(--text-primary)] mb-2">Cutting-Edge Tech Stack</h4>
            <p className="text-xs text-[var(--text-secondary)]">Work with modern React 19, Node.js, AI pipelines, and cloud native tools.</p>
          </div>
        </div>

        {/* Open Positions */}
        <h3 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8">Open Positions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {CAREERS_DATA.map((job) => (
            <Card key={job.id} hoverable={true}>
              <CardBody className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-3">{job.title}</h4>
                  <div className="flex flex-wrap gap-2 text-xs text-[var(--text-muted)] mb-4">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-sky-500" />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-500" />{job.employmentType}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-purple-500" />{job.experience}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {job.skills.map((s, idx) => (
                      <Badge key={idx} variant="outline" size="sm">{s}</Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleOpenJob(job)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Apply Now
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Apply for ${selectedJob?.title || 'Position'}`}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Full Name"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Phone Number"
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <Input
            label="LinkedIn Profile URL"
            type="url"
            placeholder="https://linkedin.com/in/username"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          />
          <Textarea
            label="Cover Message / Portfolio Link"
            rows={3}
            placeholder="Briefly describe your experience and relevant projects..."
            value={formData.coverMessage}
            onChange={(e) => setFormData({ ...formData, coverMessage: e.target.value })}
          />

          <Button type="submit" variant="primary" isLoading={submitting} className="mt-2">
            Submit Application
          </Button>
        </form>
      </Modal>

      <Toast
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        type="success"
        message="Job application submitted successfully! Our team will review your details."
      />
    </div>
  );
};
