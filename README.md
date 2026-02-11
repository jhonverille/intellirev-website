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

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
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
