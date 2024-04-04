import DeleteIcon from "@/components/DeleteIcon";
import { Board, Column, Id } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Board;
  deleteBoard: (id: Id) => void;
}
const ColumnContainer = ({ column, deleteBoard }: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Board",
      column,
    },
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
      <div
        {...attributes}
        {...listeners}
        className="text-md flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 bg-teal-200 p-3 font-bold"
      >
        <div className="flex gap-2">
          <div className="flex items-center justify-center rounded-full px-2 py-1 text-sm">
            0
          </div>
          {column.name}
        </div>
        <button
          className="rounded stroke-gray-500 px-1 py-2 hover:bg-black hover:stroke-white"
          onClick={() => deleteBoard(column.id)}
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex flex-grow">
        {column.tasks?.map((t) => (
          <p>{t.order}</p>
        ))}
      </div>
      <div>footer</div>
    </div>
  );
};
export default ColumnContainer;
