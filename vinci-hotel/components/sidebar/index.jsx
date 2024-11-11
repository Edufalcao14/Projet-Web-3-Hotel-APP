// components/Sidebar.js
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdFreeBreakfast, MdMenu } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaCoins, FaBed } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import NavItem from "../navItems/navItems";
import Link from "next/link";

const navItemsData = [
  {
    name: "RESERVATIONS",
    url: "/reservations",
    icon: <FaCalendarDays size={25} />,
  },
  {
    name: "FINANCES",
    url: "/finances",
    icon: <FaCoins size={25} />,
  },
  {
    name: "CHAMBRES",
    url: "/rooms",
    icon: <FaBed size={25} />,
  },
  {
    name: "SERVICES",
    url: "/services",
    icon: <MdFreeBreakfast size={25} />,
  },
];

const Sidebar = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  if (!isHome) {
    return (
      <div className="flex">
        {/* Toggle Button positioned at the top left for small and medium screens */}
        <button
          className="fixed top-4 left-4 p-3 text-[#192434] bg-white rounded-full shadow-md cursor-pointer sm:block md:block lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <MdMenu size={30} />
        </button>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen w-[200px] bg-[#192434] flex flex-col items-center pt-6 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:static md:translate-x-0 lg:fixed`}
          style={{ zIndex: 1000 }}
        >
          <Link href="/">
            <Image src="/images/logo-small.svg" width={100} height={100} alt="logo" />
          </Link>

          <nav className="justify-center items-center mt-6 text-center font-mono text-xl text-white">
            {navItemsData.map((item, index) => (
              <NavItem key={item.name + index} name={item.name} url={item.url} icon={item.icon} />
            ))}
            {/* Close Button for small and medium screens */}
            <div
              className="sm:flex md:flex lg:hidden flex-col items-center justify-center hover:text-[#C18E50] cursor-pointer"
              onClick={toggleSidebar}
            >
              <IoIosClose size={40} />
              <p>CLOSE</p>
            </div>
          </nav>
        </div>

        {/* Content area with adjusted margin for desktop view */}
        <div className="flex-grow ml-[1OOpx] lg:ml-[200px]">{children}</div>
      </div>
    );
  } else {
    return children;
  }
};

export default Sidebar;
