import { Bell } from "lucide-react";

const EmptyNotifications = () => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-dashed
        border-slate-300
        bg-white
        py-20
        text-center
      "
    >
      <div className="flex justify-center">
        <div
          className="
            rounded-full
            bg-violet-100
            p-5
            text-violet-700
          "
        >
          <Bell size={34} />
        </div>
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        No Notifications
      </h2>

      <p className="mt-2 text-slate-500">
        You're all caught up 🎉
      </p>
    </div>
  );
};

export default EmptyNotifications;