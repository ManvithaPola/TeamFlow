// ============================================
// 📄 src/components/tasks/TaskTable.tsx
// ============================================

import {
  Calendar,
  MessageSquare,
  Paperclip,
} from "lucide-react";

import type { Task } from "../../types/task.types";

interface Props {
  tasks: Task[];
}

const statusColor = {
  TODO: "bg-slate-100 text-slate-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  IN_REVIEW: "bg-amber-100 text-amber-700",
  DONE: "bg-green-100 text-green-700",
  BLOCKED: "bg-red-100 text-red-700",
};

const priorityColor = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-amber-100 text-amber-700",
  CRITICAL: "bg-red-100 text-red-700",
};

const TaskTable = ({ tasks }: Props) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left">Task</th>

              <th className="px-6 py-4 text-center">Status</th>

              <th className="px-6 py-4 text-center">Priority</th>

              <th className="px-6 py-4 text-center">Assignee</th>

              <th className="px-6 py-4 text-center">Due</th>

              <th className="px-6 py-4 text-center">Activity</th>

            </tr>

          </thead>

          <tbody>

            {tasks.map((task) => (

              <tr
                key={task.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-5">

                  <h3 className="font-semibold">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                    {task.description}
                  </p>

                </td>

                <td className="px-6 py-5 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[task.status]}`}
                  >
                    {task.status.replace("_", " ")}
                  </span>

                </td>

                <td className="px-6 py-5 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor[task.priority]}`}
                  >
                    {task.priority}
                  </span>

                </td>

                <td className="px-6 py-5 text-center">

                  {task.assignee?.name ?? "Unassigned"}

                </td>

                <td className="px-6 py-5 text-center">

                  {task.dueDate ? (
                    <div className="flex items-center justify-center gap-2">

                      <Calendar size={15} />

                      {new Date(
                        task.dueDate,
                      ).toLocaleDateString()}

                    </div>
                  ) : (
                    "-"
                  )}

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-4">

                    <div className="flex items-center gap-1">

                      <MessageSquare size={15} />

                      {task._count.comments}

                    </div>

                    <div className="flex items-center gap-1">

                      <Paperclip size={15} />

                      {task._count.attachments}

                    </div>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TaskTable;