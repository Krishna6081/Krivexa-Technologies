import React, { useState } from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { apiService } from '../services/api';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/common/SocialIcons';

export const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: 'Software Development',
    budget: "Let's Discuss",
    message: '',
  });

  const budgetOptions = [
    { value: "Under ₹50,000", label: "Under ₹50,000" },
    { value: "₹50,000–₹1,00,000", label: "₹50,000–₹1,00,000" },
    { value: "₹1,00,000–₹5,00,000", label: "₹1,00,000–₹5,00,000" },
    { value: "₹5,00,000+", label: "₹5,00,000+" },
    { value: "Let's Discuss", label: "Let's Discuss" }
  ];

  const serviceOptions = [
    { value: "Software Development", label: "Software Development" },
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile App Development", label: "Mobile App Development" },
    { value: "AI & Machine Learning", label: "AI & Machine Learning" },
    { value: "Data Analytics", label: "Data Analytics" },
    { value: "Cloud Solutions", label: "Cloud Solutions" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "IT Consulting", label: "IT Consulting" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiService.submitInquiry(formData);
      setToastMessage(res.message || 'Inquiry submitted successfully!');
      setToastOpen(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        service: 'Software Development',
        budget: "Let's Discuss",
        message: '',
      });
    } catch {
      setToastMessage('Failed to submit inquiry. Please try again.');
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Get In Touch"
          title="Have a Digital Idea? Let's"
          gradientText="Build It Together."
          subtitle="Send us your requirements. Our software architects will analyze your project and reply within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="glass-panel p-8 rounded-3xl border border-[var(--border-subtle)] space-y-6">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Contact Information</h3>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-sky-500/10 text-sky-500 shrink-0"><Mail className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] font-semibold">Email Us</div>
                  <a href="mailto:contact@krivexa.com" className="text-sm font-bold text-[var(--text-primary)] hover:text-sky-500">contact@krivexa.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0"><Phone className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] font-semibold">Call Us</div>
                  <a href="tel:+919876543210" className="text-sm font-bold text-[var(--text-primary)] hover:text-sky-500">+91 98765 43210</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shrink-0"><MapPin className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] font-semibold">Corporate Office</div>
                  <div className="text-sm font-bold text-[var(--text-primary)]">Krivexa Tech Park, Tech City</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0"><Clock className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] font-semibold">Working Hours</div>
                  <div className="text-sm font-bold text-[var(--text-primary)]">Mon - Fri: 9:00 AM - 6:00 PM IST</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <Card>
              <CardBody className="p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Full Name *"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <Input
                      label="Email Address *"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Input
                      label="Company Name"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Select
                      label="Interested Service"
                      options={serviceOptions}
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    />
                    <Select
                      label="Estimated Budget"
                      options={budgetOptions}
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>

                  <Textarea
                    label="Project Description *"
                    required
                    rows={4}
                    placeholder="Tell us about your project requirements, goals, and target timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={loading}
                    rightIcon={<Send className="w-4 h-4" />}
                    className="w-full mt-2"
                  >
                    Submit Project Inquiry
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <Toast
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        type="success"
        message={toastMessage}
      />
    </div>
  );
};
