"use client";
import MyLabel from "@/app/components/MyLabel";
import Title from "@/app/components/Title";
import { AssuStatus, AssuType, Assurance, Person } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type ClientAssuUpdatePageProps = {
  params: {
    clientId: number;
    assuId: number;
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

const ClientAssuUpdatePage = ({ params }: ClientAssuUpdatePageProps) => {
  const [assuId, setAssuId] = useState(params.assuId);
  const [clientId, setClientId] = useState(params.clientId);
  const [client, setClient] = useState<Person>();
  const [assu, setAssu] = useState<Assurance>();
  const [assuType, setAssuType] = useState("");
  const [assuStatus, setAssuStatus] = useState("");
  const [comments, setComments] = useState("");
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
      // console.log("CLIENT: ", data.client);
      setClient(data.client);

      //console.log("params.assuId:", params.assuId);

      const foundAssu: Assurance = data.client.assus.find(
        (assu: Assurance) => assu.id === +assuId
      );
      // console.log("foundAssu:", foundAssu);

      setAssu(foundAssu);
      setAssuType(foundAssu.type);
      setAssuStatus(foundAssu.status);
      setComments(foundAssu.comments as string);
    };

    fetchClient();
  }, [assuId, clientId]);

  const processForm = async (e: any) => {
    e.preventDefault();

    const updateAssu = {
      type: assuType,
      status: assuStatus,
      comments: comments,
    };

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateAssu),
    };
    //console.log("updateAssu", updateAssu);

    try {
      //const res = await fetch(process.env.NEXT_PUBLIC_POLES_API!, options);
      //return null;
      const res = await fetch(
        `/api/clients/${params.clientId}/assus/${params.assuId}`,
        options
      );
      //   const data = await res.json();
      //   return data;

      if (res.ok) router.push(`/clients/${params.clientId}`);
    } catch (e) {
      return e;
    }

    // setData(data);
  };

  return (
    <div className="w-full mx-auto ">
      <div className=" rounded-lg p-2 mt-2 bg-primary">
        <div className="flex items-center gap-2">
          <Title title="Modifier une assurance" back={true} size="lg:text-xl" />{" "}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            {
              "Cette transaction permet de modifier un nouveau contrat d'assurance à un client"
            }
          </p>
        </div>
      </div>
      <form
        onSubmit={processForm}
        className="border border-hov rounded-lg p-2 mt-5 w-1/2  max-md:w-full"
      >
        <div
          onClick={() => router.push(`/clients/${client?.id}`)}
          className="hover:text-yellow-400 hover:cursor-pointer w-full  lg:py-1 flex flex-col"
        >
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
            className={inputStyle}
            defaultValue={assu?.type}
            value={assuType}
            onChange={(e) => {
              const c: any = Object.values(AssuType)?.find(
                (x: any) => x === e.target.value
              );
              // console.log("AssuType:", c);

              setAssuType(c);
            }}
          >
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
            className={inputStyle}
            defaultValue={assu?.status}
            value={assuStatus}
            onChange={(e) => {
              const c: any = Object.values(AssuStatus)?.find(
                (x: any) => x === e.target.value
              );
              // console.log("AssuStatus:", c);

              setAssuStatus(c);
            }}
          >
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
            defaultValue={assu?.comments as string}
            value={comments}
            rows={4}
            className={inputStyle}
            onChange={(e) => setComments(e.target.value)}
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
  );
};

export default ClientAssuUpdatePage;
