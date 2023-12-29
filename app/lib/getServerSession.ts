import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";

export default async function getSes() {
  const session = await getServerSession(authOptions);
  return session;
}
