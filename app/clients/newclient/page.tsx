"use client";

import MyLabel from "@/app/components/MyLabel";
import Title from "@/app/components/Title";
import { Gender, MaritalStatus } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

//export const runtime = "edge";

const NewClientPage = () => {
  const { data: session, status } = useSession();
  const val: any = session?.user;

  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<any>("");
  const [firstName, setFirstName] = useState<any>("");
  const [lastName, setLastName] = useState<any>("");
  const [gender, setGender] = useState<any>("Homme");
  const [maritalStatus, setMaritalStatus] = useState<any>("C");
  const [birthdate, setBirthdate] = useState<any>("");
  const [notes, setNotes] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const router = useRouter();

  const inputStyle =
    "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov";

  /*   if (val) {
    router.back();
  } */

  const HandleConfirmer = async (e: any) => {
    e.preventDefault();

    const newClient = {
      email: email,
      notes: notes,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      maritalStatus: maritalStatus,
      birthdate: birthdate,
      mobile: mobile,
      address: address,
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient),
    };
    //console.log("newClient", newClient);

    try {
      //const res = await fetch(process.env.NEXT_PUBLIC_POLES_API!, options);
      //return null;
      const res = await fetch("/api/clients", options);
      const data = await res.json();
      //   return data;

      if (res.ok) router.push("/clients");
    } catch (e) {
      return e;
    }
  };

  function calculate_age(dateString: Date) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  /*   const handleSignOut = async () => {
    try {
      signOut({ redirect: false });
      router.push("/login");
    } catch (e) {
      return e;
    }
  }; */

  return (
    <div className="w-full mx-auto">
      <div className=" rounded-lg p-2 mt-2 bg-primary">
        <Title title="Créer un client" back={true} size="lg:text-2xl" />
        <p className="text-sm">
          {"Cette transaction permet d'ajouter un nouveau client"}
        </p>
      </div>
      <form
        onSubmit={(e) => {
          HandleConfirmer(e);
        }}
        className=""
      >
        <div className="flex flex-col text-lg rounded-lg w-full p-2  text-white ">
          <div className=" w-full flex justify-between gap-8 max-md:flex-col">
            <div className="border border-hov p-4 rounded-lg flex flex-col  w-full ">
              <p className="uppercase font-semibold text-sm text-yellow-400">
                Signalétique
              </p>
              <div className="w-full  lg:py-1 flex flex-col">
                <MyLabel title="Prénom" />
                <input
                  onChange={(e) => {
                    setErrorMsg("");
                    setFirstName(e.target.value);
                  }}
                  className={inputStyle}
                  type="text"
                  value={firstName}
                />
              </div>
              <div className="w-full  lg:py-1 flex flex-col">
                <MyLabel title="Nom" />
                <input
                  onChange={(e) => {
                    setErrorMsg("");
                    setLastName(e.target.value);
                  }}
                  className={inputStyle}
                  type="text"
                  value={lastName}
                  required
                />
              </div>
              <div className="w-full  lg:py-1 flex flex-col">
                <MyLabel title="Genre" />
                <select
                  name="userstatus"
                  className={inputStyle}
                  value={gender}
                  onChange={(e) => {
                    const c: any = Object.values(Gender)?.find(
                      (x: any) => x === e.target.value
                    );

                    setGender(c);
                  }}
                >
                  {Object.values(Gender)
                    ? Object.values(Gender).map((userStatus: any) => {
                        return (
                          <option key={userStatus} value={userStatus}>
                            {userStatus}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
              <div className="w-full  lg:py-1 flex flex-col">
                <MyLabel title="Statut" />
                <select
                  name="userstatus"
                  className={inputStyle}
                  value={maritalStatus}
                  onChange={(e) => {
                    const c: any = Object.values(MaritalStatus)?.find(
                      (x: any) => x === e.target.value
                    );

                    setMaritalStatus(c);
                  }}
                >
                  {Object.values(MaritalStatus)
                    ? Object.values(MaritalStatus).map((userStatus: any) => {
                        return (
                          <option key={userStatus} value={userStatus}>
                            {userStatus === "M" ? "Marié(e)" : "Célibataire"}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>

              <div className="flex max-md:flex-col justify-between place-items-center w-full gap-4">
                <div className="w-full  lg:py-1 flex flex-col">
                  <MyLabel title="Date de naissance" />
                  <input
                    onChange={(e) => {
                      setErrorMsg("");
                      setBirthdate(e.target.value);
                    }}
                    className={inputStyle}
                    type="date"
                    value={birthdate}
                    required
                  />
                </div>
                <div className="w-full  lg:py-1 flex flex-col">
                  <MyLabel title="Age" />
                  <input
                    className={inputStyle}
                    type="text"
                    value={birthdate ? calculate_age(birthdate) : "---"}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className="border border-hov p-4 rounded-lg flex flex-col   w-full">
              <p className="uppercase font-semibold text-sm text-yellow-400">
                Données de contact
              </p>

              <div className="flex max-lg:flex-col justify-between place-items-center w-full gap-4 max-lg:gap-0">
                <div className="w-full  lg:py-1 flex flex-col">
                  <MyLabel title="Téléphone" />
                  <input
                    onChange={(e) => {
                      setErrorMsg("");
                      setMobile(e.target.value);
                    }}
                    className={inputStyle}
                    type="text"
                    value={mobile}
                  />
                </div>

                <div className="w-full  lg:py-1 flex flex-col">
                  <MyLabel title="Email" />
                  <input
                    onChange={(e) => {
                      setErrorMsg("");
                      setEmail(e.target.value);
                    }}
                    className={inputStyle}
                    type="email"
                    value={email}
                  />
                </div>
              </div>

              <div className="flex max-lg:flex-col justify-between place-items-center w-full gap-4 max-lg:gap-0">
                <div className="w-full  lg:py-1 flex flex-col">
                  <MyLabel title="Adresse" />
                  <input
                    onChange={(e) => {
                      setErrorMsg("");
                      setAddress(e.target.value);
                    }}
                    className={inputStyle}
                    type="text"
                    value={address}
                  />
                </div>
              </div>

              <div className="flex max-lg:flex-col justify-between place-items-center w-full gap-4 max-lg:gap-0">
                <div className="w-full  lg:py-1 flex flex-col">
                  <MyLabel title="Note sur le client" />
                  <textarea
                    onChange={(e) => {
                      setErrorMsg("");
                      setNotes(e.target.value);
                    }}
                    className={inputStyle}
                    value={notes}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="w-full  py-2 flex flex-col">
                <label className="text-red-400">{errorMsg}</label>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 mt-4 rounded-lg px-2 py-1  ">
            <button className="mt-4 border text-red-400 text-lg rounded-lg px-2 py-1 w-1/3">
              Annuler
            </button>
            <button className="mt-4 bg-teal-800 hover:bg-teal-600 text-white text-lg rounded-lg px-2 py-1 w-1/3 ">
              Enregister
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewClientPage;
