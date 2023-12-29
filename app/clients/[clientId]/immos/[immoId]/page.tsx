"use client";
import MyLabel from "@/app/components/MyLabel";
import Title from "@/app/components/Title";
import { Assurance, Immo, MaritalStatus, Person, Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Decimal } from "@prisma/client/runtime/library";
import { toast } from "sonner";

const inputStyle =
  "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov";

type ClientAssuPageProps = {
  params: {
    clientId: number;
    immoId: number;
  };
};

const ClientImmoPage = ({ params }: ClientAssuPageProps) => {
  const [immoId, setImmoId] = useState(params.immoId);
  const [clientId, setClientId] = useState(params.clientId);
  const [client, setClient] = useState<Person>();
  const [immo, setImmo] = useState<Immo>();
  const [task, setTask] = useState<Task>();
  const [showtech, setShowtech] = useState(false);
  const router = useRouter();

  const [immoStatus, setImmoStatus] = useState("");

  const [revenus, setRevenus] = useState<any>(0);
  const [charges, setCharges] = useState<any>(0);
  const [salNet, setSalNet] = useState<any>(0);
  const [salNetCo, setSalNetCo] = useState<any>(0);
  const [chqRep, setChqRep] = useState<any>(0);
  const [chqRepCo, setChqRepCo] = useState<any>(0);
  const [autRev, setAutRev] = useState<any>(0);
  const [autRevCo, setAutRevCo] = useState<any>(0);
  const [prtTmp, setPrtTmp] = useState<any>(0);
  const [prtTmpCo, setPrtTmpCo] = useState<any>(0);
  const [autPrt, setAutPrt] = useState<any>(0);
  const [autPrtCo, setAutPrtCo] = useState<any>(0);

  const [anaDone, setAnaDone] = useState(false);
  const [cahierCharge, setCahierCharge] = useState<string>("");

  const [offerDone, setOfferDone] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [rechercheBien, setRechercheBien] = useState<string>("");

  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [demandeCours, setDemandeCours] = useState<string>("");
  const [fileClosed, setFileClosed] = useState(false);

  const [notes, setNotes] = useState<string>("");
  const [maritalStatus, setMaritalStatus] = useState<string>("");

  const { data: session, status } = useSession();
  const tempo: any = session?.user;
  const val: any = tempo ? tempo?.role : "USER";

  useEffect(() => {
    /*     console.log("CLIENT ID", params.clientId);
    console.log("ASSU ID", params.assuId); */

    const fetchClient = async () => {
      const res = await fetch(`/api/clients/` + clientId, {
        cache: "no-store",
      });
      const data = await res.json();
      //console.log("CLIENT: ", data.client);

      setClient(data.client);

      const foundImmo: Immo = data.client.immos.find(
        (immo: Immo) => immo.id === +immoId
      );
      setImmo(foundImmo);
      console.log("foundImmo", foundImmo);

      const foundTask = data.client.task.find(
        (task: Task) => task.assuId === +immoId
      );
      setTask(foundTask);
      //setSalNet(1);
      /*     console.log("foundImmo.salNet:", foundImmo.salNet);
      console.log("foundImmo.chqRep:", foundImmo.chqRep);
      const sol = +foundImmo.salNet.toString() + +foundImmo.chqRep.toString();
      console.log("TOTAL: ", sol);
 */
      setMaritalStatus(foundImmo.maritalStatus);
      setSalNet(+foundImmo.salNet.toString());
      //  setSalNet(+foundImmo.salNet as unknown as number);
      setSalNetCo(+foundImmo.salNetCo.toString());
      setChqRep(+foundImmo.chqRep.toString());
      setChqRepCo(+foundImmo.chqRepCo.toString());
      setAutRev(+foundImmo.autRev.toString());
      setAutRevCo(+foundImmo.autRevCo.toString());
      setPrtTmp(+foundImmo.prtTmp.toString());
      setPrtTmpCo(+foundImmo.prtTmpCo.toString());
      setAutPrt(+foundImmo.autPrt.toString());
      setAutPrtCo(+foundImmo.autPrtCo.toString());

      setImmoStatus(foundImmo.immoStatus as string);

      setAnaDone(foundImmo.anaDone);
      setCahierCharge(
        foundImmo?.cachierCharge ? foundImmo?.cachierCharge : " "
      );

      setOfferDone(foundImmo.offerDone);
      setOfferAccepted(foundImmo.offerAccepted);
      setRechercheBien(
        foundImmo?.rechercheBien ? foundImmo?.rechercheBien : " "
      );

      setStartDate(foundImmo?.startDate?.toString().split("T")[0]);
      setEndDate(foundImmo?.endDate?.toString().split("T")[0]);
      setDemandeCours(foundImmo?.demandeCours ? foundImmo?.demandeCours : " ");
      setFileClosed(foundImmo.fileClosed);

      setNotes(foundImmo.notes as string);
    };

    fetchClient();
  }, [immoId, clientId]);

  useEffect(() => {
    //console.log("maritalStatus:", maritalStatus);
    /*     console.log("SalNet:", salNet);
    console.log("chqRep:", chqRep); */

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

  const createAction = async () => {
    const newAction = {
      description: immo?.notes,
      type: "IMMO",
      /*      personId: params.clientId,
      assuId: params.assuId, */
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAction),
    };

    try {
      //const res = await fetch(process.env.NEXT_PUBLIC_POLES_API!, options);
      //return null;
      const res = await fetch(
        `/api/clients/${params.clientId}/immos/${params.immoId}/action`,
        options
      );
      //   const data = await res.json();
      //   return data;

      if (res.ok) router.push(`/clients/${params.clientId}`);
    } catch (e) {
      return e;
    }

    // setData(data);
  };

  const fillImmoStatus = (sta: String) => {
    const stats = [
      { id: "NEW", wording: "Nouveau" },
      { id: "DEC", wording: "Demande en cours" },
      { id: "CLO", wording: "Dossier clôturé" },
      { id: "ARV", wording: "Attente retour vendeur" },
      { id: "RBI", wording: "Recherche du bien" },
    ];

    // const val = stats.find((stat) => stat.id === immo?.immoStatus);
    const val = stats.find((stat) => stat.id === sta);

    return val?.wording;
  };

  const processForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("newAssu: ", newAssu);

    const updateImmo = {
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
      immoStatus,
      anaDone,
      cahierCharge,

      offerDone,
      offerAccepted,
      rechercheBien,

      startDate,
      endDate,
      demandeCours,
      fileClosed,
      notes,
    };

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateImmo),
    };
    console.log("updateImmo", updateImmo);

    try {
      //const res = await fetch(process.env.NEXT_PUBLIC_POLES_API!, options);
      //return null;
      const res = await fetch(
        `/api/clients/${params.clientId}/immos/${params.immoId}`,
        options
      );
      //   const data = await res.json();
      //   return data;

      if (res.ok) {
        toast.success("Dossier mis à jour avec succès");
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
            title="Modifier dossier immobilier"
            back={true}
            size="lg:text-xl"
          />{" "}
        </div>
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-2">
          <p className="text-sm ">
            {
              "Cette transaction permet d'ajouter un nouveau dossier immobilier à un client"
            }
          </p>
        </div>
        <div className=" lg:py-1 flex max-md:self-end justify-end items-center ">
          <MyLabel title="Statut du dossier" />
          <label className="p-1 bg-hov rounded-lg text-lg font-bold text-yellow-400">
            {/* {fillImmoStatus()} */}
            {fillImmoStatus(immoStatus)}
          </label>
        </div>
        {/*         <input
          type="range"
          min={0}
          max={10}
          step={1}
          className="w-2/3 text-green-400 bg-red-400 shadow-red-600"
        /> */}
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
                      disabled={anaDone}
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
                      disabled={anaDone}
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
                      disabled={anaDone}
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
                        disabled={anaDone}
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
                        disabled={anaDone}
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
                        disabled={anaDone}
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

          <div
            className={
              anaDone
                ? `w-full  lg:py-1 flex flex-col mt-2 border border-green-400 rounded-lg`
                : `w-full  lg:py-1 flex flex-col mt-2 border border-yellow-400 rounded-lg`
            }
          >
            <MyLabel title="Détails cahier de charges" />
            <textarea
              value={cahierCharge}
              onChange={(e) => setCahierCharge(e.target.value)}
              disabled={anaDone}
              rows={4}
              className={inputStyle}
            />
            {/*             <textarea
              disabled={anaDone}
              value={cahierCharge}
              onChange={(e) => setCahierCharge(e.target.value)}
              rows={4}
              className={inputStyle}
            /> */}
            <div className="">
              <input
                checked={anaDone}
                onChange={(e) => {
                  setAnaDone(e.target.checked);
                  console.log("e.target.checked:", e.target.checked);

                  if (e.target.checked) setImmoStatus("RBI");
                  else setImmoStatus("NEW");
                }}
                type="checkbox"
                className={inputStyle}
                disabled={offerDone}
              />
              <label> {"Analyse faite ?"}</label>
            </div>
          </div>

          {anaDone && (
            <div
              className={
                offerAccepted
                  ? `w-full  lg:py-1 flex flex-col mt-2 border border-green-400 rounded-lg`
                  : `w-full  lg:py-1 flex flex-col mt-2 border border-yellow-400 rounded-lg`
              }
            >
              <MyLabel title="Recherche d'un bien" />
              <textarea
                value={rechercheBien}
                onChange={(e) => setRechercheBien(e.target.value)}
                disabled={offerAccepted}
                rows={4}
                className={inputStyle}
              />

              <div className="">
                <input
                  checked={offerDone}
                  onChange={(e) => {
                    setOfferDone(e.target.checked);

                    if (e.target.checked) setImmoStatus("ARV");
                    else setImmoStatus("RBI");
                  }}
                  type="checkbox"
                  className={inputStyle}
                  disabled={offerAccepted}
                />
                <label> {"Offre faite ?"}</label>
              </div>

              <div className="">
                <input
                  checked={offerAccepted}
                  onChange={(e) => {
                    setOfferAccepted(e.target.checked);

                    if (e.target.checked) setImmoStatus("DEC");
                    else setImmoStatus("ARV");
                  }}
                  type="checkbox"
                  className={inputStyle}
                  disabled={(anaDone && !offerDone) || fileClosed}
                />
                <label> {"Offre acceptée ?"}</label>
              </div>
            </div>
          )}

          {offerAccepted && (
            <div
              className={
                fileClosed
                  ? `w-full  lg:py-1 flex flex-col mt-2 border border-green-400 rounded-lg`
                  : `w-full  lg:py-1 flex flex-col mt-2 border border-yellow-400 rounded-lg`
              }
            >
              <MyLabel title="Demande en cours" />

              <div className="flex justify-between mt-2">
                <div className="">
                  <MyLabel title="Début clause" />
                  <input
                    defaultValue={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      const d3 = new Date(
                        new Date(e.target.value).getTime() +
                          28 * 24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .split("T")[0];

                      setEndDate(d3);

                      /* if (e.target.checked) setImmoStatus("ARV");
                    else setImmoStatus("RBI"); */
                    }}
                    type="date"
                    className={inputStyle}
                    disabled={fileClosed}
                  />
                </div>

                <div className="">
                  <MyLabel title="Fin clause" />
                  <input
                    defaultValue={endDate}
                    //  onChange={(e) => {
                    //    setEndDate(e.target.value);

                    /* if (e.target.checked) setImmoStatus("ARV");
                    else setImmoStatus("RBI"); */
                    //}}
                    type="date"
                    className={inputStyle}
                    disabled
                  />
                </div>
              </div>

              <textarea
                value={demandeCours}
                onChange={(e) => setDemandeCours(e.target.value)}
                disabled={fileClosed}
                rows={4}
                className={inputStyle}
              />

              <div className="">
                <input
                  checked={fileClosed}
                  onChange={(e) => {
                    setFileClosed(e.target.checked);

                    if (e.target.checked) setImmoStatus("CLO");
                    else setImmoStatus("DEC");
                  }}
                  type="checkbox"
                  className={inputStyle}
                  //disabled={anaDone && !offerDone}
                />
                <label> {"Clôturer dossier ?"}</label>
              </div>
            </div>
          )}

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
              onClick={() => createAction()}
              type="button"
              className="mt-4 bg-purple-800 hover:bg-purple-600 text-white text-lg rounded-lg px-2 py-1 w-1/3 "
            >
              Créer Action
            </button>
            <button
              type="submit"
              className="mt-4 bg-teal-800 hover:bg-teal-600 text-white text-lg rounded-lg px-2 py-1 w-1/3 "
            >
              Enregister
            </button>
          </div>
        </form>
        <div
          onClick={() => setShowtech(!showtech)}
          className="hover:cursor-pointer hover:bg-hov hover:rounded-lg text-sm  p-2 mt-2 w-1/2 mx-auto  max-md:w-full"
        >
          <p className="text-center text-yellow-400 mb-2">Segment technique</p>
          {showtech && (
            <>
              {" "}
              <p>
                Utilisateur:<strong> {immo?.username}</strong>
              </p>
              <p>
                Création: <strong>{immo?.createAt.toString()}</strong>
              </p>
              <p>
                Dernière modification:{" "}
                <strong>{immo?.updatedAt.toString()}</strong>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientImmoPage;
