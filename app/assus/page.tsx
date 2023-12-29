"use client";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import AddButton from "../components/AddButton";
import Search from "../components/Search";
import NaviPages from "../components/NaviPages";
import getSes from "../lib/getServerSession";
import Navbar from "../components/navigation/Navbar";
import { useSession } from "next-auth/react";
import AssusTable from "../components/assu/AssusTable";
import { getAllAssurances, totalAssurances } from "../lib/getAllAssurances";

export const dynamic = "force-dynamic";

const AssusListPage = ({
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

  const [assus, setAssus] = useState([]);
  const [total, setTotal] = useState(0);

  //const session: any = await getSes();
  const { data: session, status } = useSession();
  const tempo: any = session?.user;
  const val: any = tempo ? tempo?.role : "USER";
  //console.log("val: ", val);

  useEffect(() => {
    const fetchAssus = async () => {
      const data = await getAllAssurances(page, limit, search);
      //const data = res.json();

      // console.log("data: ", data);

      setAssus(data);
    };
    fetchAssus();

    const computeTotal = async () => {
      const data = await totalAssurances(true);
      // console.log("data: ", data);

      //const data = res.json();
      setTotal(data);
    };
    computeTotal();
  }, [page, search, limit]);

  return (
    <div className=" mx-auto w-full">
      <div className=" rounded-lg p-2 pr-0 mt-2 bg-primary">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <Title
              title="Liste des dossiers d'assurances"
              back={false}
              size="lg:text-xl"
            />{" "}
            <span className="font-bold">({total})</span>
          </div>
          {/*           {(val === "ADMIN" || val === "USER") && (
            <AddButton path="/clients/newclient" text="Nouveau Client" />
          )} */}
        </div>
        <p className="text-sm">
          {"Cette transaction permet de lister tous les dossiers d'assurances"}
        </p>
      </div>
      <div className="flex justify-between items-center my-5">
        <div className="flex items-center gap-2 bg-hov p-2 rounded-lg max-w-max">
          <Search
            placeholder="Rechercher un dossier d'assurance ..."
            path="assus"
            search={search}
          />
        </div>

        <div className="flex items-center gap-8">
          <NaviPages
            page={page}
            limit={limit}
            total={total}
            search={search}
            path="assus"
          />
        </div>
      </div>
      <AssusTable assus={assus} userRole={val} />
    </div>
  );
};

export default AssusListPage;
