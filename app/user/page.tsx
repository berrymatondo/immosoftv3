"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Header from "../components/Header";
import Login from "../components/Login";
import Title from "../components/Title";
import { Role, User, UserStatus } from "@prisma/client";

const UpdateUser = () => {
  const { data: session, status, update } = useSession();
  //const val: any = session?.user;

  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);
  const [oldemail, setOldEmail] = useState<any>("");
  const [selectedEmail, setSelectedEmail] = useState<any>("");
  const [username, setUsername] = useState<any>("");
  const [userStatus, setUserStatus] = useState<any>("");
  const [role, setRole] = useState<any>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [savedemail, setSavedemail] = useState<string>("");
  const [creationDate, setCreationDate] = useState<string>("");
  const [updateDate, setUpdateDate] = useState<string>("");
  const [userMaj, setUserMaj] = useState<string>("");
  const [showAudit, setShowAudit] = useState<boolean>(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users", {
        cache: "no-store",
      });
      const data = await res.json();
      setUsers(data.results);
      // console.log("DATA", data.results);
    };

    fetchUsers();
  }, []);

  const HandleConfirmer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/updateuser", {
        method: "PUT",
        body: JSON.stringify({
          username: formData.get("username"),
          oldemail: savedemail,
          newemail: formData.get("newemail"),
          password: formData.get("password"),
          status: formData.get("userstatus"),
          role: formData.get("role"),
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      if (data.message === "KO") {
        setErrorMsg("Cet email est déjà utilisé");
      } else {
        await update({ username });
        router.push("/clients");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //console.log("ROLES: ", Object.values(Role));

  return (
    <div>
      {/*       <Login session={session} />
      {!session ? <span>Not connected</span> : <span>Utilisateurs</span>} */}

      <form
        onSubmit={HandleConfirmer}
        className="flex flex-col justify-start items-center"
      >
        <div className="self-center">
          <Title
            title="Mettre à jour utilisateur"
            back={false}
            size="text-3xl"
          />
        </div>

        <div className="text-lg  border rounded-lg w-full p-2 ">
          <div className="w-full  py-2 flex flex-col">
            <label className=" m-1 text-secondary font-bold">Utilisateur</label>
            <select
              className="p-1 rounded-lg text-secondary font-semibold "
              name="oldemail"
              onChange={(e) => {
                if (!+e.target.value) {
                  setSelectedEmail("");
                  setUsername("");
                } else {
                  const c: any = users?.find(
                    (x: any) => x.id === +e.target.value
                  );

                  //       console.log("c", c);

                  setSavedemail(c.email);

                  setOldEmail(c.email);
                  setSelectedEmail(c.email);
                  setUsername(c.name);
                  setRole(c.role);
                  setUserStatus(c.status);
                  setCreationDate(c.createAt);
                  setUpdateDate(c.updatedAt);
                  setUserMaj(c.username);
                }
              }}
            >
              <option value={oldemail}>Sélectionner un utilisateur</option>
              {users
                ? users.map((user: User) => {
                    return (
                      <option key={user.id} value={user.id}>
                        {user.name} - {user.email} -{user.role} +
                        <p
                          className={
                            user.role === "USER" ? `text-red-600` : `text-black`
                          }
                        >
                          {user.role}
                        </p>
                      </option>
                    );
                  })
                : null}
              {/*               <option value="empty"></option>
               */}{" "}
            </select>

            {selectedEmail && (
              <div className="w-full  py-2 flex flex-col">
                <label className="font-semibold m-1">Email</label>
                <input
                  onChange={(e) => {
                    setErrorMsg("");
                    setSelectedEmail(e.target.value);
                  }}
                  className="text-blue-900 rounded-full p-2 mb-2 border bg-white "
                  type="email"
                  name="newemail"
                  // disabled={val ? true : false}
                  required
                  value={selectedEmail}
                />{" "}
              </div>
            )}

            {selectedEmail && (
              <div className="w-full  py-2 flex flex-col">
                <label className="font-semibold m-1">
                  {"Nom d'utilisateur"}
                </label>
                <input
                  onChange={(e) => {
                    setErrorMsg("");
                    setUsername(e.target.value);
                  }}
                  className="text-blue-900 rounded-full p-2 mb-2 border bg-white "
                  type="text"
                  // disabled={val ? true : false}
                  required
                  value={username}
                  name="username"
                />{" "}
              </div>
            )}

            {selectedEmail && (
              <div className="w-full  py-2 flex flex-col">
                <label className="font-semibold m-1">{"Statut"}</label>
                <select
                  name="userstatus"
                  className="p-1 rounded-lg text-blue-950"
                  value={userStatus}
                  onChange={(e) => {
                    const c: any = Object.values(UserStatus)?.find(
                      (x: any) => x === e.target.value
                    );

                    setUserStatus(c);
                  }}
                >
                  {/*                   <option value={userStatus}>{userStatus}</option>
                   */}{" "}
                  {Object.values(UserStatus)
                    ? Object.values(UserStatus).map((userStatus: any) => {
                        return (
                          <option key={userStatus} value={userStatus}>
                            {userStatus}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            )}

            {selectedEmail && (
              <div className="w-full  py-2 flex flex-col">
                <label className="font-semibold m-1">{"Rôle"}</label>
                <select
                  className="p-1 rounded-lg text-blue-950"
                  name="role"
                  onChange={(e) => {
                    const c: any = Object.values(Role)?.find(
                      (x: any) => x === e.target.value
                    );

                    setRole(c);
                  }}
                >
                  <option value={role}>{role}</option>
                  {Object.values(Role)
                    ? Object.values(Role).map((role: any) => {
                        return (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            )}

            {selectedEmail && (
              <div className="w-full  py-2 flex flex-col">
                <label className="font-semibold m-1">
                  Nouveau mot de passe
                </label>
                <input
                  onChange={(e) => {
                    setErrorMsg("");
                    setPassword(e.target.value);
                  }}
                  className="text-blue-900 rounded-full p-2 mb-2 border bg-white "
                  type={show ? "text" : "password"}
                  name="password"
                  // disabled={val ? true : false}
                  //required
                  value={password}
                />{" "}
                {password && (
                  <p
                    className="text-center text-sm p-1 bg-white border rounded-full hover:cursor-pointer hover:bg-secondary"
                    onClick={() => setShow(!show)}
                  >
                    {show
                      ? "Cacher le mot de passe"
                      : "Afficher le mot de passe"}
                  </p>
                )}
              </div>
            )}
          </div>
          {/* 
          {!val && (
            <div className="w-full  py-2 flex flex-col">
              <label className="font-semibold m-1">Mot de passe</label>
              <input
                onChange={(e) => {
                  setErrorMsg("");
                  setPassword(e.target.value);
                }}
                className="text-blue-900 rounded-full p-2 mb-2 border bg-white"
                type="password"
                required
              />
              
            </div>
          )} */}

          {errorMsg && (
            <div className="w-full  py-2 flex flex-col">
              <label className="text-red-400">{errorMsg}</label>
            </div>
          )}
          {selectedEmail && (
            <div className="self-end flex flex-col justify-center gap-2 mt-4">
              <button
                onClick={() => {
                  //window.location.reload();
                  //setSelectedEmail("");
                  //setOldEmail("empty");
                  //router.refresh();
                  router.push("/");
                }}
                type="button"
                className="border font-semibold text-red-600 text-lg rounded-lg px-2 py-1 w-full"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-third font-semibold text-white text-lg rounded-lg px-2 py-1 w-full"
              >
                Mettre à jour
              </button>
            </div>
          )}
          {selectedEmail && (
            <div className="bg-slate-200 rounded-lg text-xs my-2">
              <p
                onClick={() => setShowAudit(!showAudit)}
                className="text-center font-semibold p-1"
              >
                {"Voir l'audit"}
              </p>
              {showAudit && (
                <div className="flex flex-col my-2">
                  <p className="text-center">Mis à jour par: {userMaj}</p>
                  <p className="text-center">
                    Date de création: {creationDate}
                  </p>
                  <p className="text-center">
                    Dernière modification: {updateDate}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
