"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import MyLabel from "@/app/components/MyLabel";

type PropsLogin = {
  session: any;
};

const inputStyle =
  "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov w-full";

const RegisterForm = (props: PropsLogin) => {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
          isAdmin: formData.get("isadmin"),
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();

      if (data.message === "KO") {
        setErrorMsg("Cet email est déjà utilisé");
      } else router.push("/clients");
    } catch (error) {
      console.error(error);
    }
  };

  if (props.session?.user?.role !== "ADMIN") {
    return (
      <p className="py-20 text-red-400">
        {"Vous n'êtes pas autorisé(e) à effectuer cette action"}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-hov rounded-lg mt-5 flex flex-col justify-start items-center md:max-w-[400px]"
    >
      <div className="text-lg w-full p-2 ">
        <div className="w-full  py-2 flex flex-col">
          <MyLabel title="Nom d'utilisateur" />
          <input
            className={inputStyle}
            name="username"
            type="username"
            onChange={() => setErrorMsg("")}
            required
          />
        </div>
        <div className="w-full  py-2 flex flex-col">
          <MyLabel title="Email" />
          <input
            className={inputStyle}
            name="email"
            type="email"
            onChange={() => setErrorMsg("")}
            required
          />
        </div>

        <div className="w-full  py-2 flex flex-col">
          <MyLabel title="Mot de passe" />
          <input
            className={inputStyle}
            name="password"
            type="password"
            onChange={() => setErrorMsg("")}
            required
          />
        </div>

        {errorMsg && <label className="text-red-400">{errorMsg}</label>}

        <div className="w-full py-2 flex items-center gap-1">
          <input
            className="border border-black"
            name="isadmin"
            type="checkbox"
          />
          <MyLabel title="Administrateur ?" />
        </div>

        <div className="self-end flex flex-col justify-center gap-2 mt-4">
          <button
            type="submit"
            className="mt-4 bg-teal-800 hover:bg-teal-600 text-white text-lg rounded-lg px-2 py-1 w-full"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
