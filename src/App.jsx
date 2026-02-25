import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ConcentricHero from './components/landing/ConcentricHero';
import ServicesSection from './components/landing/ServicesSection';
import ProjectGallery from './components/landing/ProjectGallery';
import Testimonials from './components/landing/Testimonials';
import FAQSection from './components/landing/FAQSection';
import ContactSection from './components/landing/ContactSection';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { db } from './lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Mail, Phone, Calendar, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

const LandingPage = () => {
    const [contactInfo, setContactInfo] = React.useState({
        email: 'hello@intellirev.ai',
        phone: '+1 (555) AI-SOLVE',
        bookingLink: 'calendly.com/intellirev-space',
        facebook: '',
        linkedin: '',
        twitter: '',
        instagram: ''
    });

    React.useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'contact_info'), (doc) => {
            if (doc.exists()) {
                setContactInfo(doc.data());
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="relative overflow-hidden bg-[#000000]">
            {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-orange-900/5 blur-[120px] rounded-full" />
            </div>

            <Navbar />
            <main>
                <ConcentricHero />
                <div className="relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-orange-500/30 to-transparent" />
                    <ServicesSection />
                </div>
                <ProjectGallery />
                <Testimonials />
                <FAQSection />
                <ContactSection contactInfo={contactInfo} />
            </main>

            <footer className="py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-2 grayscale brightness-50">
                            <img src="/brand_full.jpg" alt="Intellirev AI Logo" className="h-8 w-auto object-contain rounded-sm" />
                            <span className="text-sm font-black uppercase tracking-tighter">Intellirev AI</span>
                        </div>

                        <div className="flex gap-4">
                            {contactInfo.facebook && (
                                <a href={contactInfo.facebook.startsWith('http') ? contactInfo.facebook : `https://${contactInfo.facebook}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500 transition-colors">
                                    <Facebook size={18} />
                                </a>
                            )}
                            {contactInfo.linkedin && (
                                <a href={contactInfo.linkedin.startsWith('http') ? contactInfo.linkedin : `https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500 transition-colors">
                                    <Linkedin size={18} />
                                </a>
                            )}
                            {contactInfo.twitter && (
                                <a href={contactInfo.twitter.startsWith('http') ? contactInfo.twitter : `https://${contactInfo.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500 transition-colors">
                                    <Twitter size={18} />
                                </a>
                            )}
                            {contactInfo.instagram && (
                                <a href={contactInfo.instagram.startsWith('http') ? contactInfo.instagram : `https://${contactInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500 transition-colors">
                                    <Instagram size={18} />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
                        <p className="text-[10px] text-gray-700 uppercase tracking-widest font-bold">
                            © 2026 Intellirev AI Solutions. All rights reserved. Built for intelligence.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-[8px] text-gray-800 uppercase tracking-widest font-bold hover:text-orange-500">Privacy Policy</a>
                            <a href="#" className="text-[8px] text-gray-800 uppercase tracking-widest font-bold hover:text-orange-500">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;