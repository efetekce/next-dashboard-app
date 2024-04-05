"use client";
import PlusIcon from "@/components/PlusIcon";
import { Board, Id, Task } from "@/lib/types";

import ColumnContainer from "./ColumnContainer";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
const KanbanBoard = () => {
  const [boards, setBoards] = useState<Board[] | []>([]);

  const boardsId = useMemo(() => boards.map((b) => b.id), [boards]);
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);

  // fetching the boards with the user token when component is mounted
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

  // CRUD OPERATIONS FOR BOARDS
  const createNewBoard = () => {
    const newBoard: Board = {
      id: generateId(),
      name: `Board ${boards.length + 1}`,
    };
    setBoards([...boards, newBoard]);
  };

  const deleteBoard = (id: Id) => {
    const filteredBoards = boards.filter((b) => b.id !== id);
    setBoards(filteredBoards);
  };
  const updateBoard = (id: number, name: string) => {
    const newBoards = boards.map((b) => {
      if (b.id !== id) return b;
      return { ...b, name };
    });
    setBoards(newBoards);
  };
  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };
  /////////////////////////////////////////////////

  // helper functions for dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
    })
  );
  const onDragStart = (event: DragStartEvent) => {
    console.log("DRAG START", event);
    if (event.active.data.current?.type === "Board") {
      setActiveBoard(event.active.data.current.board);
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
      return arrayMove(boards, activeBoardIndex, overBoardIndex);
    });
  };
  /////////////////////////////////////////////////

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <ScrollContainer
          mouseScroll={{ ignoreElements: "input,header" }}
        >
          <div className="m-auto flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={boardsId}>
                {boards.map((board) => (
                  <ColumnContainer
                    key={board.id}
                    board={board}
                    deleteBoard={deleteBoard}
                    updateBoard={updateBoard}
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
        </ScrollContainer>
        <Fragment>
          {createPortal(
            <DragOverlay>
              {activeBoard && (
                <ColumnContainer
                  board={activeBoard}
                  deleteBoard={deleteBoard}
                  updateBoard={updateBoard}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </Fragment>
      </DndContext>
    </div>
  );
};
export default KanbanBoard;
