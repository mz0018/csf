function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 50%)`;
}

const AdminAvatar = ({ name }) => {
  const initial = name?.[0]?.toUpperCase() || "?";

  return (
    <div
      className="
        flex items-center justify-center
        rounded-full
        bg-[var(--hover-color)]
        text-[var(--button-color)]
        font-semibold
        select-none
        leading-none

        w-16 h-16 text-3xl
        sm:w-20 sm:h-20 sm:text-4xl
        md:w-24 md:h-24 md:text-5xl
        lg:w-28 lg:h-28 lg:text-6xl
      "
    >
      {initial}
    </div>
  );
};

export default AdminAvatar;
