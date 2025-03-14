import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
// import Sidebar from "../components/sidebar/Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex w-full">
      <div className={`w-full transition-all duration-300`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

        <div className={`p-5 h-full transition-all duration-300 px-40`}>
          <div className="bg-white">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
