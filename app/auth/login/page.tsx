"use client";

import MyLabel from "@/app/components/MyLabel";
import Title from "@/app/components/Title";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaHouseDamage } from "react-icons/fa";

const inputStyle =
  "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov w-full";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const val: any = session?.user;

  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const router = useRouter();

  if (val) {
    router.back();
  }

  const HandleConfirmer = async (e: any) => {
    e.preventDefault();

    const loginUser = {
      email: email,
      password: password,
    };

    try {
      const out = await signIn("credentials", {
        ...loginUser,
        redirect: false,
      });

      if (out?.ok) {
        router.push("/");
      } else {
        if (out?.error === "CredentialsSignin")
          setErrorMsg("Email ou mot de passe incorrect");
      }
    } catch (e) {
      return e;
    }
  };

  return (
    <div className="w-full mx-auto  ">
      <div className=" rounded-lg p-2 mt-2 bg-primary">
        <div className="flex items-center gap-2">
          <Title title="Connexion" back={false} size="lg:text-xl" />{" "}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            {"Cette transaction permet de se connecter à la plateforme"}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            HandleConfirmer(e);
          }}
          className="mt-5 md:max-w-[400px] flex flex-col justify-start items-center bg-primary border border-hov rounded-lg"
        >
          <div className="text-lg   rounded-lg w-full p-2 ">
            <div className="w-full  py-2 flex flex-col">
              <MyLabel title="Email" />
              <input
                onChange={(e) => {
                  setErrorMsg("");
                  setEmail(e.target.value);
                }}
                className={inputStyle}
                type="email"
                disabled={val ? true : false}
                required
              />
            </div>

            {!val && (
              <div className="w-full  py-2 flex flex-col">
                <MyLabel title="Mot de passe" />
                <input
                  onChange={(e) => {
                    setErrorMsg("");
                    setPassword(e.target.value);
                  }}
                  className={inputStyle}
                  type="password"
                  required
                />
              </div>
            )}

            {errorMsg && (
              <div className="w-full  py-2 flex flex-col">
                <label className="text-red-400">{errorMsg}</label>
              </div>
            )}

            <div className="self-end flex flex-col justify-center gap-2 mt-4">
              {!val && (
                <button className="mt-4 bg-teal-800 hover:bg-teal-600 text-white text-lg rounded-lg px-2 py-1 w-full">
                  Se Connecter
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
