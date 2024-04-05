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
}
const ColumnContainer = ({
  board,
  deleteBoard,
  updateBoard,
}: Props) => {
  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };
  const [tasks, setTasks] = useState<Task[]>(board.tasks ?? []);
  console.log(tasks);
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
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 bg-teal-400 opacity-60"
      >
        dragging
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md bg-teal-400"
    >
      <header
        {...attributes}
        {...listeners}
        className="text-md flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 bg-teal-200 p-3 font-bold"
        onClick={() => setEditMode(true)}
      >
        <div className="flex gap-2">
          {!editMode && board.name}
          {editMode && (
            <input
              value={board.name}
              onChange={(e) => updateBoard(board.id, e.target.value)}
              className="border-rose-400 bg-red-300 px-2 outline-none"
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}

          <div className="flex items-center rounded-full px-2 py-1 text-sm">
            {tasks?.length}
          </div>
        </div>
        <button
          className="rounded stroke-gray-500 px-1 py-2 hover:bg-black hover:stroke-white"
          onClick={() => deleteBoard(board.id)}
        >
          <DeleteIcon />
        </button>
      </header>
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        {tasks?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
          />
          //   <div key={task.id}>{task.name}</div>
        ))}
      </div>
      <button
        className="hover: flex items-center gap-2 rounded-md border-2 border-red-200 p-4"
        onClick={() => createTask(board.id)}
      >
        Add New Task
        <PlusIcon />
      </button>
    </div>
  );
};
export default ColumnContainer;
