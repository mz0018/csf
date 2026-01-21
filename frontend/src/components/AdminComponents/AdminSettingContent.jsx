const AdminSettingContent = ({ activeTab }) => {
  return (
    <section className="flex-1 p-6">
      {activeTab === "Profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-4 gap-y-2 bg-blue-500 p-4 rounded-md lg:col-span-2">
            <img
              src="/img/logo.png"
              alt="User avatar"
              className="h-20 w-20 row-span-2 rounded-full object-cover"
            />

            <p className="font-semibold text-lg">
              username
            </p>

            <p className="text-sm text-gray-700">
              role
            </p>
          </div>

          <div className="bg-green-500 p-3 rounded-md">Firstname</div>
          <div className="bg-green-500 p-3 rounded-md">Middlename</div>
          <div className="bg-green-500 p-3 rounded-md">Lastname</div>
          <div className="bg-green-500 p-3 rounded-md">Office</div>
        </div>
      )}

      {activeTab === "Security" && <></>}
    </section>
  );
};

export default AdminSettingContent;
