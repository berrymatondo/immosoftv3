"use client";
import Title from "@/app/components/Title";
import { Assurance, Immo, Person, Rgpd, Task } from "@prisma/client";
import { log } from "console";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTransgender } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import {
  MdAddCircleOutline,
  MdClose,
  MdHouse,
  MdModeEditOutline,
  MdOutlineHouse,
  MdOutlineLocalPhone,
  MdOutlineMail,
  MdPerson,
  MdTask,
} from "react-icons/md";

type ClientDetailsPageProps = {
  params: {
    clientId: number;
  };
};
const blo =
  " md:w-1/2 border border-hov rounded-lg flex flex-col overflow-hidden max-md:mt-4";
const title1 =
  "bg-hov flex justify-between items-center gap-2  p-2 text-white text-center  font-semibold";

const DetailsClientPage = ({ params }: ClientDetailsPageProps) => {
  const [clientId, setClientId] = useState(params.clientId);
  const [client, setClient] = useState<any>();
  const [done, setDone] = useState<boolean>(false);
  const [rgdp, setRgdp] = useState<Rgpd>();
  const router = useRouter();

  const [found, setFound] = useState(false);
  const [signed, setSigned] = useState(false);
  const [update, setUpdate] = useState();
  const [checksum, setChecksum] = useState(0);

  const { data: session, status } = useSession();
  const tempo: any = session?.user;
  const val: any = tempo ? tempo?.role : "USER";
  //console.log("VAL: ", val);

  useEffect(() => {
    //console.log("ID", params.clientId);

    const fetchClient = async () => {
      const res = await fetch(`/api/clients/` + clientId, {
        cache: "no-store",
      });
      const data = await res.json();
      // console.log("CLIENT: ", data.client);

      setClient(data.client);
    };

    fetchClient();

    const fetchRgpd = async () => {
      //  console.log("LLL", client.id);
      //console.log("LLL", params.clientId);

      const res = await fetch("/api/rgpd/" + clientId, {
        cache: "no-store",
      });

      const data = await res.json();
      //console.log("data.rgpd1;", data.rgdp);

      if (
        res.ok &&
        data?.rgdp &&
        clientId == data.rgdp.personId
        // params.checksumId == data.rgdp.checksum
      ) {
        setFound(true);

        setSigned(data.rgdp.signed);
        setUpdate(data.rgdp.updatedAt);
        setChecksum(data.rgdp.checksum);
        setRgdp(data);
      }
    };

    fetchRgpd();
  }, [done, clientId]);

  const deleteTask = async (id: number) => {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    };

    try {
      const res = await fetch(`/api/actions/${id}`, options);

      /*       if (res.ok) {
       // console.log("REFRESHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"); */
      /* setDone(e.target.checked);
        router.push(`/clients/${params.clientId}`); */
      //window.location.reload();
      router.refresh();
      //}
    } catch (e) {
      return e;
    }
  };

  const handleCompleted = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    //console.log("e.target.checked:", e.target.checked);

    setDone(e.target.checked);

    const data = {
      done: e.target.checked,
    };

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    //console.log("data", data);

    try {
      //const res = await fetch(process.env.NEXT_PUBLIC_POLES_API!, options);
      //return null;
      const res = await fetch(`/api/actions/${id}`, options);
      //   const data = await res.json();
      //   return data;

      //if (res.ok) router.push(`/clients/${params.clientId}`);
      if (res.ok) {
        /* setDone(e.target.checked);
        router.push(`/clients/${params.clientId}`); */
        //window.location.reload();
        router.refresh();
      }
    } catch (e) {
      return e;
    }

    // setDone(!done)
  };

  const generateCode = async () => {
    const checksum = Math.floor(Math.random() * 1000000);
    const signRGPD = {
      clientId: +params.clientId,
      checksum: checksum,
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
        setDone(!done);
        router.refresh();
      }
    } catch (e) {
      return e;
    }

    // setData(data);
  };

  const linktask = (ass: Assurance) => {
    const linkedTask: Task = client.task.find(
      (task: Task) => task.assuId == ass.id
    );
    if (linkedTask) return linkedTask.id;
    else return "";
  };

  const linkImmoTask = (immo: Immo) => {
    const linkedTask: Task = client.task.find(
      (task: Task) => task.immoId == immo.id
    );
    if (linkedTask) return linkedTask.id;
    else return "";
  };

  return (
    <div className="w-full mx-auto">
      <div className=" rounded-lg p-2 mt-2 bg-primary">
        <div className="flex items-center gap-2">
          <Title title="Détails d'un client" back={true} size="lg:text-xl" />{" "}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            {
              "Cette transaction affiche la signalétique du client ainsi que tous ses produits"
            }
          </p>
        </div>
      </div>
      <div className="max-md:w-full md:flex md:gap-2 text-lg rounded-lg w-full md:py-5  text-white">
        <div className={blo}>
          <div className={title1}>
            <p className="flex items-center gap-2">
              <></>
              <span className="text-teal-400">
                <MdPerson size={20} />
              </span>
              Détails du client
            </p>
            <span
              onClick={() => router.push(`/clients`)}
              className="text-sm text-right hover:text-yellow-400 flex hover:cursor-pointer"
            >
              Tous les clients
            </span>
          </div>

          <div className="flex flex-col p-2 text-sm">
            <span className="font-bold">
              {client?.firstname} {client?.lastname}
            </span>
            <span>
              {client?.gender}, {"née"}{" "}
              {client?.birthday?.toString().split("T")[0]}
            </span>
            <span className="flex items-center gap-1">
              {client?.maritalstatus === "C"
                ? "Célibataire"
                : "Marié(e)/En couple"}
            </span>
            <span className="flex items-center gap-1 mt-4">
              <MdOutlineLocalPhone />
              {client?.mobile}
            </span>
            <span className="flex items-center gap-1">
              <MdOutlineMail />
              {client?.email}
            </span>
            <span className="flex items-center gap-1">
              <MdOutlineHouse />
              {client?.address}
            </span>
            <span className="text-yellow-400 mt-4">Origine</span>
            <span>{client?.origin}</span>
            <span className="text-yellow-400 mt-4">Notes</span>
            <span>{client?.notes}</span>

            {val === "ADMIN" && (
              <div className="w-full flex justify-end gap-4">
                <button className="text-red-400">Supprimer</button>
                <button
                  onClick={() => router.push(`/clients/${client?.id}/update`)}
                  className="bg-orange-400 p-2 rounded-lg"
                >
                  Modifier
                </button>
              </div>
            )}

            <span className="text-yellow-400 mt-4">RGPD</span>

            {signed ? (
              <p>{`Déjà consenti le ${update}`}</p>
            ) : found ? (
              <p className="flex gap-4">
                {"En attente du consentement:"}
                <Link
                  className="text-yellow-400"
                  href={`http://localhost:3000/rgpd/${params.clientId}/checksum/${checksum}`}
                  target="_blank"
                >
                  Lien
                </Link>
              </p>
            ) : (
              ""
            )}

            {!rgdp && (
              <button
                onClick={generateCode}
                className="text-black my-2 p-2 bg-third rounded-lg"
              >
                Générer code RGPD
              </button>
            )}
          </div>
        </div>
        <div className={blo}>
          <div className={title1}>
            <p
              className="flex items-center gap-2  hover:cursor-pointer hover:text-yellow-400"
              onClick={() => router.push("/actions")}
            >
              <span className="text-orange-400">
                <MdTask size={20} />
              </span>
              Actions
            </p>
          </div>
          <table className="w-full  text-md">
            <thead className=" w-full bg-gray-600">
              <tr>
                <td className="pl-2">Description</td>
              </tr>
            </thead>
            <tbody className="text-sm">
              {client?.task.map((tk: Task) => (
                <tr
                  key={tk.id}
                  className={`${tk.done ? "bg-green-600" : "bg-gray-800"} `}
                  /* className={`${tk.done} ? bg-green-600 w-full border-b border-hov hover:cursor-pointer hover:text-yellow-400 
                    : w-full border-b border-hov hover:cursor-pointer hover:text-yellow-400 `} */
                >
                  <td className="py-4 px-2 flex items-start border-b border-hov">
                    <div
                      onClick={() => router.push(`/actions/${tk.id}`)}
                      className="w-full flex justify-between items-center gap-1"
                    >
                      <p className="flex items-center gap-2 hover:cursor-pointer hover:text-yellow-400">
                        <span
                          className={
                            tk.type === "ASSU"
                              ? `text-purple-400`
                              : `text-orange-400`
                          }
                        >
                          {tk.type === "ASSU" ? (
                            <GiPayMoney size={20} />
                          ) : (
                            <MdHouse size={20} />
                          )}
                        </span>
                        Acttion {tk.id} {"liée"} {" à "}
                        {tk.type === "ASSU"
                          ? "ASSU-" + tk.assuId
                          : "IMMO-" + tk.immoId}{" "}
                        {"->"} {tk.description}
                      </p>
                      {/*                       <div className="flex gap-4">
                        <input
                          type="checkbox"
                          defaultChecked={tk.done}
                          disabled
                          //checked={done}
                          //onChange={(e) => handleCompleted(e, tk.id)}
                          // className="text-red-400"
                        />
                                                 <MdModeEditOutline size={20} />
                        {tk.done && (
                          <span onClick={() => deleteTask(tk.id)}>
                            <MdClose size={20} />
                          </span>
                        )}
                      </div> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="max-md:w-full md:flex md:gap-2 text-lg rounded-lg w-full md:py-2  text-white">
        <div className={blo}>
          <div className={title1}>
            <p
              className="flex items-center gap-2  hover:cursor-pointer hover:text-yellow-400"
              onClick={() => router.push("/immos")}
            >
              <span className="text-orange-400">
                <MdHouse size={20} />
              </span>
              Immobiliers
            </p>
            <span
              onClick={() =>
                router.push(`/clients/${params.clientId}/immos/new`)
              }
              className="text-green-400 text-right flex hover:cursor-pointer"
            >
              <MdAddCircleOutline size={30} />
            </span>
          </div>
          <table className="w-full  text-md">
            <thead className=" w-full bg-gray-600">
              <tr>
                <td className="pl-2 text-left">Référence</td>
                <td className="text-left">Statut</td>
                <td className="text-left pr-2">Fin clause</td>
                <td className="text-right pr-2">{"Action"}</td>
              </tr>
            </thead>
            <tbody className="text-sm">
              {client?.immos.map((immo: Immo) => (
                <tr
                  key={immo.id}
                  onClick={() =>
                    router.push(`/clients/${params.clientId}/immos/${immo.id}`)
                  }
                  className="border-b border-hov hover:cursor-pointer hover:text-yellow-400"
                >
                  <td className="py-4 pl-2 text-left">IMMO-{immo.id}</td>
                  <td className="text-left">{immo.immoStatus}</td>
                  <td className="text-left">
                    {immo.endDate?.toString().split("T")[0]}
                  </td>
                  <td className="text-right pr-2">{linkImmoTask(immo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*           <table className="w-full  text-md">
            <thead className=" w-full bg-gray-600">
              <tr>
                <td className="pl-2">Référence</td>
                <td>Statut</td>
                <td>Fin clause</td>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-hov hover:cursor-pointer hover:text-yellow-400">
                <td className="py-4 px-2">IMMO-10</td>
                <td>RBI - Recherche du bien</td>
                <td>12-12-2024</td>
              </tr>
            </tbody>
          </table> */}
        </div>
        <div className={blo}>
          <div className={title1}>
            <p
              className="flex items-center gap-2 hover:cursor-pointer hover:text-yellow-400"
              onClick={() => router.push("/assus")}
            >
              <span className="text-purple-400">
                <GiPayMoney size={20} />
              </span>
              Assurances
            </p>
            <span
              onClick={() =>
                router.push(`/clients/${params.clientId}/assus/new`)
              }
              className="text-green-400 text-right flex hover:cursor-pointer"
            >
              <MdAddCircleOutline size={30} />
            </span>
          </div>
          <table className="w-full  text-md">
            <thead className=" w-full bg-gray-600">
              <tr>
                <td className="pl-2 text-left">Référence</td>
                <td className="text-left">Assurance</td>
                <td className="text-left">Statut</td>
                <td className="text-left max-md:hidden">Description</td>
                <td className="text-right max-md:hidden">{"Action"}</td>
              </tr>
            </thead>
            <tbody className="text-sm">
              {client?.assus.map((assurance: Assurance) => (
                <tr
                  key={assurance.id}
                  onClick={() =>
                    router.push(
                      `/clients/${params.clientId}/assus/${assurance.id}`
                    )
                  }
                  className="border-b border-hov hover:cursor-pointer hover:text-yellow-400"
                >
                  <td className="py-4 pl-2 text-left">ASSU-{assurance.id}</td>
                  <td className="text-left">{assurance.type}</td>
                  <td className="text-left">{assurance.status}</td>
                  <td className="text-left max-md:hidden">
                    {assurance.comments}
                  </td>
                  <td className="text-right pr-2 max-md:hidden">
                    {linktask(assurance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailsClientPage;
