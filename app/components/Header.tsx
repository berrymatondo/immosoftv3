//"use client";
/* import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; */

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Login from "./Login";

const Header = async () => {
  /*   const { data: session, status } = useSession();
  const val: any = session?.user; */
  // const router = useRouter();
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-yellow-400 flex justify-between border rounded-lg p-2">
      <div>ImmoSoft</div>

      <Login session={session} />

      {/*       {session && (
        <button
          className="bg-red-800 p-1 rounded-lg text-white"
          // onClick={() => router.push("/login")}
        >
          Déconnexion
        </button>
      )}

      {!session && (
        <button
          className="bg-green-800 p-1 rounded-lg text-white"
          //   onClick={() => router.push("/login")}
        >
          Connexion
        </button>
      )} */}
    </div>
  );
};

export default Header;
