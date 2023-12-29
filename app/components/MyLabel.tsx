import React from "react";

type MyLabelProps = {
  title: string;
};

const MyLabel = (props: MyLabelProps) => {
  return (
    <label className="text-sm font-semibold m-1 text-third">
      {props.title}
    </label>
  );
};

export default MyLabel;
