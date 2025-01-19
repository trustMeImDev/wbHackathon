import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    const token = document.cookie?.split('; ')?.find(row => row?.startsWith('authToken='))?.split('=')[1];
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        return !isExpired;
    } catch {
        return false;
    }
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
