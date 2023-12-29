"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type PropsLogin = {
  session: any;
};

const Login = (props: PropsLogin) => {
  const router = useRouter();

  //console.log("session: ", props.session?.user);

  return (
    <div className="flex justify-end ">
      {props.session && (
        <div className="flex items-center justify-between w-full">
          <p>
            Welcome,{" "}
            <span className="text-sm font-semibold text-blue-600">
              {props.session.user.username}
            </span>
          </p>
          <button
            className="bg-red-800 p-1 rounded-lg text-white"
            onClick={() => {
              signOut({ redirect: false });

              router.push("/login");
              //router.refresh();
            }}
          >
            Déconnexion
          </button>
        </div>
      )}

      {!props.session && (
        <button
          className="bg-green-800 p-1 rounded-lg text-white"
          onClick={() => {
            router.push("/login");
          }}
        >
          Connexion
        </button>
      )}
    </div>
  );
};

export default Login;
