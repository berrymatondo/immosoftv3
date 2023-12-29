"use client";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import AddButton from "../components/AddButton";
import Search from "../components/Search";
import { getAllclients, totalClients } from "../lib/getAllClients";
import NaviPages from "../components/NaviPages";
import getSes from "../lib/getServerSession";
import ClientsTable from "../components/client/ClientsTable";
import Navbar from "../components/navigation/Navbar";
import { useSession } from "next-auth/react";
import { FaSquare } from "react-icons/fa";

export const dynamic = "force-dynamic";

const ClientsListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 5;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const [clients, setClients] = useState([]);
  const [total, setTotal] = useState(0);

  //const session: any = await getSes();
  const { data: session, status } = useSession();
  const tempo: any = session?.user;
  const val: any = tempo ? tempo?.role : "USER";
  //console.log("val: ", val);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await getAllclients(page, limit, search);
      //const data = res.json();

      console.log("DATA: ", data);

      setClients(data);
    };
    fetchClients();

    const computeTotal = async () => {
      const data = await totalClients(true);
      // console.log("data: ", data);

      //const data = res.json();
      setTotal(data);
    };
    computeTotal();
  }, [page, search, limit]);

  return (
    <div className=" mx-auto w-full max-md:px-2">
      <div className=" rounded-lg md:p-2 pr-0 mt-2 bg-primary">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <Title title="Liste des clients" back={false} size="lg:text-xl" />{" "}
            <span className="font-bold">({total})</span>
          </div>
          {(val === "ADMIN" || val === "USER") && (
            <AddButton path="/clients/newclient" text="Nouveau Client" />
          )}
        </div>
        <p className="text-sm  max-md:text-xs">
          Cette transaction permet de lister tous les clients
        </p>
      </div>
      <div className="flex justify-between items-center my-5 max-md:flex-col max-md:items-start  max-md:gap-2">
        <div className="flex items-center gap-2 bg-hov p-2 rounded-lg max-w-max">
          <Search
            placeholder="Rechercher un client ..."
            path="clients"
            search={search}
          />
        </div>

        <div className="flex items-center gap-8">
          <NaviPages
            path="clients"
            page={page}
            limit={limit}
            total={total}
            search={search}
          />
        </div>
      </div>

      <ClientsTable clients={clients} userRole={val} />
      <div className="bg-hov p-2 mt-2 flex justify-between gap-6 max-md:flex-col max-md:items-start max-md:gap-2">
        <span className="flex items-center text-sm gap-1  max-md:text-xs">
          <FaSquare /> RGPD OK
        </span>
        <span className="flex items-center text-sm gap-1 text-orange-400  max-md:text-xs">
          <FaSquare /> Attente consentement RGPD
        </span>
        <span className="flex items-center text-sm gap-1 text-red-400  max-md:text-xs">
          <FaSquare /> Consentement RGPD pas généré
        </span>
      </div>
    </div>
  );
};

export default ClientsListPage;
