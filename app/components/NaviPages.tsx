"use client";
import { useRouter } from "next/navigation";
import React from "react";
type NaviProps = {
  page: number;
  limit: number;
  total: number;
  search?: string;
  path: string;
};

const NaviPages = (props: NaviProps) => {
  const router = useRouter();

  return (
    <div className=" flex justify-end gap-4 text-xs">
      <button
        className={
          props.page == 1
            ? `p-2 rounded-lg bg-gray-400 text-gray-800 pointer-events-none`
            : `p-2 bg-hov rounded-lg hover:text-yellow-400`
        }
        onClick={() =>
          router.push(
            props.search
              ? `/${props.path}?page=${
                  props.page > 1 ? props.page - 1 : 1
                }&search=${props.search}`
              : `/${props.path}?page=${props.page > 1 ? props.page - 1 : 1}`
          )
        }
      >
        Précédent
      </button>
      <button
        className={
          props.total - props.page * props.limit < 0
            ? "p-2 rounded-lg bg-gray-400 text-gray-800 pointer-events-none"
            : "p-2 bg-hov rounded-lg hover:text-yellow-400"
        }
        onClick={() =>
          router.push(
            props.search
              ? `/${props.path}?page=${props.page + 1}&search=${props.search}`
              : `/${props.path}?page=${props.page + 1}`
          )
        }
      >
        Suivant
      </button>
    </div>
  );
};

export default NaviPages;
