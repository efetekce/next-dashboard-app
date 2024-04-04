"use client";

import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

export default function DashboardPage() {
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
      } catch (error) {
        console.error(error);
      }
    };

    getBoards();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      {/* page */}
      <Navbar />

      {/* all containing div */}
      <div className="grid grid-cols-5 gap-0 flex-grow bg-red-300">
        {/* left bars */}
        <div className="col-span-1 flex flex-grow">
          {/* menu bar */}
          <aside className=" bg-[#363F72] w-[72px] flex p-4">
            <div className="flex flex-col flex-grow justify-between items-center">
              <button className="text-slate-300 hover:bg-slate-200 hover:text-slate-500 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1m0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1M13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1"
                  />
                </svg>
              </button>
              <button className="rounded-full overflow-hidden">
                <img src="/pfp.png" className="w-40 h-auto" />
              </button>
            </div>
          </aside>
          {/* projects bar */}
          <section className="col-span-1 w-full bg-green-300">
            <div className="">
              <p>Projeler</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
