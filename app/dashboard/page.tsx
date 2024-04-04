"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

import Menu from "./Menu";
import Projects from "./Projects";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TaskCard from "./TaskCard";
import KanbanBoard from "./KanbanBoard";
import { Board } from "@/lib/types";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* page */}
      <Navbar />

      {/* all containing div */}
      <div className="grid flex-grow grid-cols-5 gap-0 bg-red-300">
        {/* left bars */}
        <div className="col-span-1 flex flex-grow">
          {/* menu bar */}
          <Menu />

          {/* projects bar */}
          <Projects />
        </div>

        {/* main area */}

        <div className="container col-span-4 mx-auto w-full overflow-x-scroll bg-indigo-100 p-8">
          <h1 className="text-3xl font-bold text-[#145389]">
            Frontend Case
          </h1>
          {/* menubar */}
          <div className="menubar flex w-fit items-center justify-start rounded-lg border border-slate-500 font-bold text-[#145389]">
            <div>Boards</div>
            <div>List</div>
            <div>Other</div>
            <div>Other</div>
            <div>Other</div>
            <div>Other</div>
            <div>Other</div>
          </div>
          {/* board area */}
          {/* <div className="grid h-5/6 grid-cols-4 items-center justify-center gap-4"> */}
          {/* <div className="flex h-3/4 cursor-pointer flex-col items-center justify-center space-y-4 rounded-xl bg-white text-2xl text-slate-400">
              <div className="text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 14 14"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M8 1a1 1 0 0 0-2 0v5H1a1 1 0 0 0 0 2h5v5a1 1 0 1 0 2 0V8h5a1 1 0 1 0 0-2H8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p>Add Board</p>
            </div> */}

          <KanbanBoard />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
