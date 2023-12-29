"use client";
import MyLabel from "@/app/components/MyLabel";
import Title from "@/app/components/Title";
import { AssuStatus, AssuType, Person } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type ClientNewAssuPageProps = {
  params: {
    clientId: number;
  };
};

type Inputs = {
  denom: string;
  status: string;
  description?: string;
};

const AssuranceStatus = [
  { DV1: "DVA - A définir" },
  { DV2: "DVA - A définir" },
  { OFA: "OFA - Offre faite" },
  { OAC: "OAC - Offre acceptée" },
  { PCD: "PCD - Possède déjà" },
];

const inputStyle =
  "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov";

const ClientNewAssuPage = ({ params }: ClientNewAssuPageProps) => {
  const [clientId, setClientId] = useState(params.clientId);
  const [client, setClient] = useState<Person>();
  const router = useRouter();

  const { data: session, status } = useSession();
  const tempo: any = session?.user;
  const val: any = tempo ? tempo?.role : "USER";
  //console.log("VAL: ", val);

  const [data, setData] = useState<Inputs>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchClient = async () => {
      const res = await fetch(`/api/clients/` + clientId, {
        cache: "no-store",
      });
      const data = await res.json();
      setClient(data.client);
    };

    fetchClient();
  }, [clientId]);

  const processForm = async (newAssu: FieldValues) => {
    // console.log("newAssu: ", newAssu);

    /*     const newClient = {
        email: email,
        notes: notes,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        maritalStatus: maritalStatus,
        birthdate: birthdate,
        mobile: mobile,
        address: address,
      }; */

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAssu),
    };
    //  console.log("newClient", newClient);

    try {
      //const res = await fetch(process.env.NEXT_PUBLIC_POLES_API!, options);
      //return null;
      const res = await fetch(`/api/clients/${params.clientId}/assus`, options);
      //   const data = await res.json();
      //   return data;

      if (res.ok) {
        toast.success("Assurance créée avec succès");
        router.push(`/clients/${params.clientId}`);
      }
    } catch (e) {
      return e;
    }

    // setData(data);
  };

  return (
    <div className="w-full mx-auto ">
      <div className=" rounded-lg p-2 mt-2 bg-primary">
        <div className="flex items-center gap-2">
          <Title title="Ajouter une assurance" back={true} size="lg:text-xl" />{" "}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            {
              "Cette transaction permet d'ajouter un nouveau contrat d'assurance à un client"
            }
          </p>
        </div>
        <form
          onSubmit={handleSubmit(processForm)}
          className="border border-hov rounded-lg p-2 mt-2 w-1/2  max-md:w-full"
        >
          <div className="w-full  lg:py-1 flex flex-col">
            <MyLabel title="Nom" />
            <div className={inputStyle}>
              <span className={" font-bold uppercase w-full"}>
                {client?.lastname}
              </span>
              <span className={" font-bold  w-full"}> {client?.firstname}</span>
            </div>
          </div>

          <div className="w-full  lg:py-1 flex flex-col">
            <MyLabel title="Dénomination" />
            <select
              // name="assusdenom"
              className={inputStyle}
              //  value={gender}
              /*               onChange={(e) => {
                const c: any = Object.values(AssuType)?.find(
                  (x: any) => x === e.target.value
                );
                console.log("AssuType:", c);

                //setAssuType(c);
              }} */
              {...register("assudenom", {
                required: "Ce champ est obligatoire",
              })}
            >
              {/*                   <option value={userStatus}>{userStatus}</option>
               */}{" "}
              {Object.values(AssuType)
                ? Object.values(AssuType).map((assuT: any) => {
                    return (
                      <option key={assuT} value={assuT}>
                        {assuT}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>

          <div className="w-full  lg:py-1 flex flex-col">
            <MyLabel title="Statut" />
            <select
              // name="assustatus"
              className={inputStyle}
              //  value={gender}
              /*               onChange={(e) => {
                const c: any = Object.values(AssuStatus)?.find(
                  (x: any) => x === e.target.value
                );
                console.log("AssuStatus:", c);

                //setAssuStatut(c);
              }} */
              {...register("assustatus", {
                required: "Ce champ est obligatoire",
              })}
            >
              {/*                   <option value={userStatus}>{userStatus}</option>
               */}{" "}
              {Object.values(AssuStatus)
                ? Object.values(AssuStatus).map((assuS: any) => {
                    return (
                      <option key={assuS} value={assuS}>
                        {assuS === "DV1"
                          ? "DV1 - A définir"
                          : assuS === "DV2"
                          ? "DV2 - A définir"
                          : assuS === "OFA"
                          ? "OFA - Offre faite "
                          : assuS === "OAC"
                          ? "OAC - Offre acceptée"
                          : "PDC - Possède déjà"}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>

          <div className="w-full  lg:py-1 flex flex-col">
            <MyLabel title="Description" />
            <textarea
              {...register("description")}
              rows={4}
              className={inputStyle}
            />
          </div>
          <div className="flex justify-center gap-4 mt-4 rounded-lg px-2 py-1  ">
            <button
              type="button"
              onClick={() => router.back()}
              className="mt-4 border text-red-400 text-lg rounded-lg px-2 py-1 w-1/3"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="mt-4 bg-teal-800 hover:bg-teal-600 text-white text-lg rounded-lg px-2 py-1 w-1/3 "
            >
              Enregister
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientNewAssuPage;
