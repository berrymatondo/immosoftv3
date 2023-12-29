import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export const PUT = async (request: NextRequest, response: NextResponse) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];
  const assuId = path.split("clients/")[1].split("/assus/")[1];

  const { type, status, comments } = await request.json();

  const session = await getServerSession(authOptions);

  try {
    /*       const results = await prisma.assurance.findMany({
        where: {
          personId: +clientId,
        },
      }); */

    //    console.log("results", results);
    const userTmp: any = session?.user;
    const results = await prisma.assurance.update({
      where: {
        id: +assuId,
      },
      data: {
        type: type,
        status: status,
        comments: comments,
        username: userTmp.username ? userTmp.username : "",
        userId: userTmp.id ? parseInt(userTmp.id) : null,
      },
    });

    //  console.log("{ type, status, comments }", { type, status, comments });

    return NextResponse.json({ message: "OK", results }, { status: 200 });
    //  return NextResponse.json({ message: "OK", results }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request: NextRequest, response: NextResponse) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];
  const assuId = path.split("clients/")[1].split("/assus/")[1];

  const session = await getServerSession(authOptions);

  try {
    const results = await prisma.assurance.delete({
      where: {
        id: +assuId,
      },
    });

    //  console.log("{ type, status, comments }", { type, status, comments });

    return NextResponse.json({ message: "OK", results }, { status: 200 });
    //  return NextResponse.json({ message: "OK", results }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
