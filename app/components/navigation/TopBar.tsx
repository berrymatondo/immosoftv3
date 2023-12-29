"use client";
import React from "react";
import {
  MdBuild,
  MdDashboard,
  MdEdit,
  MdGrade,
  MdHouse,
  MdLogout,
  MdMoney,
  MdPeople,
  MdPerson,
  MdTask,
} from "react-icons/md";
import Image from "next/image";
import MenuLink from "./MenuLink";
import Connect from "../connexion/Connect";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Disconnect from "../connexion/Disconnect";
import { GiPayMoney } from "react-icons/gi";

import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Topbar = () => {
  //const session = await getServerSession(authOptions);
  const { data: session, status } = useSession();
  const val: any = session?.user;
  const router = useRouter();

  const pathname = usePathname();

  if (!session) {
    return;
  }

  return (
    <div className="px-2 text-xs md:hidden top-10 flex justify-between">
      <Connect session={session} />
      <Disconnect />
    </div>
  );
};

export default Topbar;
