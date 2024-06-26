import CalendarIcon from "@/components/CalendarIcon";
import DeleteTaskIcon from "@/components/DeleteTaskIcon";
import { Task } from "@/lib/types";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  deleteTask: (id: number) => void;
  updateTask: (id: number, description: string) => void;
}

const TaskCard = ({ task, deleteTask, updateTask }: TaskCardProps) => {
  const [isMouseOver, setMouseOver] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    console.log(task);
    setEditMode((prev) => !prev);
    setMouseOver(false);
  };

  if (isEditMode) {
    return (
      <div className="relative flex flex-col justify-center border-2 bg-white shadow-lg p-4 rounded-xl h-[200px] min-h-[200px] text-center cursor-grab hover:ring-2 hover:ring-inset hover:ring-slate-400">
        {/* <h3 className="font-semibold">{task.name}</h3>
        <div className="flex justify-between items-start">
          <p>{task.description}</p>
          <img src="/pfp.png" className="rounded-full w-10 h-10" />
        </div>
        <div className="flex items-center space-x-2 stroke-slate-400">
          <CalendarIcon />

          <span>{new Date(task.startDate).toLocaleDateString()}</span>
        </div>
        <span>{task.name}</span> */}
        {/* autoFocus allows us to automatically type in inputs. onBlur triggers when the element loses focus. */}
        <textarea
          className="bg-transparent border-none rounded w-full h-[90%] text-slate-400 resize-none focus:outline-none"
          value={task.description}
          autoFocus
          placeholder="Enter task content"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }
  return (
    <div
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      className="relative flex flex-col justify-center border-2 bg-white shadow-lg p-4 rounded-xl h-[200px] min-h-[200px] text-center cursor-grab hover:ring-2 hover:ring-inset hover:ring-slate-400 task"
    >
      <h3 className="font-semibold">{task.name}</h3>

      <p className="my-auto w-full h-[50%] whitespace-pre-wrap overflow-x-hidden overflow-y-auto">
        {/* Lorem ipsum dolor sit ametloremkeasdasd consectetur adipisicing elit.
        Exercitationem molestiae fugit vitae dolorem consequatur quidem adipisci
        molestias voluptatem cum quod asperiores quaerat laboriosam corporis
        eligendi error natus nostrum illum voluptas dolores totam quas,
        dignissimos doloribus at aspernatur? Ab obcaecati consequatur soluta
        minima, voluptatem non, odit vero ducimus illum dolorem inventore. */}
        {task.description}
      </p>

      <div className="flex justify-between items-center space-x-2 stroke-slate-400">
        <span>
          <CalendarIcon /> {new Date(task.startDate).toLocaleDateString()}
        </span>
        <img src="/pfp.png" className="rounded-full w-10 h-10" />
      </div>
      <span>{task.name}</span>
      {isMouseOver && (
        <button
          className="top-1 right-1 absolute opacity-60 hover:opacity-100 p-2 rounded stroke-black"
          onClick={() => deleteTask(task.id)}
        >
          <DeleteTaskIcon />
        </button>
      )}
    </div>
  );
};
export default TaskCard;
