import { useState } from "react";
import { offices } from "../mocks/Offices";
import useBtnRegisterUser from "../hooks/useBtnRegisterUser";

const fields = [
  { name: "firstName", placeholder: "First Name" },
  { name: "middleName", placeholder: "Middle Name" },
  { name: "lastName", placeholder: "Last Name" },
  { name: "position", placeholder: "Position" },
  { name: "username", placeholder: "Username" },
  { name: "password", placeholder: "Password", type: "password" },
];

const Input = ({ type = "text", ...props }) => (
  <input type={type} className="w-full border p-2 rounded" {...props} />
);

const BtnRegisterUsers = () => {
  const [open, setOpen] = useState(false);
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    errors,
  } = useBtnRegisterUser(() => setOpen(false));

  const onSubmit = async (e) => {
    await handleSubmit(e);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-500 px-4 py-2 rounded-sm text-white hover:bg-green-600 transition"
      >
        Register New User
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">
              Register New User
            </h2>

            <form onSubmit={onSubmit} className="space-y-3">
              {fields.map(({ name, ...field }) => (
                <Input
                  key={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  {...field}
                />
              ))}

              {/* ✅ ROLE DROPDOWN */}
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-white"
                required
              >
                <option value="">Select Role</option>
                <option value="hr-admin">HR Admin</option>
                <option value="office-admin">Office Admin</option>
              </select>

              <select
                name="officeId"
                value={formData.officeId}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-white"
                required
              >
                <option value="">Select Office</option>
                {offices.map((office) => (
                  <option
                    key={office.id}
                    value={office.id}
                    data-name={office.name}
                  >
                    {office.name}
                  </option>
                ))}
              </select>

              {/* ✅ ERROR MESSAGE */}
              {errors && (
                <div className="bg-red-100 text-red-700 text-sm p-2 rounded">
                  {errors}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default BtnRegisterUsers;
