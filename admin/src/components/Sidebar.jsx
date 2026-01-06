import { HiX } from "react-icons/hi";
import { lazy, Suspense } from "react";

const BtnLogout = lazy(() => import("../buttons/BtnLogout"));

const Sidebar = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 flex h-full w-72 flex-col bg-white shadow-xl">
        
        <div className="flex items-center justify-between border-b px-4 py-4">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <HiX size={22} />
          </button>
        </div>

        <div className="flex-1 p-4">
        </div>

        <div className="border-t p-4 mt-auto">
          <Suspense fallback={null}>
            <BtnLogout />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
