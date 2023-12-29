"use client";
import React from "react";
import { MdLogin } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type PropsLogin = {
  session: any;
};

const Connect = (props: PropsLogin) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2  my-1 rounded-lg">
      {!session ? (
        <span
          onClick={() => router.push("/login")}
          className="flex items-center gap-2 text-teal-400 hover:cursor-pointer hover:bg-[#2e374a] p-5"
        >
          <MdLogin />
          Se Connecter
        </span>
      ) : (
        <div className="flex justify-between items-center w-full ">
          {" "}
          <div className="flex items-center gap-5 mb-5">
            <div className="max-md:hidden w-10 h-10 p-2 rounded-full relative overflow-hidden">
              <Image
                src="/noavatar.png"
                alt="profil"
                fill
                quality={100}
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex flex-col">
              {props.session && (
                <span>Welcome, {props.session.user.username}</span>
              )}
              {props.session && (
                <span className="text-xs text-third">
                  {props.session.user.role === "ADMIN"
                    ? "Administrateur"
                    : "Agent"}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connect;
