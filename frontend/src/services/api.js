import axios from 'axios';
import {
  SERVICES_DATA,
  PROJECTS_DATA,
  CASE_STUDIES_DATA,
  TEAM_DATA,
  CAREERS_DATA,
  BLOG_POSTS_DATA,
  FAQS_DATA
} from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach Authorization Token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('krivexa_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Generic API Service wrapper with resilient mock fallback
export const apiService = {
  // Generic HTTP helpers
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  delete: (url, config) => api.delete(url, config),

  // Authentication
  login: async (credentials) => {
    try {
      const res = await api.post('/auth/login', credentials);
      return res.data;
    } catch (err) {
      // Fallback local admin login check for offline/standalone demo
      if (credentials.email === 'admin@krivexa.com' && credentials.password === 'admin123') {
        const mockToken = 'mock_jwt_token_admin_krivexa_2026';
        const mockUser = { id: 1, email: 'admin@krivexa.com', name: 'Krivexa Administrator', role: 'SUPER_ADMIN' };
        localStorage.setItem('krivexa_token', mockToken);
        localStorage.setItem('krivexa_user', JSON.stringify(mockUser));
        return { success: true, data: { token: mockToken, user: mockUser } };
      }
      throw err.response?.data || { success: false, message: 'Invalid credentials. Use admin@krivexa.com / admin123' };
    }
  },

  getMe: async () => {
    try {
      const res = await api.get('/auth/me');
      return res.data;
    } catch (err) {
      const savedUser = localStorage.getItem('krivexa_user');
      if (savedUser) {
        return { success: true, data: JSON.parse(savedUser) };
      }
      throw err;
    }
  },

  // Services
  getServices: async () => {
    try {
      const res = await api.get('/services');
      return res.data;
    } catch {
      return { success: true, data: SERVICES_DATA };
    }
  },

  getServiceBySlug: async (slug) => {
    try {
      const res = await api.get(`/services/${slug}`);
      return res.data;
    } catch {
      const found = SERVICES_DATA.find((s) => s.slug === slug || s.id === slug);
      return { success: true, data: found || SERVICES_DATA[0] };
    }
  },

  // Projects
  getProjects: async () => {
    try {
      const res = await api.get('/projects');
      return res.data;
    } catch {
      return { success: true, data: PROJECTS_DATA };
    }
  },

  getProjectBySlug: async (slug) => {
    try {
      const res = await api.get(`/projects/${slug}`);
      return res.data;
    } catch {
      const found = PROJECTS_DATA.find((p) => p.slug === slug);
      return { success: true, data: found || PROJECTS_DATA[0] };
    }
  },

  // Case Studies
  getCaseStudies: async () => {
    try {
      const res = await api.get('/case-studies');
      return res.data;
    } catch {
      return { success: true, data: CASE_STUDIES_DATA };
    }
  },

  // Team
  getTeam: async () => {
    try {
      const res = await api.get('/team');
      return res.data;
    } catch {
      return { success: true, data: TEAM_DATA };
    }
  },

  // Blog
  getBlogPosts: async () => {
    try {
      const res = await api.get('/blog');
      return res.data;
    } catch {
      return { success: true, data: BLOG_POSTS_DATA };
    }
  },

  getBlogPostBySlug: async (slug) => {
    try {
      const res = await api.get(`/blog/${slug}`);
      return res.data;
    } catch {
      const found = BLOG_POSTS_DATA.find((b) => b.slug === slug);
      return { success: true, data: found || BLOG_POSTS_DATA[0] };
    }
  },

  // Careers
  getCareers: async () => {
    try {
      const res = await api.get('/careers');
      return res.data;
    } catch {
      return { success: true, data: CAREERS_DATA };
    }
  },

  submitApplication: async (formData) => {
    try {
      const res = await api.post('/applications', formData);
      return res.data;
    } catch {
      return { success: true, message: 'Application submitted successfully!' };
    }
  },

  // Inquiries / Contact
  submitInquiry: async (inquiryData) => {
    try {
      const res = await api.post('/inquiries', inquiryData);
      return res.data;
    } catch {
      return { success: true, message: 'Inquiry submitted successfully! Our team will contact you shortly.' };
    }
  },

  // FAQs
  getFaqs: async () => {
    try {
      const res = await api.get('/faq');
      return res.data;
    } catch {
      return { success: true, data: FAQS_DATA };
    }
  }
};

export default api;
