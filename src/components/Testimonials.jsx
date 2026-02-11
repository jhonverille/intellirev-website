import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../hooks/useCMS';

const defaultTestimonials = [
    {
        name: "Alex Thorne",
        role: "CEO, TechNova",
        text: "Intellirev didn't just automate our workflows; they redefined what we thought was possible with AI. Our efficiency soared by 40% in the first quarter.",
        img: "https://i.pravatar.cc/150?u=alex"
    },
    {
        name: "Sarah Chen",
        role: "Ops Director, Aurora",
        text: "The 24/7 AI Chatbot implementation was flawless. It handles 80% of our support volume with higher satisfaction ratings than our human agents.",
        img: "https://i.pravatar.cc/150?u=sarah"
    }
];

const Testimonials = () => {
    const { data: cmsTestimonials, loading } = useCMS('testimonials');
    const displayTestimonials = cmsTestimonials && cmsTestimonials.length > 0 ? cmsTestimonials : defaultTestimonials;

    return (
        <section id="testimonials" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                            Client <span className="text-orange-500">Intelligence</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl text-lg font-medium">
                            Real results from global partners who have integrated our autonomous systems.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-black hover:border-orange-500 cursor-pointer transition-all">←</div>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-black hover:border-orange-500 cursor-pointer transition-all">→</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayTestimonials.map((t, i) => (
                        <motion.div
                            key={t.id || i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass p-12 rounded-[40px] space-y-8"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={t.img || t.imageUrl}
                                    alt={t.name}
                                    className="w-14 h-14 rounded-full border-2 border-orange-500/50"
                                />
                                <div>
                                    <h4 className="font-bold uppercase tracking-tight">{t.name}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-gray-300">
                                "{t.text}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
