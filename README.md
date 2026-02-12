# IntelliRev AI Solutions Website

A modern, responsive website for IntelliRev AI Solutions built with React, Vite, and Firebase.

## Tech Stack

- **Frontend**: React 19, React Router
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Backend**: Firebase (Hosting, Firestore)
- **Build Tool**: Vite 6.0
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd antigravity-intellirev-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your Firebase configuration values:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
   
   **IMPORTANT**: Never commit your `.env` file to version control!

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Firebase Deployment

```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

## Project Structure

```
antigravity-intellirev-website/
├── src/
│   ├── components/     # React components
│   ├── data/          # Static data and content
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── public/            # Static assets
├── dist/              # Build output
├── firebase.json      # Firebase configuration
├── firestore.rules    # Firestore security rules
└── vite.config.js     # Vite configuration
```

## Features

- Responsive design
- Firebase authentication integration
- Firestore database
- SEO optimized
- Modern UI/UX

## License

Private - All rights reserved
