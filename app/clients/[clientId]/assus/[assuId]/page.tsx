"use client";
import MyLabel from "@/app/components/MyLabel";
import Title from "@/app/components/Title";
import { Assurance, Person, Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const inputStyle =
  "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov";

type ClientAssuPageProps = {
  params: {
    clientId: number;
    assuId: number;
  };
};

const ClientAssuPage = ({ params }: ClientAssuPageProps) => {
  const [assuId, setAssuId] = useState(params.assuId);
  const [clientId, setClientId] = useState(params.clientId);
  const [client, setClient] = useState<Person>();
  const [assu, setAssu] = useState<Assurance>();
  const [task, setTask] = useState<Task>();
  const [showtech, setShowtech] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();
  const tempo: any = session?.user;
  const val: any = tempo ? tempo?.role : "USER";

  useEffect(() => {
    /*     console.log("CLIENT ID", params.clientId);
    console.log("ASSU ID", params.assuId); */

    const fetchClient = async () => {
      const res = await fetch(`/api/clients/` + clientId, {
        cache: "no-store",
      });
      const data = await res.json();
      console.log("CLIENT: ", data.client);

      setClient(data.client);

      const foundAssu = data.client.assus.find(
        (assu: Assurance) => assu.id === +assuId
      );
      setAssu(foundAssu);
      // console.log("foundAssu", foundAssu);

      const foundTask = data.client.task.find(
        (task: Task) => task.assuId === +assuId
      );
      setTask(foundTask);
    };

    fetchClient();
  }, [assuId, clientId]);

  const createAction = async () => {
    const newAction = {
      description: assu?.comments,
      type: "ASSU",
      /*      personId: params.clientId,
      assuId: params.assuId, */
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAction),
    };

    try {
      //const res = await fetch(process.env.NEXT_PUBLIC_POLES_API!, options);
      //return null;
      const res = await fetch(
        `/api/clients/${params.clientId}/assus/${params.assuId}/action`,
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
    <div className="w-full mx-auto">
      <div className=" rounded-lg p-2 mt-2 bg-primary">
        <div className="flex items-center gap-2">
          <Title
            title="Détails assurance client"
            back={true}
            size="lg:text-xl"
          />{" "}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            {"Cette transaction affiche les détails d'un contrat d'assurance"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <>
          <div className="border border-hov rounded-lg p-2 w-1/2  max-md:w-full">
            <div className="w-full  lg:py-1 flex flex-col">
              <MyLabel title="Nom" />
              <div
                onClick={() => router.push(`/clients/${client?.id}`)}
                className="hover:text-yellow-400 hover:cursor-pointer rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov"
              >
                <span className={" font-bold uppercase w-full"}>
                  {client?.lastname}
                </span>
                <span className={" font-bold  w-full"}>
                  {" "}
                  {client?.firstname}
                </span>
              </div>
            </div>

            {/*           <div className="w-full  lg:py-1 flex flex-col">
            <MyLabel title="Dénomination" />
            <select
              // name="assusdenom"
              className={inputStyle}
              //  value={gender}
                             onChange={(e) => {
                const c: any = Object.values(AssuType)?.find(
                  (x: any) => x === e.target.value
                );
              //  console.log("AssuType:", c);

                //setAssuType(c);
              }} 
               {...register("assudenom", {
                required: "Ce champ est obligatoire",
              })} 
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
          </div> */}
            {/* 
          <div className="w-full  lg:py-1 flex flex-col">
            <MyLabel title="Statut" />
            <select
              // name="assustatus"
              className={inputStyle}
              //  value={gender}
                             onChange={(e) => {
                const c: any = Object.values(AssuStatus)?.find(
                  (x: any) => x === e.target.value
                );
             //   console.log("AssuStatus:", c);

                //setAssuStatut(c);
              }} 
              {...register("assustatus", {
                required: "Ce champ est obligatoire",
              })}
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
          </div> */}

            <div className="w-full  lg:py-1 flex flex-col">
              <MyLabel title="Assurance" />
              <input
                // {...register("description")}
                className={inputStyle}
                disabled
                defaultValue={assu?.type}
              />
            </div>
            <div className="w-full  lg:py-1 flex flex-col">
              <MyLabel title="Statut" />
              <input
                // {...register("description")}
                className={inputStyle}
                disabled
                defaultValue={assu?.status}
              />
            </div>
            <div className="w-full  lg:py-1 flex flex-col">
              <MyLabel title="Description" />
              <textarea
                // {...register("description")}
                rows={4}
                className={inputStyle}
                defaultValue={assu?.comments as string}
                disabled
              />
            </div>
            <div className="flex justify-center gap-4 mt-4 rounded-lg px-2 py-1  ">
              {val === "ADMIN" && !task && (
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/clients/${params.clientId}/assus/${params.assuId}/delete`
                    )
                  }
                  className="hover:bg-third mt-4 border text-red-400 text-lg rounded-lg px-2 py-1 w-1/3"
                >
                  Supprimer
                </button>
              )}
              <button
                onClick={() => createAction()}
                type="button"
                className="mt-4 bg-purple-800 hover:bg-purple-600 text-white text-lg rounded-lg px-2 py-1 w-1/3 "
              >
                Créer Action
              </button>
              <button
                onClick={() =>
                  router.push(
                    `/clients/${params.clientId}/assus/${params.assuId}/update`
                  )
                }
                type="button"
                className="mt-4 bg-teal-800 hover:bg-teal-600 text-white text-lg rounded-lg px-2 py-1 w-1/3 "
              >
                Modifier
              </button>
            </div>
          </div>
        </>
        <>
          {" "}
          <div
            onClick={() => setShowtech(!showtech)}
            className="hover:cursor-pointer text-sm border border-hov rounded-lg p-2 mt-2 w-1/2  max-md:w-full"
          >
            <p className="text-third mb-2">Segment technique</p>
            {showtech && (
              <>
                {" "}
                <p>
                  Utilisateur:<strong> {assu?.username}</strong>
                </p>
                <p>
                  Création: <strong>{assu?.createAt.toString()}</strong>
                </p>
                <p>
                  Dernière modification:{" "}
                  <strong>{assu?.updatedAt.toString()}</strong>
                </p>
              </>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default ClientAssuPage;
