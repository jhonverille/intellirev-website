import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PopupWidget } from 'react-calendly';

const ConcentricHero = () => {
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    return (
        <div className="relative w-full min-h-[800px] pt-32 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.2, 1],
                            rotate: i * 30
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                        className="absolute border border-orange-500/20 rounded-full"
                        style={{
                            width: `${(i + 1) * 80}px`,
                            height: `${(i + 1) * 80}px`,
                            borderStyle: i % 2 === 0 ? 'solid' : 'dashed'
                        }}
                    />
                ))}
                {/* Central Core Glow */}
                <div className="absolute w-32 h-32 bg-orange-600/40 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="relative z-10 text-center space-y-8 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold tracking-widest uppercase"
                >
                    Intelligence Redefined
                </motion.div>

                <motion.h1
                    className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    INTELLIREV <br /> <span className="text-orange-500">AI SOLUTIONS</span>
                </motion.h1>

                <motion.p
                    className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Building the next generation of autonomous digital intelligence.
                    We automate complexity so you can lead the future.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(249,115,22,0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-black font-black rounded-full transition-all shadow-[0_0_40px_rgba(249,115,22,0.4)] uppercase tracking-tighter text-lg"
                    >
                        Book a Call
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-10 py-5 glass border-white/10 rounded-full transition-all uppercase tracking-tighter font-bold text-lg"
                    >
                        Explore Services
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default ConcentricHero;
