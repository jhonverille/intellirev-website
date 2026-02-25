import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, BarChart3, Layers } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!project) return null;

    // Enhanced sample data for the case study details
    const details = project.details || {
        problem: "Traditional systems were unable to scale with the increasing complexity of global data flows, leading to significant delays and manual errors.",
        solution: "We implemented a custom multi-agent AI architecture that autonomously handles data routing and predictive analysis in real-time.",
        metrics: [
            { label: "Efficiency", value: "85%", icon: <BarChart3 className="w-4 h-4" /> },
            { label: "Latency", value: "-120ms", icon: <Cpu className="w-4 h-4" /> },
            { label: "Automated", value: "99.9%", icon: <Layers className="w-4 h-4" /> }
        ],
        techStack: ["React", "Python", "PyTorch", "AWS Lambda", "Pinecone"]
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Side: Visuals */}
                        <div className="w-full md:w-1/2 h-64 md:h-auto bg-[#0f0f0f] relative overflow-hidden flex items-center justify-center">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                                    alt={project.title}
                                />
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
                                    {/* Abstract Visual Elements */}
                                    <div className="relative">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="w-64 h-64 border border-orange-500/20 rounded-full flex items-center justify-center"
                                        >
                                            <div className="w-48 h-48 border border-white/5 rounded-full" />
                                        </motion.div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-32 h-32 bg-orange-500/20 blur-3xl rounded-full" />
                                            <h2 className="text-6xl font-black uppercase tracking-tighter opacity-10 select-none">
                                                {project.title.split(' ')[0]}
                                            </h2>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

                            <div className="absolute bottom-10 left-10 z-20">
                                <span className="text-[10px] text-orange-500 font-bold uppercase tracking-[0.3em] mb-2 block">PROJECT SCOPE</span>
                                <h3 className="text-2xl font-black uppercase tracking-tighter">{project.title}</h3>
                            </div>
                        </div>

                        {/* Right Side: Content */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                            <div className="space-y-10">
                                {/* Header */}
                                <div>
                                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">{project.info}</span>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter mt-2">{project.title}</h2>
                                    <p className="text-gray-400 mt-4 leading-relaxed font-medium">
                                        {project.desc}
                                    </p>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-3 gap-4">
                                    {details.metrics.map((metric, i) => (
                                        <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                                            <div className="text-orange-500 mb-2">{metric.icon}</div>
                                            <div className="text-xl font-black text-white">{metric.value}</div>
                                            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{metric.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Problem & Solution */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-3">The Challenge</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            {details.problem}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-3">The Solution</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            {details.solution}
                                        </p>
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Core Technology</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {details.techStack.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                {project.demoUrl && (
                                    <div className="pt-6 flex gap-4">
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-black px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                        >
                                            Launch Demo <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
