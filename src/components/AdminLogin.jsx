import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (err) {
            setError('Invalid credentials. Access denied.');
        }
    };

    return (
        <div className="min-h-screen bg-[#000000] flex items-center justify-center p-6">
            <div className="glass p-12 rounded-[40px] w-full max-w-md space-y-8 orange-glow">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mx-auto">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Admin Portal</h2>
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Intellirev Core Access</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2">Secure Identifier</label>
                        <input
                            type="email"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                            placeholder="admin@intellirev.ai"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-2">Access Key</label>
                        <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs text-center font-bold tracking-tight">{error}</p>}
                    <button className="w-full py-5 bg-orange-500 text-black font-black uppercase tracking-widest rounded-full hover:bg-orange-600 transition-all shadow-xl">
                        Grant Access
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
