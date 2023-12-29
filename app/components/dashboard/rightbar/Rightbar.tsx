import Image from "next/image";
import React from "react";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className="fixed">
      <div className="bg-gradient-to-t from-[#182237] to-[#253352] p-5 mr-5 rounded-lg">
        {/*         <div>
          <Image src="/noavatar.png" alt="" fill />
        </div> */}
        <div className="flex flex-col gap-6">
          <span className="font-bold">🔥 Disponible</span>
          <h3 className="font-sm text-third">
            How to use the new version of admin dashboard?
          </h3>
          <span>Take 4 minutes to learn</span>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
            adipisci, sequi eveniet qui quas tempore esse, doloremque aliquid
            unde ipsum dolorem fugiat, optio inventore dolorum ex atque
            similique saepe! Saepe?
          </p>
          <button className="flex items-center bg-purple-400 text-white border-none rounded-lg p-2 max-x-max">
            <MdPlayCircleFilled /> Watch
          </button>
        </div>
      </div>
      <div>
        <div>
          <span>🔥 Disponible</span>
          <h3>How to use the new version of admin dashboard?</h3>
          <span>Take 4 minutes to learn</span>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
            adipisci, sequi eveniet qui quas tempore esse, doloremque aliquid
            unde ipsum dolorem fugiat, optio inventore dolorum ex atque
            similique saepe! Saepe?
          </p>
          <button>
            <MdReadMore /> Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
