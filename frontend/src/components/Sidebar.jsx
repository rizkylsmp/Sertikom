import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  StarFour,
  Paperclip,
  ExclamationMark,
  List,
} from "@phosphor-icons/react";

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open));
  }, [open]);

  const links = [
    {
      icon: <StarFour weight="fill" />,
      title: "Arsip",
      to: "/",
    },
    {
      icon: <Paperclip weight="fill" />,
      title: "Kategori",
      to: "/kategori",
    },
    {
      icon: <ExclamationMark weight="fill" />,
      title: "About",
      to: "/about",
    },
  ];

  return (
    <div>
      {/* MENU BUTTON */}
      <List
        size={32}
        weight="bold"
        className={`fixed inset-0 z-30 top-4 cursor-pointer ${
          open
            ? " md:text-color-4 md:left-44"
            : "text-color-4 md:left-6 md:bg-opacity-0 rounded bg-opacity-60"
        } duration-300`}
        onClick={() => setOpen(!open)}
      />
      <div
        className={`fixed inset-0 z-20 bg-color-6 border-r min-h-lvh overflow-y-auto ${
          open
            ? "block md:min-w-60"
            : "md:min-w-20 transform -translate-x-full md:-translate-x-0"
        }  md:relative duration-150 md:duration-300`}
      >
        {/* TITLE*/}
        <Link
          to={"/dashboard"}
          className={`flex gap-2 items-center justify-center md:justify-start px-6 pt-4 cursor-pointer ${
            !open && "items-center justify-center pb-4"
          }`}
        >
          <div
            className={`font-extrabold text-[22px] text-color-1 mb-3 ${
              !open && "absolute opacity-0 scale-0"
            }`}
          >
            MENU
          </div>
        </Link>

        <div
          className={`flex flex-col text-lg gap-3  ${open ? "mt-3" : "mt-10"}`}
        >
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className={`flex gap-3 items-center px-3 py-2 mx-5 hover:bg-color-4 hover:text-color-6 rounded-2xl ${
                location.pathname === link.to
                  ? "bg-color-4 text-color-6"
                  : "text-color-4"
              }`}
            >
              <div
                className={`duration-300 ${
                  !open && "items-center"
                } duration-300`}
              >
                {link.icon}
              </div>
              <div
                className={`${
                  !open && "absolute scale-0 transition-opacity duration-100"
                }`}
              >
                {link.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
