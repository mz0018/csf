import axios from "axios";

const AdminDailyQueueStat = () => {
  const stats = [
    { label: "EXPIRED", value: 5 },
    { label: "COMPLETED", value: 12 },
    { label: "WAITING", value: 8 },
  ];

  return (
    <div className="flex justify-center gap-4 mt-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex-1 min-w-[100px] bg-gray-100 shadow-md rounded-lg p-4 sm:p-6 md:p-8 text-center"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{stat.value}</h2>
          <p className="text-xs sm:text-base md:text-lg text-gray-600 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDailyQueueStat;
