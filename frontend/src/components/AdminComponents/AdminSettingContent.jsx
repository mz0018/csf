import { useAuth } from "../../context/AuthContext";
import AdminAvatar from "./AdminAvatar";

const AdminSettingContent = ({ activeTab }) => {

  const { user, loading } = useAuth();

  return (
    <section className="flex-1 p-6 capitalize text-[var(--black-csf)]">
      {activeTab === "Profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AdminAvatar name={user?.username} />
          <div className="grid grid-cols-[auto_1fr] grid-rows-2 items-center p-4 rounded-md lg:col-span-2">
            

            <p className="font-semibold text-lg">
              {user?.username}
            </p>

            <p className="text-sm text-gray-700">
              {user?.role}
            </p>
          </div>

          <div className="p-3 rounded-md bg-[var(--hover-color)]">{user?.firstName}</div>
          <div className="p-3 rounded-md bg-[var(--hover-color)]">{user?.lastName}</div>
          <div className="p-3 rounded-md bg-[var(--hover-color)]">{user?.position}</div>
        </div>
      )}

      {activeTab === "Security" && <></>}
    </section>
  );
};

export default AdminSettingContent;
