import React from "react";
import Card from "../dashboard/Card";
import { totalAssurances } from "@/app/lib/getAllAssurances";
import { GiPayMoney } from "react-icons/gi";

export const dynamic = "force-dynamic";

const AssuDash = async () => {
  const total = await totalAssurances(false);

  return (
    <>
      <Card
        title="Dossiers Assurances"
        total={+total}
        path="/assus"
        icon={
          <span className="text-purple-400">
            <GiPayMoney size={24} />
          </span>
        }
        text="Nombre total de dossiers d'assurances dans le système"
      />
    </>
  );
};

export default AssuDash;
