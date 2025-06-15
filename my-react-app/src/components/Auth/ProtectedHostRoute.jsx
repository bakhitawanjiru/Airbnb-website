import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedHostRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.user_type !== 'host') {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedHostRoute;