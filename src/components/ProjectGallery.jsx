import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../hooks/useCMS';

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
    }
];

const ProjectGallery = () => {
    const { data: cmsProjects, loading } = useCMS('projects');
    const displayProjects = cmsProjects && cmsProjects.length > 0 ? cmsProjects : defaultProjects;

    return (
        <section id="work" className="py-32 px-6 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-right">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                        Selected <span className="text-orange-500">Deployments</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl ml-auto text-lg font-medium mt-4">
                        A showcase of our most impactful AI implementations and digital transformations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {displayProjects.map((project, i) => (
                        <motion.div
                            key={project.id || i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative h-[500px] overflow-hidden rounded-3xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                            <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute inset-0 flex flex-col justify-end p-10 z-20 space-y-4">
                                <span className="text-[10px] text-orange-500 font-bold uppercase tracking-[0.3em]">{project.info}</span>
                                <h3 className="text-3xl font-black uppercase tracking-tighter">{project.title}</h3>
                                <p className="text-gray-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 transform">
                                    {project.desc}
                                </p>
                                <button className="w-fit px-6 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all mt-4">
                                    View Case Study
                                </button>
                            </div>

                            {/* Abstract Placeholder Artwork (CMS Image could go here in future) */}
                            <div className="absolute inset-0 -z-0 bg-[#0a0a0a] flex items-center justify-center">
                                <div className="w-full h-full bg-gradient-to-br from-orange-500/5 to-transparent flex items-center justify-center">
                                    <div className="w-40 h-40 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute w-20 h-20 border border-orange-500/10 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectGallery;
