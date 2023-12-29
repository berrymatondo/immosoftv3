"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

type SearchProps = {
  placeholder: string;
  path: string;
  search?: string;
};

const Search = (props: SearchProps) => {
  const router = useRouter();
  const [text, setText] = useState(props.search ?? "");
  const [query] = useDebounce(text, 500);

  const pathTo = `/${props.path}?search=${query}`;
  //console.log("pathTo:", pathTo);

  //console.log("query:", query);

  const initialRender = useRef(true);

  useEffect(() => {
    /*     if (!query) router.push(`/clients`);
    else router.push(`/clients?search=${query}`); */

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      /*       if (!query) router.push(`/${props.path}`);
      else router.push(pathTo); */

      if (!query) router.push(`/${props.path}`);
      else router.push(`/${props.path}?search=${query}`);
    }
  }, [query, router, props.path]);

  return (
    <>
      <MdSearch />
      <input
        type="text"
        placeholder={props.placeholder}
        className="border-none text-white bg-transparent outline-0"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </>
  );
};

export default Search;
