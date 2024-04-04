const Navbar = () => {
  return (
    <nav className="flex sticky items-center justify-between p-4 border-b-2 border-slate-100">
      <button className="w-40 h-[72px] rounded-xl font-bold text-2xl text-[#145389] ">
        kargakarga
      </button>
      <div>
        <img src="/image.png" className="w-20 h-20" />
      </div>
    </nav>
  );
};
export default Navbar;
