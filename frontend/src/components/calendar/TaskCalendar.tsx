// ============================================
// 📄 src/components/calendar/TaskCalendar.tsx
// ============================================

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import type { Task } from "../../types/task.types";

interface Props {
  tasks: Task[];
}

const priorityColor = {
  LOW: "#94A3B8",
  MEDIUM: "#2563EB",
  HIGH: "#D97706",
  CRITICAL: "#DC2626",
};

const TaskCalendar = ({
  tasks,
}: Props) => {
  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        interactionPlugin,
      ]}
      initialView="dayGridMonth"
      height="auto"
      events={tasks
        .filter((task) => task.dueDate)
        .map((task) => ({
          id: task.id,
          title: task.title,
          date: task.dueDate!,
          color:
            priorityColor[
              task.priority
            ],
        }))}
    />
  );
};

export default TaskCalendar;