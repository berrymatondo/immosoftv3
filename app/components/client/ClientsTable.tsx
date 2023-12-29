"use client";
import React from "react";
import { Person } from "@prisma/client";
import { MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { useRouter } from "next/navigation";

type ClientsTableProps = {
  clients: any;
  userRole: any;
};

const ClientsTable = ({ clients, userRole }: ClientsTableProps) => {
  const router = useRouter();
  //console.log("CLI:", clients);

  return (
    <table className="bg-primary w-full mt-6 rounded-lg p-4">
      <thead>
        <tr className="font-semibold text-third bg-hov">
          <th className="text-left py-4 px-2 max-md:hidden">Prénom</th>
          <th className="text-left">Nom</th>
          <th className="text-left max-md:hidden">Téléphone</th>
          <th className="text-right pr-2">Produits</th>
          {/*           <th className="text-right p-4  max-md:hidden">{"Actions liées ?"}</th>
           */}{" "}
          {/*           {userRole === "ADMIN" && <td className="text-right p-4">Actions</td>}
           */}{" "}
        </tr>
      </thead>
      <tbody>
        {clients &&
          clients.map((el: any) => (
            <tr
              key={el.id}
              className={
                el?.rgpd
                  ? el?.rgpd.signed
                    ? `hover:cursor-pointer hover:bg-hov hover:text-yellow-400`
                    : `text-orange-400 hover:cursor-pointer hover:bg-hov hover:text-yellow-400`
                  : `text-red-400 hover:cursor-pointer hover:bg-hov hover:text-yellow-400`
              }
              //className="border-b border-b-hov hover:bg-hov hover:cursor-pointer  hover:text-yellow-400"
              onClick={() => router.push(`/clients/${el.id}`)}
            >
              <td className="px-2 py-4  max-md:hidden">{el.firstname}</td>
              <td className="max-md:py-2.5">{el.lastname}</td>
              <td className="max-md:hidden">{el.mobile}</td>
              <td className="text-right text-sm pr-2">
                {"IMMO ("}
                {el.immos.length}
                {")"} - {"ASSU ("}
                {el.assus.length}
                {")"}
              </td>
              {/*               <td className="text-right pr-4  max-md:hidden">{"xx"}</td>
               */}
              {/*               {userRole === "ADMIN" && (
                <td className="flex items-center gap-4 justify-end px-4 py-2">
                  <span className=" p-1 rounded">
                    <MdEdit size={24} />
                  </span>
                </td>
              )} */}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ClientsTable;
