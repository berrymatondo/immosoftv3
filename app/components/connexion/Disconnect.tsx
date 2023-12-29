"use client";
import React from "react";
import { MdLogout } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Disconnect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div className=" flex items-center gap-2  my-1 rounded-lg">
      {session && (
        <div className="flex justify-between items-center w-full">
          {" "}
          <p
            onClick={() => {
              signOut({ redirect: false });
              router.push("/auth/login");
            }}
            className="flex items-center gap-2 text-red-400  hover:cursor-pointer hover:bg-[#2e374a]"
          >
            <span className="max-md:hidden">
              <MdLogout size={30} />
            </span>{" "}
            Se Déconnecter
          </p>
        </div>
      )}
    </div>
  );
};

export default Disconnect;
