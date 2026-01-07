import { Inbox } from "lucide-react";

const NoQueueFound = () => {
  return (
    <section className="
      flex flex-col items-center justify-center
      bg-[var(--table-color)]
      text-center
      px-4 py-8
      sm:px-6 sm:py-10
      md:py-14
    ">
      <Inbox
        className="
          mb-4
          text-[var(--text-color)]
          opacity-60
        "
        size={56}
        strokeWidth={1.5}
      />

      <p className="
        text-[var(--text-color)]
        text-sm
        sm:text-base
        font-medium
      ">
        No queue saved yet
      </p>

      <p className="
        text-[var(--text-color)]
        text-xs
        sm:text-sm
        opacity-70
        mt-1
        max-w-xs
      ">
        Generate a queue to get started.
      </p>
    </section>
  );
};

export default NoQueueFound;
