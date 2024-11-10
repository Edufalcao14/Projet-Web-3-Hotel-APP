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
      <div className="flex flex-wrap z-0">
        {/* Menu icon for small screens */}
        <button
          className="md:hidden p-4 text-[#192434] cursor-pointer"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <MdMenu size={30} />
        </button>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen w-[200px] bg-[#192434] flex flex-col items-center pt-6 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:static md:translate-x-0`}
        >
          <Link href="/">
          <Image
            src="/images/logo-small.svg"
            width={100}
            height={100}
            alt="logo"
          />
          </Link>
          
          <nav className="justify-center items-center mt-6 text-center font-mono text-xl">
            {navItemsData.map((item, index) => (
              <NavItem
                key={item.name + index}
                name={item.name}
                url={item.url}
                icon={item.icon}
              />
            ))}
            <div className={`flex flex-col items-center justify-center text-white hover:text-[#C18E50] cursor-pointer ${isOpen ? "block" : "hidden"}`}  onClick={toggleSidebar}>
            <IoIosClose size={40} />
            <p>CLOSE</p>
            </div>
            
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-grow ">{children}</div>
      </div>
    );
  } else {
    return children;
  }
};

export default Sidebar;
