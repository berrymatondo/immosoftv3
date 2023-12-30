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
import Link from "next/link";

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
    <div className="px-2 text-xs md:hidden top-10 ">
      <div className="flex justify-between">
        <Connect session={session} />
        <Disconnect />
      </div>
      <div className="flex justify-between">
        <QuickLink
          lien="/clients"
          memo="Clients"
          logo={<MdPeople size={20} />}
          color="text-green-400"
        />
        <QuickLink
          lien="/immos"
          memo="Immobiliers"
          logo={<MdHouse size={20} />}
          color="text-orange-400"
        />
        <QuickLink
          lien="/assus"
          memo="Assurances"
          logo={<GiPayMoney size={20} />}
          color="text-purple-400"
        />
        <QuickLink
          lien="/actions"
          memo="Actions"
          logo={<MdTask size={20} />}
          color="text-blue-400"
        />
      </div>
    </div>
  );
};

export default Topbar;

type QuickLinkProps = {
  lien: string;
  memo: string;
  logo: any;
  color: string;
};
export const QuickLink = ({ lien, memo, logo, color }: QuickLinkProps) => {
  return (
    <Link
      href={lien}
      className="flex flex-col justify-center items-center text-xs"
    >
      <span className={color}>{logo}</span>
      <span>{memo}</span>
    </Link>
  );
};
