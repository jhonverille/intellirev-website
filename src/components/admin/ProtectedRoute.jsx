import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen bg-[#000000] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Redirect to login if not authenticated
    // replace: true prevents user from going back to protected route using browser back button
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is authenticated, render protected content
    return children;
};

export default ProtectedRoute;
