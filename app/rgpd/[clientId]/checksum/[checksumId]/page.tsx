"use client";
import MyLabel from "@/app/components/MyLabel";
import Title from "@/app/components/Title";
import { Person } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaLeaf } from "react-icons/fa";

const inputStyle =
  "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov";

type ValidateRGPDProps = {
  params: {
    clientId: string;
    checksumId: string;
  };
};

const ValidateRGPD = ({ params }: ValidateRGPDProps) => {
  const [checksumId, setChecksumId] = useState(params.checksumId);
  const [clientId, setClientId] = useState(params.clientId);
  const [name, setName] = useState<String>("");
  const [client, setClient] = useState<Person>();
  const [accord, setAccord] = useState(false);
  const [certifie, setCertifie] = useState(false);
  const [checksum, setChecksum] = useState(0);
  const [rgpd, setRgdp] = useState<any>();
  const [found, setFound] = useState(false);
  const [signed, setSigned] = useState(false);
  const [update, setUpdate] = useState();
  const [reload, setReload] = useState(false);
  const router = useRouter();

  // Read data
  useEffect(() => {
    const fetchClient = async () => {
      const res = await fetch(`/api/rgpd/${clientId}/checksum/${checksumId}`, {
        cache: "no-store",
      });

      const data = await res.json();
      // setClient(data);

      //console.log("client", data);

      if (
        res.ok &&
        clientId == data.rgdp.personId &&
        checksumId == data.rgdp.checksum
      )
        setFound(true);

      //console.log("data.rgpd.person;", data?.rgpd?.person);

      setSigned(data.rgdp.signed);
      setUpdate(data.rgdp.updatedAt);
      setRgdp(data);
      //setName(data.rgdp.person.firstname);
      // setClient(data.rgdp.person);
    };

    fetchClient();
  }, [reload, checksumId, clientId]);

  const processRGPD = async () => {
    const signRGPD = {
      clientId: +params.clientId,
      checksum: +params.checksumId,
    };

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signRGPD),
    };
    //console.log("signRGPD", signRGPD);

    try {
      const res = await fetch(
        `/api/rgpd/${params.clientId}/checksum/${params.checksumId}`,
        options
      );
      if (res.ok) setReload(!reload);
    } catch (e) {
      return e;
    }

    // setData(data);
  };

  if (signed)
    return (
      <p>
        {"Conscentement validé le "} {update}
      </p>
    );

  if (!found) return <p>{"Aucun consentement trouvé"}</p>;

  return (
    <div>
      <div className="w-full mx-auto ">
        <div className=" rounded-lg p-2 mt-2 bg-primary flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Title
              title="Consentement pour le Traitement des Données Personnelles"
              back={false}
              size="lg:text-xl"
            />{" "}
          </div>
          ${name}
          <div className="flex flex-col justify-between items-center">
            <p className="text-sm text-center p-2">
              <span>{"Je, soussigné(e) "}</span>
              <span className="uppercase font-semibold">
                {rgpd?.rgdp?.person?.lastname} {rgpd?.rgdp?.person?.firstname}{" "}
              </span>{" "}
              {
                ", reconnais par la présente avoir été informé(e) par IMMO FINANCES MALAIN srl de la collecte et du traitement de mes données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la législation belge en vigueur."
              }
            </p>
            <p className="text-sm p-2">
              {
                "Je consens volontairement et librement au traitement de mes données personnelles aux fins suivantes :"
              }
              <span>
                {"Conseils et accompagnent en IMMOBILIER et ASSURANCES"}
              </span>
            </p>
          </div>
          <div className="w-full  lg:py-1 flex flex-col gap-2">
            <div className="flex gap-2 text-lg justify-center items-center border border-third rounded-lg p-2">
              <input
                checked={accord}
                type="checkbox"
                onChange={() => setAccord(!accord)}
              />
              <MyLabel title="Je comprends que je conserve le droit de retirer ce consentement à tout moment, sans que cela n'affecte la légalité du traitement basé sur le consentement avant son retrait." />
            </div>
            <div className="flex gap-2 text-lg justify-center items-center  border border-third rounded-lg p-2">
              <input
                checked={certifie}
                type="checkbox"
                onChange={() => setCertifie(!certifie)}
              />
              <MyLabel title="Je certifie que les informations que j'ai fournies à IMMO FINANCES MALAIN sont exactes et à jour." />
            </div>
          </div>
          {accord && certifie && (
            <button
              type="button"
              onClick={() => processRGPD()}
              className="bg-green-600 p-2 rounded-lg"
            >
              Confirmer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidateRGPD;
