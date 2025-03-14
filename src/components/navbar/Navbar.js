import "moment/locale/id";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {
  const location = useLocation();

  return (
    <nav className="sticky top-0 bg-white text-black p-4 flex items-center justify-between w-full border-b-[1px] px-40 z-50">
      <div className="flex flex-row items-center space-x-10">
        <Link to="/home" className="text-black flex flex-row items-center space-x-2">
          <img src="img/Logo.png" alt="Logo" />
          <div className="font-bold">SIMS PPOB</div>
        </Link>
      </div>

      <div className="relative flex flex-row items-center space-x-4">
        <ul className="flex flex-row space-x-10">
          <Link
            to="/top-up"
            className={`p-2 font-semibold ${
              location.pathname === "/top-up" ? "text-red-500" : "hover:bg-gray-200"
            }`}
          >
            Top Up
          </Link>
          <Link
            to="/transaction"
            className={`p-2 font-semibold ${
              location.pathname === "/transaction" ? "text-red-500" : "hover:bg-gray-200"
            }`}
          >
            Transaction
          </Link>
          <Link
            to="/profile"
            className={`p-2 font-semibold ${
              location.pathname === "/account" ? "text-red-500" : "hover:bg-gray-200"
            }`}
          >
            Akun
          </Link>
        </ul>
      </div>
    </nav>
  );
}
