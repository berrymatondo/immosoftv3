import { authOptions } from "@/utils/authOptions";
//import Header from "../components/Header";
//import Login from "../components/Login";
import RegisterForm from "./form";
import { getServerSession } from "next-auth";

import { FaHouseDamage } from "react-icons/fa";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      {/*       <Login session={session} />
       */}{" "}
      <div className="max-w-[400px] mx-auto">
        {/*         <div className=" flex justify-center text-6xl">
          <span className="text-third">
            <FaHouseDamage />
          </span>
        </div> */}
        <RegisterForm session={session} />
      </div>
    </>
  );
};

export default RegisterPage;
