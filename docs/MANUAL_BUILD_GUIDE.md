# 🏗️ Manual Build Guide: IntelliRev AI Solutions

This documentation provides a comprehensive, step-by-step guide to building the **IntelliRev AI Solutions** platform from scratch without the assistance of an AI agent. This is a technical manual for developers who want to understand the underlying architecture and manual configuration required.

---

## 🛠️ Prerequisites
Before starting, ensure you have the following installed:
*   **Node.js** (v20 or higher)
*   **npm** (comes with Node.js)
*   **Firebase CLI** (`npm install -g firebase-tools`)
*   **Git**

---

## 🏁 Phase 1: Project Initialization

### 1. Scaffolding the React App
Start by creating a new Vite project:
```bash
npm create vite@latest intellirev-website -- --template react
cd intellirev-website
npm install
```

### 2. Installing Dependencies
You will need the following core libraries:
```bash
npm install framer-motion lucide-react react-router-dom react-calendly firebase resend
npm install -D tailwindcss @tailwindcss/vite
```

### 3. Tailwind CSS 4.0 Setup
In your `vite.config.js`, add the Tailwind plugin:
```javascript
import tailwindcss from '@tailwindcss/vite'
// ...
plugins: [react(), tailwindcss()],
```
Then, update your `src/index.css`:
```css
@import "tailwindcss";
```

---

## 🔥 Phase 2: Firebase Configuration

### 1. Web Console Setup
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a project named `intellirev-ai`.
3.  Enable **Authentication** (Email/Password).
4.  Enable **Cloud Firestore** in production mode.
5.  Enable **Cloud Storage**.

### 2. Local Initialization
Run the initialization wizard:
```bash
firebase login
firebase init
```
*   **Hosting**: Set public directory to `dist`. Configure as a single-page app.
*   **Firestore**: Use default files for rules and indexes.
*   **Functions**: Select JavaScript. Install dependencies in the `functions` folder.

---

## 🏛️ Phase 3: Frontend Architecture

### 1. Folder Structure
Organize your `src` directory as follows:
```text
src/
├── components/
│   ├── admin/      # Login, Dashboard, ProtectedRoute
│   ├── landing/    # Hero, Services, Projects, etc.
│   └── layout/     # Navbar, Footer
├── hooks/          # useCMS.js for Firestore data
├── lib/            # firebase.js configuration
└── App.jsx         # Routing and Main Layout
```

### 2. Firebase Library (`src/lib/firebase.js`)
Initialize your Firebase app using the config from your Firebase console.

### 3. CMS Hook (`src/hooks/useCMS.js`)
Create a custom hook using `onSnapshot` from Firestore to fetch real-time data for your sections (Services, Projects, etc.).

---

## 🛠️ Phase 4: Feature Implementation

### 1. The Admin Dashboard
-   Create a Login page (`AdminLogin.jsx`) using `signInWithEmailAndPassword`.
-   Build `AdminDashboard.jsx` with tabs for each collection.
-   Implement CRUD operations using `addDoc`, `updateDoc`, and `deleteDoc`.

### 2. The Landing Page
-   **Navbar**: Use Framer Motion for scroll-triggered animations.
-   **Contact Section**: Build a form that saves data to the `inquiries` Firestore collection.
-   **Calendly**: Wrap the `PopupModal` from `react-calendly` and trigger it via state.

---

## ☁️ Phase 5: Backend Logic (Cloud Functions)

### 1. Email Integration (Resend)
In `functions/index.js`, create an `onDocumentCreated` trigger for the `inquiries` collection:
1.  Initialize the Resend client with your API key.
2.  Draft two templates: one for Admin notification and one for Prospect confirmation.
3.  Send emails using `resend.emails.send()`.

### 2. Setting Secrets
Store your Resend API key securely:
```bash
firebase functions:secrets:set RESEND_API_KEY
```

---

## 🔒 Phase 6: Security & SEO

### 1. Firestore Rules
Deploy `firestore.rules` with the following logic:
-   `inquiries`: Anyone can `create`, only Admins can `read/update/delete`.
-   `settings/services/projects`: Anyone can `read`, only Admins can `write`.

### 2. SEO
-   Add meta tags to `index.html`.
-   Generate a `sitemap.xml` and `robots.txt` in the `public` folder.

---

## 🚀 Phase 7: Deployment

### 1. Production Build
Prepare the assets:
```bash
npm run build
```

### 2. Rollout
Deploy the entire stack:
```bash
firebase deploy
```

---

## 📋 Ongoing Maintenance
-   **Logs**: Monitor function performance in the Google Cloud Console.
-   **Database**: Regularly export Firestore data via the Firebase Console for backups.
-   **Security**: Rotate your Resend API keys annually.
