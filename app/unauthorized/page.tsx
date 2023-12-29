import Link from "next/link";
import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center p-10">
      <span className="text-xl text-red-400">
        {"Vous n'êtes pas autorisé à visiter cette page"}{" "}
      </span>
      <Link
        href={"/"}
        className="text-white bg-hov p-2 m-2 rounded-lg hover:text-yellow-400"
      >
        {"Retour à l'accueil"}
      </Link>
    </div>
  );
};

export default Unauthorized;
