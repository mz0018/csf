function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 50%)`;
}

const AdminAvatar = ({ name, size = 100 }) => {
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
      "
      style={{
        width: size,
        height: size,
        fontSize: size * 0.6,
      }}
    >
      {initial}
    </div>
  );
};

export default AdminAvatar;
