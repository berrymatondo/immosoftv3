"use client";
import React from "react";
import { Person } from "@prisma/client";
import { MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { useRouter } from "next/navigation";

type AssusTableProps = {
  assus: any;
  userRole: any;
};

const AssusTable = ({ assus, userRole }: AssusTableProps) => {
  const router = useRouter();
  //console.log("CLI:", assus);

  return (
    <table className="bg-primary w-full mt-6 rounded-lg p-4">
      <thead>
        <tr className="font-semibold text-third bg-hov">
          <td className="p-4">Preneur</td>
          <td>Description</td>
          {userRole === "ADMIN" && <td className="text-right p-4">Actions</td>}
        </tr>
      </thead>
      <tbody>
        {assus &&
          assus.map((el: any) => (
            <tr
              key={el.id}
              className=" border-b border-b-hov hover:bg-hov hover:cursor-pointer  hover:text-yellow-400"
              onClick={() =>
                router.push(`/clients/${el.person.id}/assus/${el.id}`)
              }
            >
              <td className="px-4 py-2 ">
                <span className="uppercase">{el.person.lastname}</span>{" "}
                {el.person.firstname}
              </td>
              <td className="">
                <p>
                  {el.type}-{el.status}
                </p>
                <p className="text-yellow-400">{el.comments}</p>
              </td>

              {userRole === "ADMIN" && (
                <td className="flex items-center gap-4 justify-end px-4 py-2 text-right">
                  <span className="bg-orange-400 p-1 rounded">
                    <MdEdit size={24} />
                  </span>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AssusTable;
