# Krivexa Technologies — Complete Corporate Platform

> **Innovate. Build. Transform.**

A modern, fast, responsive, secure, and production-ready corporate website and administration management platform for **Krivexa Technologies** — an IT & Software Digital Solutions company.

---

## 🚀 Tech Stack & System Architecture

### Frontend (`/frontend`)
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Custom Design Tokens (Light/Dark mode)
- **State & Routing**: React Router DOM (v7), React Context API (`AuthContext`, `ThemeContext`)
- **Animations & Micro-interactions**: Framer Motion
- **Icons**: Lucide React + Custom SVG Components
- **API Client**: Axios with JWT Bearer Token interceptor & resilient offline fallback

### Backend REST API (`/backend`)
- **Runtime**: Node.js + Express.js
- **Security**: Helmet headers, CORS policy, rate limiting (`express-rate-limit`)
- **Authentication**: JWT (JSON Web Tokens) + `bcryptjs` password hashing

### Database (`/database`)
- **Relational DB**: PostgreSQL
- **Schema & Migrations**: [database/schema.sql](file:///d:/New%20Ideas%20Projects/Krivexa%20Technologies/database/schema.sql)
- **Seed Script**: [database/seed.sql](file:///d:/New%20Ideas%20Projects/Krivexa%20Technologies/database/seed.sql)

---

## 📁 Folder Structure

```
krivexa-technologies/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/               # Reusable UI Primitives (Button, Card, Badge, Modal, etc.)
│   │   │   ├── layout/           # Sticky Navbar & 5-Column Footer
│   │   │   └── common/           # SocialIcons & Helper components
│   │   ├── sections/             # 14 Homepage & page sections
│   │   ├── pages/                # 20+ Public Corporate Pages & Views
│   │   │   └── admin/            # Protected Admin Dashboard & Management CRUD
│   │   ├── context/              # AuthContext & ThemeContext
│   │   ├── services/             # Axios API Client & Fallback service
│   │   ├── data/                 # Editable mock & seed content
│   │   ├── hooks/                # Custom hooks (useTheme)
│   │   ├── routes.jsx            # Master routing configuration
│   │   └── index.css             # Glassmorphism, CSS Tokens & Animations
│   ├── public/
│   │   ├── sitemap.xml           # Search Engine Sitemap
│   │   └── robots.txt            # Search Engine Crawling Directive
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/               # Database pool config (db.js)
│   │   ├── middleware/           # Auth JWT & Error Handler
│   │   └── server.js             # Express API Server
│   └── package.json
├── database/
│   ├── schema.sql                # PostgreSQL relational database schema
│   └── seed.sql                  # Initial seed data & admin user
├── README.md
├── KRIVEXA_WEBSITE_PROMPT.md
├── .gitignore
└── .env.example
```

---

## 💻 Local Development Commands

### 1. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
*App URL: `http://localhost:5173`*

### 2. Start Backend REST API
```bash
cd backend
npm install
npm run dev
```
*API Base URL: `http://localhost:5000/api`*

### 3. Build for Production
```bash
cd frontend
npm run build
```

---

## 🔑 Admin Login Credentials (Demo)
- **Portal URL**: `/admin/login`
- **Email**: `admin@krivexa.com`
- **Password**: `admin123`

---

## ☁️ Free Deployment Instructions

### Frontend (Cloudflare Pages or Render)
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variable**: `VITE_API_URL=https://your-backend-service.onrender.com/api`

### Backend (Render Web Service)
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**: `PORT=5000`, `DATABASE_URL=...`, `JWT_SECRET=...`

---

## 📄 License
© 2026 Krivexa Technologies. All Rights Reserved.
