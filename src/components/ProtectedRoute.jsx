import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#000000] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
