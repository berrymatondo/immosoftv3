"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdSupervisedUserCircle } from "react-icons/md";

type CardProps = {
  title: string;
  total: number;
  path: string;
  icon?: any;
  text: string;
};

const Card = (props: CardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(props.path)}
      className=" bg-secondary p-5 max-md:p-2 rounded-lg flex gap-5 hover:bg-hov hover:cursor-pointer w-full"
    >
      {/* <MdSupervisedUserCircle size={24} /> */}
      {props.icon}
      <div className="flex flex-col md:gap-3 w-full">
        <span className="">Total {props.title}</span>
        <span className="font-medium text-yellow-400">{props.total}</span>
        <span className="font-light text-sm">
          <span className="text-green-400 font-semibold"> </span>
          <span className="max-md:hidden">{props.text}</span>
        </span>
      </div>
    </div>
  );
};

export default Card;
