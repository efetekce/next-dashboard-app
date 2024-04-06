import DeleteIcon from "@/components/DeleteIcon";
import { Board, Id, Task } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import TaskCard from "./TaskCard";

interface Props {
  board: Board;
  deleteBoard: (id: Id) => void;
  updateBoard: (id: number, name: string) => void;
  tasks?: Task[];
}
const ColumnContainer = ({ board, deleteBoard, updateBoard }: Props) => {
  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };
  const [tasks, setTasks] = useState<Task[]>(board.tasks ?? []);
  //   console.log(tasks);

  // CRUD OPERATIONS FOR TASKS
  const createTask = (boardId: number) => {
    const newTask: Task = {
      id: generateId(),
      boardId,
      name: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };
  const deleteTask = (id: number) => {
    const newTasks = tasks?.filter((task) => task.id !== id);
    setTasks(newTasks);
  };
  const updateTask = (id: number, description: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, description };
    });
    setTasks(newTasks);
  };
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: board.id,
    data: {
      type: "Board",
      board,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex flex-col border-2 bg-white opacity-60 rounded-md w-[350px] h-[500px] max-h-[500px]"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col bg-white shadow-lg rounded-md w-[350px] h-[500px] max-h-[500px]"
    >
      <header
        {...attributes}
        {...listeners}
        className="flex justify-between items-center bg-blue-700 p-3 rounded-b-none rounded-lg h-[60px] font-bold text-md cursor-alias ring-2 ring-slate-200"
        onClick={() => setEditMode(true)}
      >
        <div className="flex gap-2">
          {!editMode && board.name}
          {editMode && (
            <input
              value={board.name}
              onChange={(e) => updateBoard(board.id, e.target.value)}
              className="border-2 bg-slate-200 opacity-60 px-2 border-rose-400 outline-none"
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}

          <div className="flex items-center px-2 py-1 rounded-full text-sm">
            {tasks?.length}
          </div>
        </div>
        <button
          className="hover:bg-slate-200 px-1 py-2 rounded stroke-gray-500 hover:stroke-white"
          onClick={() => deleteBoard(board.id)}
        >
          <DeleteIcon />
        </button>
      </header>
      <div className="flex flex-col flex-grow gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {tasks?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>
      <button
        className="flex items-center gap-2 border-2 border-slate-200 p-4 rounded-md rounded-t-0"
        onClick={() => createTask(board.id)}
      >
        Add New Task
        <PlusIcon />
      </button>
    </div>
  );
};
export default ColumnContainer;
