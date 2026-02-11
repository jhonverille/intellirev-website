import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';

const defaultFAQs = [
    {
        question: "How fast can you integrate AI into our existing workflow?",
        answer: "Our modular AI agents are designed for rapid deployment. Typically, we can have a pilot running within 7-14 days, with full scale integration following shortly after validation."
    },
    {
        question: "Is our data secure?",
        answer: "Absolutely. We prioritize enterprise-grade security. All data processing happens in isolated environments with end-to-end encryption. We comply with GDPR and SOC2 standards."
    },
    {
        question: "Do you offer custom AI model training?",
        answer: "Yes. We specialize in fine-tuning LLMs on your proprietary datasets to create bespoke intelligence that understands your specific business context and terminology."
    },
    {
        question: "What industries do you serve?",
        answer: "We focus on data-heavy sectors including FinTech, Healthcare, Logistics, and E-commerce, where our autonomous agents can drive the highest ROI."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/5">
            <button
                onClick={onClick}
                className="w-full py-8 flex justify-between items-center text-left group"
            >
                <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-orange-500' : 'text-white group-hover:text-orange-500/80'}`}>
                    {question}
                </span>
                <span className={`p-2 rounded-full border transition-all ${isOpen ? 'border-orange-500 bg-orange-500 text-black' : 'border-white/10 group-hover:bg-white/5'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-gray-500 leading-relaxed font-medium">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQSection = () => {
    const { data: cmsFAQs, loading } = useCMS('faqs');
    const displayFAQs = cmsFAQs && cmsFAQs.length > 0 ? cmsFAQs : defaultFAQs;
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="py-32 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                        Common <span className="text-orange-500">Queries</span>
                    </h2>
                    <p className="text-gray-500 text-lg font-medium">
                        Understanding how we deploy intelligence.
                    </p>
                </div>

                <div className="glass rounded-[40px] p-8 md:p-12">
                    {displayFAQs.map((faq, i) => (
                        <FAQItem
                            key={faq.id || i}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
