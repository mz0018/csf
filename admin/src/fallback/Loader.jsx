import { SyncLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <SyncLoader
        color="#424b57"
        loading
        size={10}
        margin={4}
        className="sm:scale-110 md:scale-125"
      />
    </div>
  );
};

export default Loader;
