//import { db } from "@/db";
//import { myusers, poles } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export const POST = async (request: NextRequest, response: NextResponse) => {
  const { description, type } = await request.json();
  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/immos")[0];
  const immoId = path.split("immos/")[1].split("/action")[0];
  //console.log("ASSURANCE clientId vaut:", clientId);
  //console.log("ASSURANCE assuid vaut:", immoId);
  // console.log("obj", { assudenom, assustatus, description });

  const session = await getServerSession(authOptions);

  try {
    const userTmp: any = session?.user;
    const immo = await prisma.task.create({
      data: {
        description: description,
        type: "IMMO",
        personId: +clientId,
        immoId: +immoId,

        username: userTmp.username ? userTmp.username : "",
        userId: userTmp.id ? parseInt(userTmp.id) : null,
      },
    });

    return NextResponse.json({ message: "OK", immo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
