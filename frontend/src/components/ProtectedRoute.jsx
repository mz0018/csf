import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const auth = useAuth();
    const { user, loading } = auth;
    if (!auth) return null;

    if (loading) return <></>;

    if (!user) return <Navigate to="/admin" replace />;

    return children;
}

export default ProtectedRoute;