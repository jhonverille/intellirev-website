import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PopupModal } from 'react-calendly';

const ConcentricHero = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) / 50;
        const y = (clientY - window.innerHeight / 2) / 50;
        setMousePos({ x, y });
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-[900px] flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Premium Background Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay grayscale"
                style={{ backgroundImage: 'url("/metal_bg.png")' }}
            >
                {/* Dynamic Spotlight */}
                <motion.div
                    animate={{
                        background: `radial-gradient(600px circle at ${50 + mousePos.x}% ${50 + mousePos.y}%, rgba(249,115,22,0.15), transparent)`
                    }}
                    className="absolute inset-0 z-1"
                />

                {/* Noise/Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* THE ORBITAL CORE */}
            <motion.div
                style={{ x: mousePos.x, y: mousePos.y }}
                className="absolute inset-0 flex items-center justify-center z-[1]"
            >
                {/* Glowing Aura */}
                <div className="absolute w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />

                {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute flex items-center justify-center">
                        {/* The Ring */}
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                            transition={{
                                duration: 15 + i * 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute border border-orange-500/20 rounded-full"
                            style={{
                                width: `${(i + 2) * 120}px`,
                                height: `${(i + 2) * 120}px`,
                                borderStyle: i % 3 === 0 ? 'solid' : 'dashed',
                                borderWidth: i === 0 ? '2px' : '1px',
                                opacity: 1 - i * 0.1
                            }}
                        >
                            {/* Data Nodes orbiting on the ring */}
                            {i % 2 === 0 && (
                                <motion.div
                                    className="absolute -top-1 left-1/2 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_15px_#f97316]"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </motion.div>
                    </div>
                ))}

                {/* Central Hyper-Core */}
                <div className="relative flex items-center justify-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute w-40 h-40 bg-orange-600/30 rounded-full blur-2xl"
                    />
                    <div className="w-20 h-20 bg-orange-500 rounded-full shadow-[0_0_60px_rgba(249,115,22,0.8)] border-4 border-white/20 relative z-10 flex items-center justify-center">
                        <div className="w-10 h-10 bg-black rounded-full animate-ping opacity-20" />
                    </div>
                </div>
            </motion.div>

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
                        onClick={() => setIsOpen(true)}
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

            <PopupModal
                url="https://calendly.com/intellirev-space"
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={document.getElementById('root')}
            />
        </div>
    );
};

export default ConcentricHero;
