# IntelliRev AI Solutions Website

A modern, responsive website for IntelliRev AI Solutions built with React, Vite, and Firebase. Features a complete lead management system with automated email notifications, lead scoring, and admin dashboard.

**Live URL:** https://ai.intellirev.space  
**Repository:** https://github.com/jhonverille/intellirev-website

---

## 🚀 Features

### Core Website
- ⚡ **React 19** + **Vite 6.0** for fast performance
- 🎨 **Tailwind CSS 4.0** for modern styling
- ✨ **Framer Motion** for smooth animations
- 📱 **Fully responsive** design
- 🔒 **Protected admin dashboard** with Firebase Auth
- 📝 **CMS** for managing services, projects, testimonials, FAQs

### Lead Management System
- 📧 **Automated email notifications** (via Resend)
- 🎯 **Lead scoring** (0-100) with Hot/Warm/Cold categories
- 💬 **Reply system** with conversation history
- 📊 **CSV export** functionality
- 🏷️ **Status tracking** (New → Contacted → Closed)

### Performance & Security
- 🔐 **Firestore security rules** with input validation
- 💾 **Offline persistence** enabled
- 🖼️ **Optimized images** (48% size reduction)
- 🔑 **Environment variables** for secure API keys
- ✅ **ESLint + Prettier** for code quality

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 19, React Router DOM |
| **Styling** | Tailwind CSS 4.0 |
| **Animations** | Framer Motion |
| **Backend** | Firebase (Hosting, Firestore, Functions) |
| **Email** | Resend (3,000 free emails/month) |
| **Build Tool** | Vite 6.0 |
| **Icons** | Lucide React |

---

## 📦 Project Structure

```
intellirev-website/
├── functions/           # Firebase Cloud Functions
│   ├── index.js        # Email automation & lead scoring
│   ├── package.json    # Function dependencies
│   └── README.md       # Functions setup guide
├── public/             # Static assets
│   ├── favicon*.png    # All favicon sizes
│   ├── logo*.png/webp  # Brand assets
│   └── ...
├── scripts/            # Utility scripts
│   ├── generate-favicons.js
│   └── optimize-images.js
├── src/                # Source code
│   ├── components/
│   │   ├── admin/      # Admin dashboard components
│   │   ├── landing/    # Landing page sections
│   │   └── layout/     # Layout components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Firebase config & utilities
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── PROJECT_STATUS.md   # Current status & setup guide
├── ROADMAP.md          # Future enhancements
└── ...
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase CLI (for deployment)

### 1. Clone & Install

```bash
git clone <repository-url>
cd intellirev-website
npm install
cd functions && npm install && cd ..
```

### 2. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:5173

### 4. Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

---

## 🔥 Deployment

### Deploy Website
```bash
npm run build
firebase deploy --only hosting
```

### Deploy Cloud Functions (for email automation)

**Prerequisites:**
1. Create Resend account: https://resend.com
2. Verify your email/domain
3. Create API key (starts with `re_`)

**Set secrets:**
```bash
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set ADMIN_EMAIL
firebase functions:secrets:set FROM_EMAIL
```

**Deploy:**
```bash
firebase deploy --only functions
```

### View Logs
```bash
firebase functions:log
```

---

## 🎯 Current Status

**Last Updated:** February 13, 2026

### ✅ Completed
- Core website with all sections
- Firebase authentication & security
- Admin dashboard with CMS
- Lead management system
- Cloud Functions (email automation, lead scoring)
- CSV export functionality
- Responsive design & optimizations

### ⏳ Pending
- **Deploy Cloud Functions** - Email automation ready, needs Resend setup
- See `PROJECT_STATUS.md` for detailed setup steps

---

## 📋 Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Check for linting issues
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Utilities
node scripts/generate-favicons.js [source-image]
node scripts/optimize-images.js
```

---

## 🗺️ Roadmap

### 🔥 High Priority (Immediate ROI)
1. **Pre-commit Hooks** (Husky) - 15 min setup
2. **CI/CD** (GitHub Actions) - 2-3 hours
3. **Performance Monitoring** - 30 min

### 🟡 Medium Priority (Business Impact)
4. **Testing Infrastructure** - 5-10 hours
5. **Code-Splitting & Lazy Loading** - 2-3 hours

### 🟢 Long-term (Strategic)
6. **TypeScript Migration** - 5-10 hours
7. **Progressive Web App (PWA)** - 3-4 hours

See `ROADMAP.md` for detailed implementation guides.

---

## 💰 Costs

**Current Volume:** ~20 inquiries/day

| Service | Cost |
|---------|------|
| Firebase Functions | FREE (2M invocations/month) |
| Resend | FREE (3,000 emails/month) |
| Firestore | FREE (within free tier) |
| **Total** | **$0/month** |

---

## 🔐 Security

- ✅ API keys stored in environment variables
- ✅ Firestore security rules with validation
- ✅ Protected admin routes
- ✅ Firebase Secrets for Cloud Functions
- ✅ Input sanitization on all forms

---

## 📞 Support

- **Firebase Console:** https://console.firebase.google.com/project/antigravity-portfolio-999
- **Resend Dashboard:** https://resend.com
- **Live Site:** https://ai.intellirev.space
- **Admin Panel:** https://ai.intellirev.space/admin

---

## 📝 License

Private - All rights reserved

---

**Built with ❤️ by IntelliRev AI Solutions**
