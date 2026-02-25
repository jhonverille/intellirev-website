import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../../hooks/useCMS';
import ProjectModal from './ProjectModal';

const defaultProjects = [
    {
        title: "Eco-Trend AI",
        desc: "Real-time economic forecasting for global markets.",
        info: "Machine Learning / Analytics"
    },
    {
        title: "NeuroFlow",
        desc: "Autonomous workflow optimization for enterprise scale.",
        info: "Workflow Automation"
    },
    {
        title: "Syncron AI",
        desc: "Multi-agent orchestration for supply chain logistics.",
        info: "Multi-Agent Systems"
    },
    {
        title: "Alpha-Core",
        desc: "Next-gen neural architecture search for decentralized computing.",
        info: "Neural Networks"
    },
    {
        title: "Lumina Vision",
        desc: "Advanced computer vision for industrial precision.",
        info: "Computer Vision"
    }
];

const ProjectGallery = () => {
    const { data: cmsProjects, loading } = useCMS('projects');
    const displayProjects = cmsProjects && cmsProjects.length > 0 ? cmsProjects : defaultProjects;

    const constraintsRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const carouselRef = useRef();

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [displayProjects]);

    return (
        <section id="work" className="py-32 px-6 bg-[#050505] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto"
            >
                <div className="mb-20 text-right">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                        Selected <span className="text-orange-500">Deployments</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl ml-auto text-lg font-medium mt-4">
                        A showcase of our most impactful AI implementations. <br />
                        <span className="text-orange-500/50 text-sm uppercase tracking-widest font-bold">Click and drag to explore →</span>
                    </p>
                </div>

                <motion.div
                    ref={constraintsRef}
                    className="relative"
                >
                    <motion.div
                        ref={carouselRef}
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        whileTap={{ cursor: "grabbing" }}
                        className="flex gap-10 cursor-grab px-4 pb-10"
                    >
                        {displayProjects.map((project, i) => (
                            <motion.div
                                key={project.id || i}
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.1,
                                    type: "spring",
                                    stiffness: 50
                                }}
                                className="min-w-[300px] md:min-w-[450px] group relative h-[500px] overflow-hidden rounded-3xl shrink-0"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                                <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="absolute inset-0 flex flex-col justify-end p-10 z-20 space-y-4">
                                    <span className="text-[10px] text-orange-500 font-bold uppercase tracking-[0.3em]">{project.info}</span>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter">{project.title}</h3>
                                    <p className="text-gray-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 transform">
                                        {project.desc}
                                    </p>
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="w-fit px-6 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all mt-4"
                                    >
                                        View Case Study
                                    </button>
                                </div>

                                {/* Visual Support */}
                                <div className="absolute inset-0 -z-0 bg-[#0a0a0a] flex items-center justify-center">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                                            alt={project.title}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-orange-500/5 to-transparent flex items-center justify-center">
                                            <div className="w-40 h-40 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                                            <div className="absolute w-20 h-20 border border-orange-500/10 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Project Modal Overlay */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default ProjectGallery;
