import { useState, useEffect } from "react";

const DateTime = () => {
  const [now, setNow] = useState(new Date());
  const [textColor, setTextColor] = useState("var(--text-color)");

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);

    const root = document.documentElement;
    const color = getComputedStyle(root).getPropertyValue("--text-color").trim();
    setTextColor(color);

    return () => clearInterval(interval);
  }, []);

  const formatted = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={`text-[var(--text-color)] font-light text-xs`}
      style={{ color: textColor }}
    >
      {formatted}
    </div>
  );
};

export default DateTime;
