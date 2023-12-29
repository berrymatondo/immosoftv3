//import { db } from "@/db";
//import { myusers, poles } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export const POST = async (request: NextRequest, response: NextResponse) => {
  const { assudenom, assustatus, description } = await request.json();
  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];
  // console.log("ASSURANCE clientId vaut:", clientId);
  // console.log("obj", { assudenom, assustatus, description });

  const session = await getServerSession(authOptions);

  try {
    const userTmp: any = session?.user;
    const assus = await prisma.assurance.create({
      data: {
        type: assudenom,
        status: assustatus,
        comments: description,
        personId: +clientId,
        username: userTmp.username ? userTmp.username : "",
        userId: userTmp.id ? parseInt(userTmp.id) : null,
      },
    });

    return NextResponse.json({ message: "OK", assus }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const GET = async (request: NextRequest, response: NextResponse) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];

  try {
    const results = await prisma.assurance.findMany({
      where: {
        personId: +clientId,
      },
    });

    //    console.log("results", results);

    return NextResponse.json({ message: "OK", results }, { status: 200 });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
