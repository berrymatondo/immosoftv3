"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

type TitleProps = {
  title: string;
  back: boolean;
  force?: string;
  size: string;
};

const Title = (props: TitleProps) => {
  const router = useRouter();
  const titleSize = "font-bold " + props.size;

  const handleOnClick = () => {
    if (props.force) {
      router.push(props.force);
    } else {
      if (props.back) {
        router.back();
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="flex items-center text-yellow-400 text-xl my-2 ">
      {props.back && (
        <span className="text-[#38BDF8] text-2xl mr-4" onClick={handleOnClick}>
          <BiArrowBack />
        </span>
      )}
      <p className={titleSize}>{props.title}</p>
    </div>
  );
};

export default Title;
