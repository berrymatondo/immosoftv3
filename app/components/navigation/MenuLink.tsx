"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type MenuLinkProps = {
  item: any;
};

const MenuLink = (props: MenuLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={props.item.path}
      className={
        pathname === props.item.path
          ? `flex items-center p-5 gap-2 hover:bg-[#2e374a] my-1 rounded-lg bg-[#2e374a]`
          : `flex items-center p-5 gap-2 hover:bg-[#2e374a] my-1 rounded-lg`
      }
    >
      {props.item.icon}
      {props.item.title}
    </Link>
  );
};

export default MenuLink;
