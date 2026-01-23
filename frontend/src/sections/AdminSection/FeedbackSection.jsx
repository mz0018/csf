import { useAuth } from "../../context/AuthContext";
import AdminFeedbackTable from "../../components/AdminComponents/AdminFeedbackTable";

const FeedbackSection = () => {
  const { user } = useAuth();

  return (
    <>
    {user?.role === 'hr-admin' && user?.officeId === 9 && (
      <AdminFeedbackTable />
    )}
    </>
  )
};

export default FeedbackSection;
