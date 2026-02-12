import React, { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, UserCircle, LogOut, Plus, Settings, X, Trash2, Edit2, Mail } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('services');
    const navigate = useNavigate();
    const { data: services } = useCMS('services');
    const { data: projects } = useCMS('projects');
    const { data: testimonials } = useCMS('testimonials');
    const { data: faqs } = useCMS('faqs');
    const { data: inquiries } = useCMS('inquiries');

    // Modal & Editing State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});

    // Contact Settings State
    const [contactSettings, setContactSettings] = useState({
        email: '',
        phone: '',
        bookingLink: ''
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, 'settings', 'contact_info');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setContactSettings(docSnap.data());
                }
            } catch (err) {
                console.error("Error loading settings:", err);
            }
        };
        if (activeTab === 'contact') {
            fetchSettings();
        }
    }, [activeTab]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, 'settings', 'contact_info'), contactSettings);
            alert('Settings saved successfully!');
        } catch (error) {
            console.error("Error saving settings:", error);
            alert('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    // CRUD Handlers
    const handleAddNew = () => {
        setEditingId(null);
        setFormData({});
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (collectionName, id) => {
        if (window.confirm('Are you sure you want to delete this entry? This cannot be undone.')) {
            try {
                await deleteDoc(doc(db, collectionName, id));
            } catch (error) {
                console.error("Error deleting document:", error);
                alert("Failed to delete entry.");
            }
        }
    };

    const handleSaveEntry = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const collectionRef = collection(db, activeTab);

            if (editingId) {
                // Update existing
                const docRef = doc(db, activeTab, editingId);
                await updateDoc(docRef, formData);
            } else {
                // Create new
                await addDoc(collectionRef, formData);
            }
            setIsModalOpen(false);
            setFormData({});
        } catch (error) {
            console.error("Error saving entry:", error);
            alert("Failed to save entry.");
        } finally {
            setSaving(false);
        }
    };

    // Dynamic Form Fields based on Tab
    const renderFormFields = () => {
        if (activeTab === 'services') {
            return (
                <>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Service Title</label>
                        <input
                            value={formData.title || ''}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none"
                            placeholder="e.g. AI Automation"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Description</label>
                        <textarea
                            value={formData.desc || ''}
                            onChange={e => setFormData({ ...formData, desc: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none h-32"
                            placeholder="Service details..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Icon Name (Lucide React)</label>
                        <input
                            value={formData.iconName || ''}
                            onChange={e => setFormData({ ...formData, iconName: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none"
                            placeholder="e.g. MessageSquare, Zap, Cpu"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Stats / Tagline</label>
                        <input
                            value={formData.stats || ''}
                            onChange={e => setFormData({ ...formData, stats: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none"
                            placeholder="e.g. 99.9% Uptime"
                        />
                    </div>
                </>
            );
        }
        if (activeTab === 'projects') {
            return (
                <>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Project Title</label>
                        <input
                            value={formData.title || ''}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Description</label>
                        <textarea
                            value={formData.desc || ''}
                            onChange={e => setFormData({ ...formData, desc: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none h-32"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Category / Info</label>
                        <input
                            value={formData.info || ''}
                            onChange={e => setFormData({ ...formData, info: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none"
                        />
                    </div>
                </>
            );
        }
        if (activeTab === 'testimonials') {
            return (
                <>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Client Name</label>
                        <input
                            value={formData.name || ''}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Role / Company</label>
                        <input
                            value={formData.role || ''}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Testimonial Text</label>
                        <textarea
                            value={formData.text || ''}
                            onChange={e => setFormData({ ...formData, text: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none h-32"
                        />
                    </div>
                </>
            );
        }
        if (activeTab === 'faqs') {
            return (
                <>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Question</label>
                        <input
                            value={formData.question || ''}
                            onChange={e => setFormData({ ...formData, question: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none"
                            placeholder="e.g. How does the AI integration work?"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Answer</label>
                        <textarea
                            value={formData.answer || ''}
                            onChange={e => setFormData({ ...formData, answer: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none h-32"
                            placeholder="Explain the answer here..."
                        />
                    </div>
                </>
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#000000] flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 p-8 space-y-12">
                <div className="text-xl font-black uppercase tracking-tighter italic">
                    Admin <span className="text-orange-500">Panel</span>
                </div>

                <nav className="space-y-4">
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${activeTab === 'services' ? 'bg-orange-500/10 text-orange-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        <LayoutDashboard size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Services</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${activeTab === 'projects' ? 'bg-orange-500/10 text-orange-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        <FileText size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Projects</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('testimonials')}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${activeTab === 'testimonials' ? 'bg-orange-500/10 text-orange-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        <UserCircle size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Feedback</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('faqs')}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${activeTab === 'faqs' ? 'bg-orange-500/10 text-orange-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        <FileText size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">FAQs</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('inquiries')}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${activeTab === 'inquiries' ? 'bg-orange-500/10 text-orange-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Mail size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Inquiries</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('contact')}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${activeTab === 'contact' ? 'bg-orange-500/10 text-orange-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Settings size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Contact Info</span>
                    </button>
                </nav>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500/50 hover:text-red-500 transition-all pt-20"
                >
                    <LogOut size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Logout</span>
                </button>
            </aside>

            {/* Content */}
            <main className="flex-1 p-12 overflow-y-auto relative">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic">Manage {activeTab}</h1>
                    {activeTab !== 'contact' && activeTab !== 'inquiries' && (
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-orange-500 transition-all"
                        >
                            <Plus size={16} />
                            Add Entry
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {/* ... Existing Lists with Real Delete/Edit ... */}
                    {activeTab === 'services' && services?.map(s => (
                        <div key={s.id} className="glass p-6 rounded-2xl flex justify-between items-center border-white/5">
                            <div>
                                <h3 className="font-bold uppercase tracking-tight">{s.title}</h3>
                                <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => handleEdit(s)} className="text-xs uppercase font-bold text-gray-500 hover:text-white flex items-center gap-2">
                                    <Edit2 size={14} /> Edit
                                </button>
                                <button onClick={() => handleDelete('services', s.id)} className="text-xs uppercase font-bold text-red-500/50 hover:text-red-500 flex items-center gap-2">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {activeTab === 'projects' && projects?.map(p => (
                        <div key={p.id} className="glass p-6 rounded-2xl flex justify-between items-center border-white/5">
                            <div>
                                <h3 className="font-bold uppercase tracking-tight">{p.title}</h3>
                                <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => handleEdit(p)} className="text-xs uppercase font-bold text-gray-500 hover:text-white flex items-center gap-2">
                                    <Edit2 size={14} /> Edit
                                </button>
                                <button onClick={() => handleDelete('projects', p.id)} className="text-xs uppercase font-bold text-red-500/50 hover:text-red-500 flex items-center gap-2">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {activeTab === 'testimonials' && testimonials?.map(t => (
                        <div key={t.id} className="glass p-6 rounded-2xl flex justify-between items-center border-white/5">
                            <div>
                                <h3 className="font-bold uppercase tracking-tight">{t.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{t.role}</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => handleEdit(t)} className="text-xs uppercase font-bold text-gray-500 hover:text-white flex items-center gap-2">
                                    <Edit2 size={14} /> Edit
                                </button>
                                <button onClick={() => handleDelete('testimonials', t.id)} className="text-xs uppercase font-bold text-red-500/50 hover:text-red-500 flex items-center gap-2">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {activeTab === 'faqs' && faqs?.map(f => (
                        <div key={f.id} className="glass p-6 rounded-2xl flex justify-between items-center border-white/5">
                            <div>
                                <h3 className="font-bold uppercase tracking-tight">{f.question}</h3>
                                <p className="text-xs text-gray-500 mt-1 truncate max-w-sm">{f.answer}</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => handleEdit(f)} className="text-xs uppercase font-bold text-gray-500 hover:text-white flex items-center gap-2">
                                    <Edit2 size={14} /> Edit
                                </button>
                                <button onClick={() => handleDelete('faqs', f.id)} className="text-xs uppercase font-bold text-red-500/50 hover:text-red-500 flex items-center gap-2">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {activeTab === 'inquiries' && inquiries?.map(inquiry => (
                        <div key={inquiry.id} className="glass p-6 rounded-2xl border-white/5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold uppercase tracking-tight">{inquiry.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${inquiry.status === 'new' ? 'bg-orange-500/20 text-orange-500' :
                                            inquiry.status === 'contacted' ? 'bg-blue-500/20 text-blue-500' :
                                                'bg-gray-500/20 text-gray-500'
                                            }`}>
                                            {inquiry.status || 'new'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">{inquiry.email}</p>
                                    <p className="text-sm text-gray-400 mt-3 leading-relaxed">{inquiry.message}</p>
                                    {inquiry.createdAt && (
                                        <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-widest">
                                            {new Date(inquiry.createdAt.seconds * 1000).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                                <button onClick={() => handleDelete('inquiries', inquiry.id)} className="text-xs uppercase font-bold text-red-500/50 hover:text-red-500 flex items-center gap-2">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                            <div className="flex gap-2 pt-2 border-t border-white/5">
                                <button
                                    onClick={() => handleUpdateInquiryStatus(inquiry.id, 'contacted')}
                                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-black transition-all"
                                >
                                    Mark Contacted
                                </button>
                                <button
                                    onClick={() => handleUpdateInquiryStatus(inquiry.id, 'closed')}
                                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full bg-gray-500/10 text-gray-500 hover:bg-gray-500 hover:text-black transition-all"
                                >
                                    Mark Closed
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Contact Settings Form */}
                    {activeTab === 'contact' && (
                        <div className="glass p-10 rounded-3xl border border-white/5 max-w-2xl">
                            <form onSubmit={handleSaveSettings} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={contactSettings.email}
                                        onChange={(e) => setContactSettings({ ...contactSettings, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors text-white"
                                        placeholder="hello@intellirev.ai"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2">Phone Number</label>
                                    <input
                                        type="text"
                                        value={contactSettings.phone}
                                        onChange={(e) => setContactSettings({ ...contactSettings, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors text-white"
                                        placeholder="+1 (555) AI-SOLVE"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2">Booking Link Label</label>
                                    <input
                                        type="text"
                                        value={contactSettings.bookingLink}
                                        onChange={(e) => setContactSettings({ ...contactSettings, bookingLink: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors text-white"
                                        placeholder="Calendly.com/intellirev"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-8 py-4 bg-orange-500 text-black font-black uppercase tracking-widest rounded-full hover:bg-orange-600 transition-all shadow-lg disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : 'Update Contact Info'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Placeholder for when data is empty */}
                    {((activeTab === 'services' && services?.length === 0) || (activeTab === 'projects' && projects?.length === 0) || (activeTab === 'testimonials' && testimonials?.length === 0)) && (
                        <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-[40px] text-gray-700">
                            <span className="text-xs uppercase font-black tracking-[0.5em]">No entries recorded in central cortex</span>
                        </div>
                    )}
                </div>

                {/* EDIT/ADD MODAL OVERLAY */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                        <div className="glass w-full max-w-lg rounded-3xl border border-white/10 p-8 relative">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-gray-500 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-2xl font-black uppercase italic mb-8">
                                {editingId ? 'Edit Entry' : 'New Entry'}
                            </h2>

                            <form onSubmit={handleSaveEntry} className="space-y-6">
                                {renderFormFields()}

                                <div className="pt-4 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 px-6 py-3 bg-orange-500 text-black font-bold uppercase tracking-widest rounded-full hover:bg-orange-600 transition-all"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
