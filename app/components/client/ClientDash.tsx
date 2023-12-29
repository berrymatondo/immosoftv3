import React from "react";
import Card from "../dashboard/Card";
import { MdPeople } from "react-icons/md";
import { totalClients } from "@/app/lib/getAllClients";

export const dynamic = "force-dynamic";

const ClientDash = async () => {
  const total = await totalClients(false);

  return (
    <>
      <Card
        title="Clients"
        total={+total}
        path="/clients"
        icon={
          <span className="text-green-400">
            <MdPeople size={24} />
          </span>
        }
        text="Nombre total de clients dans le système"
      />
    </>
  );
};

export default ClientDash;
