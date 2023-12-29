"use client";

import MyLabel from "@/app/components/MyLabel";
import Title from "@/app/components/Title";
import { Gender, MaritalStatus } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

//export const runtime = "edge";

const NewPublicClient = () => {
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
  const [origin, setOrigin] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [accord, setAccord] = useState(false);
  const [certifie, setCertifie] = useState(false);

  const router = useRouter();

  const inputStyle =
    "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov";

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
      origin: origin,
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
      const res = await fetch("/api/clients", options);
      const data = await res.json();

      console.log("DATAAAAA", data);

      //   return data;

      if (res.ok) generateCode(+data.user.id);
      //router.push("/rgpd/clients/new/ok");
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

  const generateCode = async (dataClient: number) => {
    const checksum = Math.floor(Math.random() * 1000000);
    const signRGPD = {
      clientId: dataClient,
      checksum: checksum,
      signed: true,
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signRGPD),
    };

    try {
      const res = await fetch(`/api/rgpd`, options);
      if (res.ok) {
        router.push("/rgpd/clients/new/ok");
      }
    } catch (e) {
      return e;
    }

    // setData(data);
  };

  /*   const processRGPD = async (get) => {
    const signRGPD = {
      clientId: +params.clientId,
      checksum: +params.checksumId,
    };

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signRGPD),
    };
    //console.log("signRGPD", signRGPD);

    try {
      const res = await fetch(
        `/api/rgpd/${params.clientId}/checksum/${params.checksumId}`,
        options
      );
      if (res.ok) setReload(!reload);
    } catch (e) {
      return e;
    }

    // setData(data);
  }; */

  return (
    <div className="w-full mx-auto">
      {/*       <div className=" flex justify-center text-6xl">
        <span className="text-third">
          <FaHouseDamage />
        </span>
      </div> */}
      {/*       <Login session={session} />
       */}{" "}
      <div className=" rounded-lg p-2 mt-2 bg-primary">
        <Title title="Nouveau client" back={false} size="lg:text-2xl" />
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
              {/*               <div className="flex max-lg:flex-col justify-between place-items-center w-full gap-4 max-lg:gap-0">
               */}{" "}
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
              {/* </div> */}
              {/*               <div className="flex max-lg:flex-col justify-between place-items-center w-full gap-4">
               */}{" "}
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
                  {/*                   <option value={userStatus}>{userStatus}</option>
                   */}{" "}
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
                  {/*                   <option value={userStatus}>{userStatus}</option>
                   */}{" "}
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
              {/*               </div>
               */}{" "}
              <div className="flex max-lgflex-col justify-between place-items-center w-full gap-4">
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
                  <p className="flex items-center">
                    <MyLabel title="Origine" />{" "}
                    <span className="text-red-400">*</span>
                  </p>
                  <input
                    onChange={(e) => {
                      setErrorMsg("");
                      setOrigin(e.target.value);
                    }}
                    className={inputStyle}
                    type="text"
                    value={origin}
                    required
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
              {/*             <div className="flex max-lg:flex-col justify-between place-items-center w-full gap-4 max-lg:gap-0">
              <div className="w-full  lg:py-2 flex flex-col">
                <label className="font-semibold m-1">
                  {" "}
                  <input
                    onChange={(e) => {
                      setErrorMsg("");
                      setFirstName(e.target.value);
                    }}
                    className="text-blue-900 rounded-full p-2 max-lg:p-1 mb-2 border bg-white "
                    type="checkbox"
                    value={firstName}
                  />
                  RGPD
                </label>
              </div>
            </div> */}
            </div>

            {errorMsg && (
              <div className="w-full  py-2 flex flex-col">
                <label className="text-red-400">{errorMsg}</label>
              </div>
            )}
          </div>

          {/*             {val && (
              <button
                type="button"
                onClick={handleSignOut}
                className=" text-white bg-red-600 rounded-lg p-2 border"
              >
                Se Déconnecter
              </button>
            )} */}

          <div>
            <div className="w-full mx-auto ">
              <div className=" rounded-lg p-2 mt-2 bg-primary flex flex-col items-center gap-2">
                <span className="text-yellow-400">
                  {"Consentement pour le Traitement des Données Personnelles"}
                </span>
                <div className="flex flex-col justify-between items-center">
                  <p className="text-sm text-center p-2">
                    <span>{"Je, soussigné(e) "}</span>
                    <span className="uppercase font-semibold">
                      {lastName} {firstName}{" "}
                    </span>{" "}
                    {
                      ", reconnais par la présente avoir été informé(e) par IMMO FINANCES MALAIN srl de la collecte et du traitement de mes données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la législation belge en vigueur."
                    }
                  </p>
                  <p className="text-sm p-2">
                    {
                      "Je consens volontairement et librement au traitement de mes données personnelles aux fins suivantes :"
                    }
                    <span>
                      {"Conseils et accompagnent en IMMOBILIER et ASSURANCES"}
                    </span>
                  </p>
                </div>
                <div className="w-full  lg:py-1 flex flex-col gap-2">
                  <div className="flex gap-2 text-lg justify-center items-center border border-third rounded-lg p-2">
                    <input
                      checked={accord}
                      type="checkbox"
                      onChange={() => setAccord(!accord)}
                    />
                    <MyLabel title="Je comprends que je conserve le droit de retirer ce consentement à tout moment, sans que cela n'affecte la légalité du traitement basé sur le consentement avant son retrait." />
                  </div>
                  <div className="flex gap-2 text-lg justify-center items-center  border border-third rounded-lg p-2">
                    <input
                      checked={certifie}
                      type="checkbox"
                      onChange={() => setCertifie(!certifie)}
                    />
                    <MyLabel title="Je certifie que les informations que j'ai fournies à IMMO FINANCES MALAIN sont exactes et à jour." />
                  </div>
                </div>

                {/*                 {accord && certifie && (
                  <button
                    type="button"
                    //  onClick={() => processRGPD()}
                    className="bg-green-600 p-2 rounded-lg"
                  >
                    Confirmer
                  </button>
                )} */}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4 rounded-lg px-2 py-1  ">
            <button className="mt-4 border text-red-400 text-lg rounded-lg px-2 py-1 w-1/3">
              Annuler
            </button>
            {accord && certifie && (
              <button className="mt-4 bg-teal-800 hover:bg-teal-600 text-white text-lg rounded-lg px-2 py-1 w-1/3 ">
                Confirmer et Enregister
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPublicClient;
