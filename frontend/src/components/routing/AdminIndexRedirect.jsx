import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminIndexRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/admin" replace />;

  switch (user.role) {
    case "hr-admin":
      return <Navigate to="feedback" replace />;

    case "office-admin":
      return <Navigate to="queueing" replace />;

    default:
      return <Navigate to="settings" replace />;
  }
};

export default AdminIndexRedirect;