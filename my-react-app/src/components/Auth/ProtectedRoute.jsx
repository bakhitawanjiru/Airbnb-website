import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, userType }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    // Only check userType if it's specified (for host routes)
    if (userType && user.user_type !== userType) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;