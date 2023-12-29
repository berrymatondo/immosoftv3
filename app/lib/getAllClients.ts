//export async function getAllclients(search: string) {
export async function getAllclients(
  page: number,
  limit: number,
  search?: string
) {
  //let res: any;

  /*   if (search.length === 0) {
    res = await fetch(`http://127.0.0.1:3000/api/clients`, {
      cache: "no-store",
    });
  } else {
    res = await fetch(`http://127.0.0.1:3000/api/clients?search=${search}`, {
      cache: "no-store",
    });
  } */

  let res;
  if (search)
    res = await fetch(
      //`http://127.0.0.1:3000/api/clients?page=${page}&limit=${limit}&search=${search}`,
      `/api/clients?page=${page}&limit=${limit}&search=${search}`,
      {
        cache: "no-store",
      }
    );
  else
    res = await fetch(`/api/clients?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });
  const data = await res.json();

  //console.log("DONNEES", data.results);

  return data.results;
}

export async function totalClients(fromFront: boolean) {
  // console.log("Call total clients");

  let path = process.env.CLIENTS_API_TOTAL!;
  if (fromFront) path = "/api/clients/total";
  const res = await fetch(path, {
    cache: "no-store",
  });

  const data = await res.json();
  //console.log("TOTO", data);

  return data.count;
}

export async function getClientById(id: string) {
  //  console.log("Get client", id);

  const res = await fetch(`/api/clients/total`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.count;
}
