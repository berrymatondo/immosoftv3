"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaHouseDamage } from "react-icons/fa";
import { MdNotifications, MdOutlineChat, MdPublic } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  /*   const getPathName = () => {
    let out = pathname.split("/").pop();
    switch (out) {
      case "immos":
        return "Immobiliers";
      case "assus":
        return "Assurances";
      case "":
        return "Dashboard";
      case "tasks":
        return "Actions";
      case "register":
        return "Nouvel utilisateur";
      case "user":
        return "Editer utilisateur";
      case "newuser":
        return "Nouveau client";
      default:
        return out;
    }
  }; */

  return (
    <div className="flex justify-between items-center p-5 rounded-lg bg-secondary">
      <div className="text-third text-2xl font-bold capitalize">
        {" "}
        <div
          onClick={() => router.push("/")}
          className=" flex justify-center text-4xl hover:cursor-pointer"
        >
          <span className="text-teal-600">
            <FaHouseDamage />
          </span>
          ImmoSoft
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-5">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
