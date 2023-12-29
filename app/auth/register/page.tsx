import { authOptions } from "@/utils/authOptions";
import RegisterForm from "./form";
import { getServerSession } from "next-auth";

import Title from "@/app/components/Title";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full mx-auto  ">
      <div className=" rounded-lg p-2 mt-2 bg-primary">
        <div className="flex items-center gap-2">
          <Title title="Nouvel utilisateur" back={true} size="lg:text-xl" />{" "}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            {
              "Cette transaction permet d'ajouter un nouvel utilisateur dans le système"
            }
          </p>
        </div>

        <RegisterForm session={session} />
      </div>
    </div>
  );
};

export default RegisterPage;
