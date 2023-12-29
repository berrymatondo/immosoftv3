import React from "react";

type AssuAddModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
const AssuAddModal = ({ isVisible, onClose }: AssuAddModalProps) => {
  if (!isVisible) return null;

  const handleOnClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="w-[600px] flex flex-col">
        <button
          onClick={onClose}
          className="text-red-400 font-bold text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-yellow-400 p-2 rounded-lg">AssuAddModal</div>
      </div>
    </div>
  );
};

export default AssuAddModal;
