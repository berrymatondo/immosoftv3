"use client";
import React from "react";
import { MdLogout } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Disconnect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div className="flex items-center p-5 gap-2  my-1 rounded-lg">
      {session && (
        <div className="flex justify-between items-center w-full">
          {" "}
          <span
            onClick={() => {
              signOut({ redirect: false });
              router.push("/");
            }}
            className="flex items-center gap-2 text-red-400  hover:cursor-pointer hover:bg-[#2e374a]"
          >
            <MdLogout size={30} /> Se Déconnecter
          </span>
        </div>
      )}
    </div>
  );
};

export default Disconnect;
