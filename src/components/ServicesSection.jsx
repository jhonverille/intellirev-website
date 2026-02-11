import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Zap, Search, PenTool, Database, Cloud, Lock, Cpu } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';

const iconMap = {
    MessageSquare, Zap, Search, PenTool, Database, Cloud, Lock, Cpu
};

const defaultServices = [
    {
        title: "24/7 AI Chatbot",
        desc: "Infinite scalability with intelligent customer support agents.",
        iconName: "MessageSquare",
        stats: "99.9% uptime"
    },
    {
        title: "Automated Workflows",
        desc: "Seamlessly integrate AI into your existing business pipeline.",
        iconName: "Zap",
        stats: "40% efficiency boost"
    },
    {
        title: "Expert SEO",
        desc: "AI-driven content optimization for search dominance.",
        iconName: "Search",
        stats: "Top 1% rankings"
    },
    {
        title: "AI Content Generation",
        desc: "High-quality, brand-consistent content at lightning speed.",
        iconName: "PenTool",
        stats: "10x output"
    }
];

const ServicesSection = () => {
    const { data: cmsServices, loading } = useCMS('services');

    // Use CMS data if available, otherwise fall back to defaults
    const displayServices = cmsServices && cmsServices.length > 0 ? cmsServices : defaultServices;

    return (
        <section id="services" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                        Our <span className="text-orange-500">Capabilities</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl text-lg font-medium">
                        We provide precision-engineered AI solutions that drive real-world business outcomes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayServices.map((service, i) => {
                        const IconComponent = iconMap[service.iconName] || MessageSquare;

                        return (
                            <motion.div
                                key={service.id || i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass p-8 rounded-3xl orange-glow-hover transition-all group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                    <IconComponent className="text-orange-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 tracking-tight uppercase">{service.title}</h3>
                                <p className="text-gray-500 text-sm font-medium mb-10 leading-relaxed">
                                    {service.desc}
                                </p>
                                <div className="pt-6 border-t border-white/5">
                                    <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">{service.stats}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
