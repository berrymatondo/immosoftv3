import React from "react";
import Card from "../dashboard/Card";
import { MdGrade, MdHouse } from "react-icons/md";
import { totalImmos } from "@/app/lib/getAllImmos";

export const dynamic = "force-dynamic";

const ImmoDash = async () => {
  const total = await totalImmos(false);

  return (
    <>
      <Card
        title="Dossiers Immobiliers"
        total={+total}
        path="/immos"
        icon={
          <span className="text-orange-400">
            <MdHouse size={24} />
          </span>
        }
        text="Nombre total de dossiers immobiliers dans le système"
      />
    </>
  );
};

export default ImmoDash;
