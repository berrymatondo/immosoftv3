"use client";
import MyLabel from "@/app/components/MyLabel";
import Title from "@/app/components/Title";
import { Person, Task } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type ActionDetailPageProps = {
  params: {
    actionId: number;
  };
};

const inputStyle =
  "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov";

const ActionDetailPage = ({ params }: ActionDetailPageProps) => {
  const router = useRouter();
  const [actionId, setActionId] = useState(params.actionId);

  const [action, setAction] = useState<Task>();
  const [client, setClient] = useState<Person>();
  const [done, setDone] = useState<Boolean>(false);
  const [description, setDescription] = useState<String>("");

  useEffect(() => {
    const fetchClient = async () => {
      const res = await fetch(`/api/actions/` + actionId, {
        cache: "no-store",
      });
      const data = await res.json();
      // console.log("CLIENT: ", data);
      setAction(data.action);
      setClient(data.action.person);
      setDone(data.action.done);
      setDescription(data.action.description);
    };

    fetchClient();
  }, [actionId]);

  const deleteAction = async () => {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    };

    try {
      const res = await fetch(`/api/actions/${params.actionId}`, options);
      const data = await res.json();
      //   return data;

      if (res.ok) router.push(`/clients/${client?.id}`);
    } catch (e) {
      return e;
    }
  };

  const handleAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      done: done,
      description: description,
    };

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(`/api/actions/${params.actionId}`, options);
      const data = await res.json();
      //   return data;

      if (res.ok) router.push(`/clients/${client?.id}`);
    } catch (e) {
      return e;
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className=" rounded-lg p-2 mt-2 bg-primary">
        <div className="flex items-center gap-2">
          <Title title="Détails d'une action" back={true} size="lg:text-xl" />{" "}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            {"Cette transaction permet de modifier une action"}
          </p>
        </div>
      </div>
      <div className="max-md:w-full md:flex md:gap-2 text-lg rounded-lg w-full md:py-5  text-white">
        <form
          onSubmit={handleAction}
          className="border border-hov rounded-lg p-2  w-1/2  max-md:w-full"
        >
          <div
            onClick={() => router.push(`/clients/${client?.id}`)}
            className="hover:text-yellow-400 hover:cursor-pointer w-full  lg:py-1 flex items-center gap-2"
          >
            <span className="font-bold uppercase">{client?.lastname}</span>
            <span className="font-bold">{client?.firstname}</span>
          </div>
          <div className="w-full gap-2 lg:py-1 flex items-center">
            <input
              type="checkbox"
              //defaultValue={done}
              // value={done}
              checked={done as boolean}
              className={inputStyle}
              onChange={(e) => setDone(e.target.checked)}
            />
            <MyLabel title="Statut" />
          </div>
          <div className="w-full  lg:py-1 flex flex-col">
            <MyLabel title="Description" />
            <textarea
              defaultValue={description as string}
              // value={comments}
              disabled={done as boolean}
              rows={3}
              className={inputStyle}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {action?.type === "ASSU" ? (
            <Link
              className="text-sm underline  hover:text-yellow-400 hover:cursor-pointer"
              href={`/clients/${client?.id}/assus/${action?.assuId}`}
            >
              {"Vers l'assurance liée"}
            </Link>
          ) : (
            <Link href={`/clients/${client?.id}/assus/${action?.assuId}`}>
              Vers le dossier immobilier
            </Link>
          )}
          <div className="flex justify-center gap-4 mt-4 rounded-lg px-2 py-1  ">
            {done && (
              <button
                type="button"
                // onClick={deleteAction}
                onClick={() => router.push(`/actions/${action?.id}/delete`)}
                className="mt-4 border text-red-400 text-lg rounded-lg px-2 py-1 w-1/3"
              >
                Supprimer
              </button>
            )}
            {!done && (
              <button
                type="button"
                onClick={() => router.back()}
                className="mt-4 border text-red-400 text-lg rounded-lg px-2 py-1 w-1/3"
              >
                Annuler
              </button>
            )}
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

export default ActionDetailPage;
