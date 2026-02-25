import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import { doc, onSnapshot, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { PopupModal } from 'react-calendly';

const ContactSection = ({ contactInfo }) => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null); // null, 'success', 'error'
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            await addDoc(collection(db, 'inquiries'), {
                ...form,
                status: 'new',
                createdAt: serverTimestamp()
            });
            setStatus('success');
            setForm({ name: '', email: '', message: '' });

            setTimeout(() => setStatus(null), 5000);
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Transmission failed. Please try again.");
        } finally {
            setSending(false);
        }
    };


    return (
        <section id="contact" className="relative py-32 px-6 overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
            >
                <source src="/contact-bg.mp4" type="video/mp4" />
            </video>

            {/* Background Overlay for depth */}
            <div className="absolute inset-0 bg-[#000000]/40 z-1" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#000000] to-transparent z-1" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#000000] to-transparent z-1" />

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
                <div className="flex-1 space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                            Let's Build <br /> <span className="text-orange-500">The Future.</span>
                        </h2>
                        <p className="text-gray-500 max-w-md text-lg font-medium mt-4">
                            Schedule a technical discovery call or reach out directly to our engineering team.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-black">Email</p>
                                <p className="text-lg font-bold group-hover:text-orange-500 transition-colors">{contactInfo.email}</p>
                            </div>
                        </a>

                        <div className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-black">Direct</p>
                                <p className="text-lg font-bold">{contactInfo.phone}</p>
                            </div>
                        </div>

                        <div
                            onClick={() => setIsCalendlyOpen(true)}
                            className="flex items-center gap-6 group cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-black">Booking</p>
                                <p className="text-lg font-bold group-hover:text-orange-500 transition-colors">{contactInfo.bookingLink}</p>
                            </div>
                        </div>

                        {/* Social Links Row */}
                        <div className="pt-8 border-t border-white/5 flex gap-4">
                            {contactInfo.facebook && (
                                <a href={contactInfo.facebook.startsWith('http') ? contactInfo.facebook : `https://${contactInfo.facebook}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-black transition-all">
                                    <Facebook size={18} />
                                </a>
                            )}
                            {contactInfo.linkedin && (
                                <a href={contactInfo.linkedin.startsWith('http') ? contactInfo.linkedin : `https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-black transition-all">
                                    <Linkedin size={18} />
                                </a>
                            )}
                            {contactInfo.twitter && (
                                <a href={contactInfo.twitter.startsWith('http') ? contactInfo.twitter : `https://${contactInfo.twitter}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-black transition-all">
                                    <Twitter size={18} />
                                </a>
                            )}
                            {contactInfo.instagram && (
                                <a href={contactInfo.instagram.startsWith('http') ? contactInfo.instagram : `https://${contactInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-black transition-all">
                                    <Instagram size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="glass p-12 rounded-[40px] orange-glow">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                                        placeholder="Alan Turing"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                                        placeholder="alan@enigma.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2">Project Brief</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                                    placeholder="How can we help you automate..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-orange-500 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {sending ? 'Transmitting...' : 'Initialize Discovery'}
                            </button>
                            {status === 'success' && (
                                <p className="text-center text-green-500 font-bold uppercase tracking-widest text-xs animate-pulse">
                                    Message received. Stand by for response.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <PopupModal
                url="https://calendly.com/intellirev-space"
                onModalClose={() => setIsCalendlyOpen(false)}
                open={isCalendlyOpen}
                rootElement={document.getElementById('root')}
            />
        </section>
    );
};

export default ContactSection;
