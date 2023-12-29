"use client";
import MyLabel from "@/app/components/MyLabel";
import Title from "@/app/components/Title";
import { AssuStatus, AssuType, MaritalStatus, Person } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type ClientNewAssuPageProps = {
  params: {
    clientId: number;
  };
};

type Inputs = {
  denom: string;
  status: string;
  description?: string;
};

const AssuranceStatus = [
  { DV1: "DVA - A définir" },
  { DV2: "DVA - A définir" },
  { OFA: "OFA - Offre faite" },
  { OAC: "OAC - Offre acceptée" },
  { PCD: "PCD - Possède déjà" },
];

const inputStyle =
  "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov w-full";

const inputStyle2 =
  "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov";

const ClientNewImmoPage = ({ params }: ClientNewAssuPageProps) => {
  const [clientId, setClientId] = useState(params.clientId);
  const [client, setClient] = useState<Person>();
  const [maritalStatus, setMaritalStatus] = useState<string>("");
  const router = useRouter();
  // Amounts
  const [revenus, setRevenus] = useState(0);
  const [charges, setCharges] = useState(0);
  const [salNet, setSalNet] = useState(0);
  const [salNetCo, setSalNetCo] = useState(0);
  const [chqRep, setChqRep] = useState(0);
  const [chqRepCo, setChqRepCo] = useState(0);
  const [autRev, setAutRev] = useState(0);
  const [autRevCo, setAutRevCo] = useState(0);
  const [prtTmp, setPrtTmp] = useState(0);
  const [prtTmpCo, setPrtTmpCo] = useState(0);
  const [autPrt, setAutPrt] = useState(0);
  const [autPrtCo, setAutPrtCo] = useState(0);
  const [notes, setNotes] = useState("");

  const { data: session, status } = useSession();
  const tempo: any = session?.user;
  const val: any = tempo ? tempo?.role : "USER";
  //console.log("VAL: ", val);

  const [data, setData] = useState<Inputs>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchClient = async () => {
      const res = await fetch(`/api/clients/` + clientId, {
        cache: "no-store",
      });
      const data = await res.json();
      //console.log("CLIENT: ", data.client.maritalstatus);

      setClient(data.client);
      setMaritalStatus(data.client.maritalstatus);
    };

    fetchClient();
  }, [clientId]);

  useEffect(() => {
    //console.log("maritalStatus:", maritalStatus);

    if (maritalStatus == "C") {
      setRevenus(salNet + chqRep + autRev);
      setCharges(prtTmp + autPrt);
    } else {
      setRevenus(salNet + salNetCo + chqRep + chqRepCo + autRev + autRevCo);
      setCharges(prtTmp + prtTmpCo + autPrt + autPrtCo);
    }
  }, [
    salNet,
    salNetCo,
    chqRep,
    chqRepCo,
    autRev,
    autRevCo,
    prtTmp,
    prtTmpCo,
    autPrt,
    autPrtCo,
    maritalStatus,
  ]);

  const processForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("newAssu: ", newAssu);

    const newImmo = {
      maritalStatus: maritalStatus,
      salNet,
      salNetCo,
      chqRep,
      chqRepCo,
      autRev,
      autRevCo,
      prtTmp,
      prtTmpCo,
      autPrt,
      autPrtCo,
      notes: notes,
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newImmo),
    };
    console.log("newImmo", newImmo);

    try {
      //const res = await fetch(process.env.NEXT_PUBLIC_POLES_API!, options);
      //return null;
      const res = await fetch(`/api/clients/${params.clientId}/immos`, options);
      //   const data = await res.json();
      //   return data;

      if (res.ok) {
        toast.success("Dossier créé avec succès");
        router.push(`/clients/${params.clientId}`);
      }
    } catch (e) {
      return e;
    }

    // setData(data);
  };

  return (
    <div className="w-full mx-auto ">
      <div className=" rounded-lg p-2 mt-2 bg-primary">
        <div className="flex items-center gap-2">
          <Title
            title="Ajouter dossier immobilier"
            back={true}
            size="lg:text-xl"
          />{" "}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            {
              "Cette transaction permet d'ajouter un nouveau dossier immobilier à un client"
            }
          </p>
        </div>
        <form
          onSubmit={processForm}
          className="md:border md:border-hov rounded-lg md:p-2 mt-2  md:w-full"
        >
          <div className="flex items-center gap-2 max-md:flex-col">
            <div className="w-full  lg:py-1 flex flex-col">
              <MyLabel title="Nom" />
              <div className={inputStyle}>
                <span className=" font-bold uppercase md:w-full">
                  {client?.lastname}
                </span>
                <span className={" font-bold  md:w-full"}>
                  {" "}
                  {client?.firstname}
                </span>
              </div>
            </div>

            <div className="w-full max-md:w-1/2  lg:py-1 flex flex-col max-md: self-start">
              <MyLabel title="Etat civil" />
              <select
                name="maritalStatus"
                className={inputStyle}
                value={maritalStatus}
                //defaultValue={client?.maritalstatus}
                onChange={(e) => {
                  const c: any = Object.values(MaritalStatus)?.find(
                    (x: any) => x === e.target.value
                  );
                  // console.log("C:", c);

                  setMaritalStatus(c);
                  /*                   if (c == "C") {
                    setRevenus(salNet + chqRep + autRev);
                    setCharges(prtTmp + autPrt);
                  } else {
                    setRevenus(
                      salNet + salNetCo + chqRep + chqRepCo + autRev + autRevCo
                    );
                    setCharges(prtTmp + prtTmpCo + autPrt + autPrtCo);
                  } */
                }}
              >
                {/*                   <option value={userStatus}>{userStatus}</option>
                 */}{" "}
                {Object.values(MaritalStatus)
                  ? Object.values(MaritalStatus).map((userStatus: any) => {
                      return (
                        <option key={userStatus} value={userStatus}>
                          {userStatus == "C"
                            ? "Célibataire"
                            : "Marié(e)/En couple"}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
          </div>

          <div className=" flex items-start justify-between gap-2 mt-2 max-md:flex-col">
            <div className="min-w-1/2 w-full border border-third rounded-lg flex flex-col items-start gap-2 ">
              <div className="bg-green-800 flex justify-between md:w-full p-1 rounded-lg max-md:w-full">
                <MyLabel title="Revenus" />
                <span className="font-bold">{revenus} eur</span>
              </div>
              <div className="gap-1  w-full grid grid-cols-2">
                <div>
                  <div className="flex flex-col p-1">
                    <label> Salaire net</label>
                    <input
                      value={salNet}
                      onChange={(e) => {
                        setSalNet(+e.target.value);
                      }}
                      type="number"
                      className={inputStyle}
                    />
                  </div>
                  <div className="flex flex-col p-1">
                    <label> Chèques-repas</label>
                    <input
                      value={chqRep}
                      onChange={(e) => {
                        setChqRep(+e.target.value);
                      }}
                      type="number"
                      className={inputStyle}
                    />
                  </div>
                  <div className="flex flex-col p-1">
                    <label> Autres revenus</label>
                    <input
                      value={autRev}
                      onChange={(e) => {
                        setAutRev(+e.target.value);
                      }}
                      type="number"
                      className={inputStyle}
                    />
                  </div>
                </div>
                {maritalStatus == "M" && (
                  <div className=" w-full ">
                    <div className="flex flex-col p-1  w-full">
                      <label> Salaire net conjoint</label>
                      <input
                        value={salNetCo}
                        onChange={(e) => {
                          setSalNetCo(+e.target.value);
                        }}
                        type="number"
                        className={inputStyle}
                      />
                    </div>
                    <div className="flex flex-col p-1">
                      <label> Chèques-repas conjoint</label>
                      <input
                        value={chqRepCo}
                        onChange={(e) => {
                          setChqRepCo(+e.target.value);
                        }}
                        type="number"
                        className={inputStyle}
                      />
                    </div>
                    <div className="flex flex-col p-1">
                      <label> Autres revenus conjoint</label>
                      <input
                        value={autRevCo}
                        onChange={(e) => {
                          setAutRevCo(+e.target.value);
                        }}
                        type="number"
                        className={inputStyle}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="min-w-1/2 w-full border border-third rounded-lg flex flex-col items-start gap-2 ">
              <div className="bg-red-800 flex justify-between md:w-full p-1 rounded-lg max-md:w-full ">
                <MyLabel title="Charges" />
                <span className="font-bold">{charges} eur</span>
              </div>
              <div className="gap-1  w-full grid grid-cols-2">
                <div>
                  <div className="flex flex-col p-1">
                    <label> {"Prêt tempérament"}</label>
                    <input
                      value={prtTmp}
                      onChange={(e) => {
                        setPrtTmp(+e.target.value);
                      }}
                      type="number"
                      className={inputStyle}
                    />
                  </div>

                  <div className="flex flex-col p-1">
                    <label> {"Autres prêts"}</label>
                    <input
                      value={autPrt}
                      onChange={(e) => {
                        setAutPrt(+e.target.value);
                      }}
                      type="number"
                      className={inputStyle}
                    />
                  </div>
                </div>
                {maritalStatus == "M" && (
                  <div>
                    <div className="flex flex-col p-1">
                      <label> {"Prêt temp. conjoint"}</label>
                      <input
                        value={prtTmpCo}
                        onChange={(e) => {
                          setPrtTmpCo(+e.target.value);
                        }}
                        type="number"
                        className={inputStyle}
                      />
                    </div>
                    <div className="flex flex-col p-1">
                      <label> {"Autres prêts conjoint"}</label>
                      <input
                        value={autPrtCo}
                        onChange={(e) => {
                          setAutPrtCo(+e.target.value);
                        }}
                        type="number"
                        className={inputStyle}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full  lg:py-1 flex flex-col mt-2">
            <MyLabel title="Notes du dossier" />
            <textarea
              //{...register("description")}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className={inputStyle}
            />
          </div>
          <div className="flex justify-center gap-4 mt-4 rounded-lg px-2 py-1  ">
            <button
              type="button"
              onClick={() => router.back()}
              className="mt-4 border text-red-400 text-lg rounded-lg px-2 py-1 w-1/3"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="mt-4 bg-teal-800 hover:bg-teal-600 text-white text-lg rounded-lg px-2 py-1 w-1/3 "
            >
              Enregister
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientNewImmoPage;
