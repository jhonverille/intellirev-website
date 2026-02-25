import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PopupModal } from 'react-calendly';

const ConcentricHero = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [wordIndex, setWordIndex] = React.useState(0);
    const words = ["intelligence", "automation", "efficiency", "excellence"];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
        }
    };

    const charVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative w-full min-h-[900px] flex items-center justify-center overflow-hidden bg-black">
            {/* Restored Industrial Metal Background */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity lg:mix-blend-normal"
                style={{
                    backgroundImage: 'url("/metal_bg.png")',
                    backgroundSize: 'cover',
                }}
            >
                {/* Dark Vignette/Gradient Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center space-y-12 px-6 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-orange-500/30 bg-orange-500/5 text-orange-500 text-sm font-bold tracking-[0.2em] uppercase"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    Intelligence Redefined
                </motion.div>

                <div className="space-y-4">
                    <motion.h1
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-white"
                    >
                        {"INTELLIREV".split("").map((char, i) => (
                            <motion.span key={i} variants={charVariants} className="inline-block hover:text-orange-500 transition-colors duration-300 cursor-default">
                                {char}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <div className="h-[1.2em] flex items-center justify-center">
                        <motion.span
                            key={words[wordIndex]}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="text-5xl md:text-7xl font-black text-orange-500 uppercase tracking-tight drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                        >
                            {words[wordIndex]}
                        </motion.span>
                    </div>
                </div>

                <motion.p
                    className="text-gray-400 max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    Building the next generation of <span className="text-white">autonomous digital intelligence</span>.
                    We automate complexity so you can lead the future.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(249,115,22,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-6 bg-orange-500 text-black font-black rounded-full transition-all uppercase tracking-tighter text-xl shadow-lg"
                    >
                        Book a Call
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-full transition-all uppercase tracking-tighter font-bold text-xl backdrop-blur-sm"
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
