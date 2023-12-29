"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Title from "@/app/components/Title";

type PropsLogin = {
  session: any;
};

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
      className="flex flex-col justify-start items-center"
    >
      <div className="self-center">
        <Title title="Nouvel Utilisateur" back={false} size="lg:text-xl" />{" "}
      </div>

      <div className="text-lg  border rounded-lg w-full p-2 ">
        <div className="w-full  py-2 flex flex-col">
          <label className="font-semibold m-1">{"Nom d'utilisateur"}</label>
          <input
            className="border border-black rounded-full p-2"
            name="username"
            type="username"
            onChange={() => setErrorMsg("")}
            required
          />
        </div>
        <div className="w-full  py-2 flex flex-col">
          <label className="font-semibold m-1">Email</label>
          <input
            className="border border-black rounded-full p-2"
            name="email"
            type="email"
            onChange={() => setErrorMsg("")}
            required
          />
        </div>

        <div className="w-full  py-2 flex flex-col">
          <label className="font-semibold m-1">Mot de passe</label>
          <input
            className="border border-black rounded-full p-2"
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
          <label>Administrateur</label>
        </div>

        <div className="self-end flex flex-col justify-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-third text-white text-lg rounded-lg px-2 py-1 w-full"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
