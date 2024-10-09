import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  return (
    <React.Fragment>
      <div className="flex font-readex w-full h-screen overflow-hidden">
        <div className="overflow-y-auto">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
        <div
          className={`px-8 py-5 ${
            sidebarOpen ? "md:left-60" : "md:left-20"
          } flex-1 duration-300 h-screen overflow-y-auto`}
        >
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
