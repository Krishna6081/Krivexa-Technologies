import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage, ServiceDetailPage } from './pages/ServicesPage';
import { SolutionsPage, TechnologiesPage, IndustriesPage } from './pages/SolutionsPage';
import { ProjectsPage, ProjectDetailPage } from './pages/ProjectsPage';
import { CaseStudiesPage, CaseStudyDetailPage } from './pages/CaseStudiesPage';
import { ProcessPage } from './pages/ProcessPage';
import { CareersPage } from './pages/CareersPage';
import { BlogPage, BlogPostPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage, TermsPage, CookiePolicyPage, FaqPage, NotFoundPage } from './pages/LegalPages';
import {
  AdminLoginPage,
  AdminDashboardPage,
  AdminServicesPage,
  AdminProjectsPage,
  AdminCaseStudiesPage,
  AdminTestimonialsPage,
  AdminTeamPage,
  AdminBlogPage,
  AdminCareersPage,
  AdminApplicationsPage,
  AdminInquiriesPage,
  AdminSettingsPage
} from './pages/admin/AdminPages';
import { useAuth } from './context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Main Site Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="technologies" element={<TechnologiesPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
        <Route path="process" element={<ProcessPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="cookie-policy" element={<CookiePolicyPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Portal Auth & Dashboard Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="projects" element={<AdminProjectsPage />} />
        <Route path="case-studies" element={<AdminCaseStudiesPage />} />
        <Route path="testimonials" element={<AdminTestimonialsPage />} />
        <Route path="team" element={<AdminTeamPage />} />
        <Route path="blog" element={<AdminBlogPage />} />
        <Route path="careers" element={<AdminCareersPage />} />
        <Route path="applications" element={<AdminApplicationsPage />} />
        <Route path="inquiries" element={<AdminInquiriesPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};
