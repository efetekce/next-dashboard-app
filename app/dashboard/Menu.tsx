const Menu = () => {
  return (
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
          <img src="/pfp.png" className="w-50 h-auto" />
        </button>
      </div>
    </aside>
  );
};
export default Menu;
