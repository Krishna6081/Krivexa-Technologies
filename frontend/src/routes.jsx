import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
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

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { UserInquiriesPage } from './pages/UserInquiriesPage';

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
import { ScrollToTop } from './components/common/ScrollToTop';

// Guard for Normal Logged In Users
const ProtectedUserRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

// Guard for Admin Portal Access
const ProtectedAdminRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  if (user?.role !== 'SUPER_ADMIN' && user?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Authentication Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

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

          {/* User Portal Protected Routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedUserRoute>
                <UserDashboardPage />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedUserRoute>
                <UserProfilePage />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="dashboard/inquiries"
            element={
              <ProtectedUserRoute>
                <UserInquiriesPage />
              </ProtectedUserRoute>
            }
          />

          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Portal Auth & Dashboard Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </>
  );
};
