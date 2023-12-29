export async function getAllImmos(
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
  //console.log("search:", search);

  let res;
  if (search)
    res = await fetch(
      `/api/immos?page=${page}&limit=${limit}&search=${search}`,
      {
        cache: "no-store",
      }
    );
  else
    res = await fetch(`/api/immos?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });
  const data = await res.json();

  //console.log("DONNEES", data.results);

  return data.results;
}

export async function totalImmos(fromFront: boolean) {
  // console.log("Call total clients");

  let path = process.env.IMMOS_API_TOTAL!;
  if (fromFront) path = "/api/immos/total";
  const res = await fetch(path, {
    cache: "no-store",
  });

  const data = await res.json();
  //console.log("TOTO", data);

  return data.count;
}
