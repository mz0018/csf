import { Suspense, lazy, useState, useEffect } from "react";
import useDateBaseFiltering from "../hooks/useDateBaseFiltering";
import { TicketPlus, ChartColumnBig } from "lucide-react";
import { offices } from "../mocks/Offices";
import BtnGenerateQueueFallback from "../fallbacks/BtnGenerateQueueFallback";
const BtnGenerateQueueNum = lazy(() => import('../buttons/BtnGenerateQueueNum'));

const DateBaseFiltering = ({ officeId }) => {
  const { list, loading, hasErrors } = useDateBaseFiltering(officeId);

  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth > 1024 : false
  );

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 1024);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (hasErrors) return <div>{hasErrors}</div>;
  if (!list) return <div>No queues for today</div>;

  const { waiting = [], completed = [], expired = [] } = list;

  return (
    <section className="space-y-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h2 className="text-xl md:text-2xl font-bold tracking-wide text-[var(--black-csf)] inline-flex items-center gap-2">
          {(() => {
            const office = offices.find(o => o.id === officeId);
            if (!office) return null;
            const Icon = office.icon;
            return <Icon className="text-[var(--button-color)] flex-shrink-0" size={24} />;
          })()}
          <span>
            {offices.find(o => o.id === officeId)?.name || "Office"} Daily Queue Overview
          </span>
        </h2>

        <Suspense fallback={<BtnGenerateQueueFallback />}>
          {officeId !== 20 && isLargeScreen && <BtnGenerateQueueNum />}
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3">

        <div className="bg-[var(--table-color)] p-3 flex flex-col gap-1 md:col-span-1 rounded-sm">
          <span className="font-semibold mb-2 text-[var(--heading-color)] flex items-center gap-2 text-sm md:text-base">
            <ChartColumnBig className="text-[var(--button-color)]" />
            Total Queue Numbers
          </span>

          <span className="font-semibold text-xs text-[var(--text-color)]">
            Total queue numbers as of{" "}
            <span className="font-light">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </span>

          <span className="text-2xl md:text-3xl font-bold text-[var(--black-csf)] text-center">
            {waiting.length + completed.length + expired.length}
          </span>

        </div>

        <div className="bg-[var(--table-color)] p-3 rounded-sm">
          <p className="font-semibold mb-2 text-[var(--heading-color)] flex items-center gap-2 text-sm md:text-base">
            <TicketPlus
              size={22}
              className="text-[var(--button-color)] rotate-45"
            />
            Today’s Queue Status
          </p>

          <div className="grid grid-cols-3 text-xs md:text-sm font-medium text-center">
            <div className="p-1 border-r border-gray-200 text-[var(--text-color)]">
              Total waiting queue
            </div>
            <div className="p-1 border-r border-gray-200 text-[var(--text-color)]">
              Completed queue
            </div>
            <div className="p-1 text-[var(--text-color)]">Total expired queue</div>
          </div>

          <div className="grid grid-cols-3 text-center text-2xl md:text-3xl font-bold mt-1">
            <div className="py-2 border-r border-gray-200 text-[var(--black-csf)]">
              {waiting.length}
            </div>
            <div className="py-2 border-r border-gray-200 text-[var(--black-csf)]">
              {completed.length}
            </div>
            <div className="py-2 text-[var(--border-color)] text-[var(--black-csf)]">
              {expired.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DateBaseFiltering;
