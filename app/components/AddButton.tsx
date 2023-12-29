"use client";
import { useRouter } from "next/navigation";
import React from "react";

type AddButtonProps = {
  path: string;
  text: string;
};

const AddButton = (props: AddButtonProps) => {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push(props.path)}
        className="max-md:hidden bg-teal-800 text-white rounded-lg p-2 hover:bg-teal-600 hover:text-gray-200"
      >
        {props.text}
      </button>
      <button
        onClick={() => router.push(props.path)}
        className="md:hidden bg-teal-800 text-white rounded-full py-1 px-3 hover:bg-teal-600 hover:text-gray-200"
      >
        +
      </button>
    </>
  );
};

export default AddButton;
