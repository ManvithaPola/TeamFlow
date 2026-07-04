// ============================================
// 📄 UserStats.tsx
// ============================================

import {
  Users,
  Layers3,
  BookOpen,
} from "lucide-react";

interface Props {
  totalUsers: number;

  currentPage: number;

  totalPages: number;
}

const UserStats = ({
  totalUsers,
  currentPage,
  totalPages,
}: Props) => {
  const cards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "#5B21B6",
    },
    {
      title: "Current Page",
      value: currentPage,
      icon: Layers3,
      color: "#2563EB",
    },
    {
      title: "Total Pages",
      value: totalPages,
      icon: BookOpen,
      color: "#10B981",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-800">
                  {card.value}
                </h2>

              </div>

              <div
                className="rounded-2xl p-4 text-white"
                style={{
                  background: card.color,
                }}
              >
                <Icon size={24} />
              </div>

            </div>
          </div>

        );

      })}

    </div>
  );
};

export default UserStats;