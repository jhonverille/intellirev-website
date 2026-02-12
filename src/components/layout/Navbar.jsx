import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 py-6 px-10"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src="/brand_full.jpg" alt="Intellirev AI Logo" className="h-12 w-auto object-contain rounded-md" />
                    <span className="text-2xl font-black tracking-tighter uppercase font-outfit">
                        Intellirev <span className="text-orange-500">AI</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    {['Services', 'Work', 'Testimonials', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-black rounded-full transition-all text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                >
                    Book a Call
                </motion.button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
