import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import ConcentricHero from './components/ConcentricHero';
import ServicesSection from './components/ServicesSection';
import ProjectGallery from './components/ProjectGallery';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const LandingPage = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="relative overflow-hidden bg-[#000000]">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-[100]"
                style={{ scaleX }}
            />

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
                <ContactSection />
            </main>

            <footer className="py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-2 grayscale brightness-50">
                        <img src="/brand_full.jpg" alt="Intellirev AI Logo" className="h-8 w-auto object-contain rounded-sm" />
                        <span className="text-sm font-black uppercase tracking-tighter">Intellirev AI</span>
                    </div>
                    <p className="text-[10px] text-gray-700 uppercase tracking-widest font-bold">
                        © 2026 Intellirev AI Solutions. All rights reserved. Built for intelligence.
                    </p>
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
