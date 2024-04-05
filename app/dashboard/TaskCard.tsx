import CalendarIcon from "@/components/CalendarIcon";
import DeleteTaskIcon from "@/components/DeleteTaskIcon";
import { Task } from "@/lib/types";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  deleteTask: (id: number) => void;
}

const TaskCard = ({ task, deleteTask }: TaskCardProps) => {
  const [isMouseOver, setMouseOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      className="relative flex h-[200px] min-h-[200px] cursor-grab flex-col justify-center  rounded-xl border-2 bg-white p-4 text-center shadow-lg hover:ring-2 hover:ring-inset hover:ring-slate-400"
    >
      <h3 className="font-semibold">{task.name}</h3>
      <div className="flex items-start justify-between">
        <p>{task.description}</p>
        <img src="/pfp.png" className="h-10 w-10 rounded-full" />
      </div>
      <div className="flex items-center space-x-2 stroke-slate-400">
        <CalendarIcon />

        <span>{new Date(task.startDate).toLocaleDateString()}</span>
      </div>
      <span>{task.name}</span>
      {isMouseOver && (
        <button
          className="absolute right-1 top-1 rounded stroke-black p-2 opacity-60 hover:opacity-100"
          onClick={() => deleteTask(task.id)}
        >
          <DeleteTaskIcon />
        </button>
      )}
    </div>
  );
};
export default TaskCard;
