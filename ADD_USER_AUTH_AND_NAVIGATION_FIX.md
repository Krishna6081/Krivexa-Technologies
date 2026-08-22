# KRIVEXA TECHNOLOGIES — USER AUTHENTICATION + NAVIGATION FIX

Complete Implementation Plan for Public User Auth, User Portal, Role-Based Access Control, and ScrollToTop Navigation.

1. PUBLIC USER AUTHENTICATION (/login, /register, /forgot-password, /reset-password/:token)
2. USER PORTAL & DASHBOARD (/dashboard, /profile, /dashboard/inquiries)
3. BACKEND AUTH APIs (POST /api/auth/register, POST /api/auth/login, PUT /api/users/profile, GET /api/users/inquiries)
4. INQUIRIES USER_ID RELATIONSHIP (Nullable foreign key inquiries.user_id)
5. HEADER AUTH DROPDOWN (Avatar, User Name, Dashboard, Profile, My Inquiries, Logout)
6. PROTECTED & ADMIN ROUTE GUARDS (Role-based access: USER vs ADMIN)
7. SCROLL-TO-TOP NAVIGATION (ScrollToTop.jsx resetting scroll to top = 0 on every route change)
8. MOBILE MENU AUTO-CLOSE
