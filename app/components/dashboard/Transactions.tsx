import Image from "next/image";
import React from "react";

const Transactions = () => {
  return (
    <div className="bg-secondary p-5 rounded-lg">
      <h2 className="text-third font-light mb-5">
        Dernières actions effectuées
      </h2>
      <table className="w-full">
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 p-2 rounded-full relative overflow-hidden">
                  <Image
                    src="/noavatar.png"
                    alt="profil"
                    fill
                    quality={100}
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                John Doe
              </div>
            </td>
            <td>
              <span className="text-sm p-1 text-white rounded-md bg-[#f7cb7375]">
                Pending
              </span>
            </td>
            <td>12/03/2023</td>
            <td>$3.3456</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
