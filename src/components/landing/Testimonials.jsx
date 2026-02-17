import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../../hooks/useCMS';

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
    },
    {
        name: "Michael Ross",
        role: "Founder, Specter Systems",
        text: "The speed of integration was mind-blowing. We went from manual data entry to a fully autonomous pipeline in less than two weeks.",
        img: "https://i.pravatar.cc/150?u=michael"
    },
    {
        name: "Elena Vance",
        role: "Technical Lead, Black Mesa",
        text: "Their multi-agent orchestration is years ahead of the competition. It's the engine driving our entire research division now.",
        img: "https://i.pravatar.cc/150?u=elena"
    }
];

const Testimonials = () => {
    const { data: cmsTestimonials, loading } = useCMS('testimonials');
    const displayTestimonials = cmsTestimonials && cmsTestimonials.length > 0 ? cmsTestimonials : defaultTestimonials;

    // Create a double list for seamless looping
    const infiniteTestimonials = [...displayTestimonials, ...displayTestimonials];

    return (
        <section id="testimonials" className="py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                        Client <span className="text-orange-500">Intelligence</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl text-lg font-medium">
                        Real results from global partners who have integrated our autonomous systems.
                    </p>
                </div>
            </div>

            {/* Infinite Scroll Container */}
            <div className="flex relative">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // Adjust speed here
                            ease: "linear",
                        },
                    }}
                    style={{ width: "max-content" }}
                >
                    {infiniteTestimonials.map((t, i) => (
                        <div
                            key={`${t.id || i}-${i}`}
                            className="glass p-10 md:p-12 rounded-[40px] space-y-8 inline-block w-[350px] md:w-[500px] whitespace-normal"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={t.img || t.imageUrl}
                                    alt={t.name}
                                    className="w-14 h-14 rounded-full border-2 border-orange-500/50 object-cover"
                                />
                                <div>
                                    <h4 className="font-bold uppercase tracking-tight text-white">{t.name}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-lg md:text-xl font-medium leading-relaxed italic text-gray-300">
                                "{t.text}"
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Fade overlays for the sides */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
};

export default Testimonials;
