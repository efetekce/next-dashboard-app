import PlusIcon from "@/components/PlusIcon";
import { Board, Id } from "@/lib/types";

import ColumnContainer from "./ColumnContainer";
import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
const KanbanBoard = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const boardsId = useMemo(() => boards.map((b) => b.id), [boards]);
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);
  useEffect(() => {
    const getBoards = async () => {
      try {
        const bearerToken = localStorage.getItem("token");
        const response = await fetch(
          "https://api.management.parse25proje.link/api/boards",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
        console.log(response);
        const userBoards = await response.json();
        console.log(userBoards.data);
        setBoards(userBoards.data);
      } catch (error) {
        console.error(error);
      }
    };

    getBoards();
  }, []);
  // const [columns, setColumns] = useState<Column[]>([]);
  // console.log(columns);
  const createNewBoard = () => {
    const newBoard: Board = {
      id: generateId(),
      name: `Board ${boards.length + 1}`,
    };
    setBoards([...boards, newBoard]);
  };
  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };
  const deleteBoard = (id: Id) => {
    const filteredBoards = boards.filter((b) => b.id !== id);
    setBoards(filteredBoards);
  };
  const onDragStart = (event: DragStartEvent) => {
    console.log("DRAG START", event);
    if (event.active.data.current?.type === "Board") {
      setActiveBoard(event.active.data.current.column);
      return;
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeBoardId = active.id;
    const overBoardId = over.id;
    if (activeBoardId === overBoardId) return;

    setBoards((boards) => {
      const activeBoardIndex = boards.findIndex(
        (b) => b.id === activeBoardId
      );
      const overBoardIndex = boards.findIndex(
        (b) => b.id === overBoardId
      );
    });

    return arrayMove(boards, activeBoardIndex, overBoardIndex);
  };
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext onDragStart={onDragStart}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={boardsId}>
              {boards.map((board) => (
                <ColumnContainer
                  key={board.id}
                  column={board}
                  deleteBoard={deleteBoard}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className="flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 bg-slate-400 p-4 ring-rose-400 hover:ring-2"
            onClick={createNewBoard}
          >
            Add New Project
            <PlusIcon />
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeBoard && (
              <ColumnContainer
                column={activeBoard}
                deleteBoard={deleteBoard}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
export default KanbanBoard;
