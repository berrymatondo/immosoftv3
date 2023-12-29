"use client";
import React from "react";
import { Person, Task } from "@prisma/client";
import { MdEdit, MdHouse, MdOutlineRemoveRedEye } from "react-icons/md";
import { useRouter } from "next/navigation";
import { GiPayMoney } from "react-icons/gi";

type ActionsTableProps = {
  actions: any;
  userRole: any;
};

const ActionsTable = ({ actions, userRole }: ActionsTableProps) => {
  const router = useRouter();
  //console.log("CLI:", assus);

  return (
    <table className="bg-primary w-full mt-6 rounded-lg p-4">
      <thead>
        <tr className="font-semibold text-third bg-hov">
          <td className="p-4">Description</td>
          {/*           {userRole === "ADMIN" && <td className="text-right p-4">Actions</td>}
           */}{" "}
        </tr>
      </thead>
      <tbody>
        {actions &&
          actions.map((el: any) => (
            <tr
              key={el.id}
              className=" border-b border-b-hov hover:bg-hov hover:cursor-pointer  hover:text-yellow-400"
              /*               onClick={() =>
                router.push(`/clients/${el.person.id}/assus/${el.id}`)
              } */
            >
              <td
                className={
                  el.done
                    ? `px-4 py-2 flex justify-between items-center bg-green-600`
                    : `px-4 py-2 flex justify-between items-center`
                }
                onClick={() => router.push(`/actions/${el.id}`)}
              >
                <p className="flex items-center gap-2">
                  {el.type === "ASSU" ? (
                    <span className="text-purple-400">
                      <GiPayMoney size={20} />
                    </span>
                  ) : (
                    <span className="text-orange-400">
                      <MdHouse size={20} />
                    </span>
                  )}{" "}
                  <span>
                    {el.person.lastname} {el.person.firstname}
                  </span>
                </p>
                <span className="">{el.description}</span>
              </td>
              {/*               <td className="">
                <p>
                  {el.type}-{el.status}
                </p>
                <p className="text-yellow-400">{el.comments}</p>
              </td> */}

              {/*              {userRole === "ADMIN" && (
                <td className="flex items-center gap-4 justify-end px-4 py-2 text-right">
                  <span className="bg-orange-400 p-1 rounded">
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

export default ActionsTable;
