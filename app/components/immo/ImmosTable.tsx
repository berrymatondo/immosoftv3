"use client";
import React from "react";
import { Person } from "@prisma/client";
import { MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { useRouter } from "next/navigation";

type ImmosTableProps = {
  immos: any;
  userRole: any;
};

const prog = [1, 2, 3, 4, 5];

const ImmosTable = ({ immos, userRole }: ImmosTableProps) => {
  const router = useRouter();
  //console.log("CLI:", immos);

  const getProgress = (im: any) => {
    console.log("IMG:", im.immoStatus);

    if (im.immoStatus == "NEW") return 1;
    if (im.immoStatus == "RBI") return 2;
    if (im.immoStatus == "ARV") return 3;
    if (im.immoStatus == "DEC") return 4;
    if (im.immoStatus == "CLO") return 5;
    return 0;
  };

  const showStatus = (im: any) => {
    if (im.immoStatus == "NEW") return "Nouveau";
    if (im.immoStatus == "RBI") return "Recherche du bien";
    if (im.immoStatus == "ARV") return "Attente retour vendeur";
    if (im.immoStatus == "DEC") return "Demande en cours";
    if (im.immoStatus == "CLO") return "Dossier clôturé";
  };

  const getCol = (ind: number) => {
    if (ind == 1) return "bg-blue-600";
    if (ind == 2) return "bg-yellow-600";
    if (ind == 3) return "bg-purple-600";
    if (ind == 4) return "bg-orange-600";
    if (ind == 5) return "bg-green-600";
  };
  return (
    <table className="bg-primary w-full mt-6 rounded-lg p-4">
      <thead>
        <tr className="font-semibold text-third bg-hov">
          <th className="px-2 py-4 text-left">Preneur</th>

          <th className="text-left">Description</th>
          <th className="text-left">Progression</th>
          <th className="text-right pr-2">Fin clause</th>
          {/*           {userRole === "ADMIN" && (
            <td className="max-md:hidden text-right p-4">Actions</td>
          )} */}
        </tr>
      </thead>
      <tbody>
        {immos &&
          immos.map((el: any) => (
            <tr
              key={el.id}
              className=" border-b border-b-hov hover:bg-hov hover:cursor-pointer  hover:text-yellow-400"
              onClick={() =>
                router.push(`/clients/${el.person.id}/immos/${el.id}`)
              }
            >
              <td className="text-left p-2 max-md:flex max-md:flex-col">
                <span className="uppercase">{el.person.lastname}</span>{" "}
                {el.person.firstname}
              </td>
              <td className="text-left text-sm">
                <p>
                  <span className="flex items-center gap-1">
                    <em>IMMO-{el.id}</em>
                    {/*                     <strong className="bg-green-800 rounded-lg p-1">
                      {el.immoStatus}
                    </strong> */}
                  </span>
                </p>
                <p className="text-yellow-400 ">{el.notes}</p>
              </td>
              <td className="text-left">
                {prog.map((ele, index) => (
                  <label
                    className={
                      getProgress(el) == ele
                        ? `mr-2 ${getCol(
                            getProgress(el)
                          )} rounded-full px-3 py-1`
                        : `mr-2 bg-hov rounded-full px-3 py-1`
                    }
                    key={index}
                  >
                    {ele}
                  </label>
                ))}{" "}
                <span className={`${getCol(getProgress(el))} p-1 rounded-lg`}>
                  {showStatus(el)}
                </span>
              </td>
              <td className="text-right pr-2">{el?.endDate?.split("T")[0]}</td>

              {/*               {userRole === "ADMIN" && (
                <td className="flex items-center gap-4 justify-end px-4 py-2 text-right max-md:hidden">
                  <span className=" p-1 rounded">
                    <MdEdit size={24} />
                  </span>
                </td>
              )}*/}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ImmosTable;
