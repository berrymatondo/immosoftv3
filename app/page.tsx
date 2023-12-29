import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Ceci est un test en production ep 5
    </main>
  );
}
