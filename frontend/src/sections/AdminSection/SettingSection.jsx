import { lazy, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = lazy(() =>
  import("../../components/AdminComponents/AdminSettingSidebar")
);
const Content = lazy(() =>
  import("../../components/AdminComponents/AdminSettingContent")
);

const SettingSection = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("Profile");

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <div className="flex min-h-screen bg-[var(--table-color)] rounded">
      <Sidebar activeTab={activeTab} onChange={setActiveTab} />
      <Content activeTab={activeTab} />
    </div>
  );
};

export default SettingSection;
