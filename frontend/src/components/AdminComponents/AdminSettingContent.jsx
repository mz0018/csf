const AdminSettingContent = ({ activeTab }) => {
  return (
    <section className="flex-1 p-6">
      {activeTab === "Profile" && (
        <div>
          <h1 className="text-xl font-semibold mb-4">Profile Settings</h1>
          <p>Profile-related settings go here.</p>
        </div>
      )}

      {activeTab === "Security" && (
        <div>
          <h1 className="text-xl font-semibold mb-4">Security Settings</h1>
          <p>Security-related settings go here.</p>
        </div>
      )}
    </section>
  );
};

export default AdminSettingContent;
