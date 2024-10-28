'use client'
import React, { useState } from 'react';
import Image from "next/image";
import { MdFreeBreakfast } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaCoins } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import NavItem from "../components/navItem";


const navItemsData = [
  {
    name: "RESERVATIONS",
    url: "/reservations",
    icon: <FaCalendarDays size={35} />,
  },
  {
    name: "FINANCES",
    url: "/finances",
    icon: <FaCoins size={35} />,
  },
  {
    name: "CHAMBRES",
    url: "/chambres",
    icon: <FaBed size={35} />,
  },
  {
    name: "SERVICES",
    url: "/services",
    icon: <MdFreeBreakfast size={35} />,
  },
];

export default function Home() {

  
  return (
    <section className="bg-background-image bg-no-repeat bg-cover flex flex-row min-h-screen">
      <div className="container flex flex-col justify-center items-center px-24 sm:px-36">
        <Image src="/images/logo-big.svg" width={200} height={200} alt="logo" />
        <p className="font-mono mt-6 text-center text-2xl leading-relaxed text-white max-w-5xl">
          Bienvenue sur votre espace d’analyse dédié à l’Hôtel Vinci. 
          Suivez en temps réel la performance de vos réservations, 
          la gestion de vos chambres et la satisfaction de vos clients, 
          pour prendre les meilleures décisions et optimiser votre établissement
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
          {navItemsData.map((item, index) =>   
            <NavItem
              key={item.name + index}
              name={item.name}
              url={item.url}
              icon={ item.icon}
            />
          )}
        </div>
      </div>
      <div className="bg-hotel-image bg-no-repeat bg-cover h-full w-full flex-1 min-h-screen hidden lg:block"></div>
    </section>
  );
}
