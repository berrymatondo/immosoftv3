import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export const PUT = async (request: NextRequest, response: NextResponse) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  //const clientId = path.split("clients/")[1].split("/assus")[0];
  //const assuId = path.split("clients/")[1].split("/assus/")[1];
  const taskId = path.split("actions/")[1];

  const { done, description } = await request.json();

  const session = await getServerSession(authOptions);

  try {
    /*       const results = await prisma.assurance.findMany({
        where: {
          personId: +clientId,
        },
      }); */

    /*     console.log("taskId", taskId);
    console.log("DONE", done);
    console.log("description", description); */
    const userTmp: any = session?.user;
    const results = await prisma.task.update({
      where: {
        id: +taskId,
      },
      data: {
        done: done,
        description: description,
        username: userTmp.username ? userTmp.username : "",
        userId: userTmp.id ? parseInt(userTmp.id) : null,
      },
    });

    //  console.log("{ type, status, comments }", { type, status, comments });
    //const results = { tt: "OK" };

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

export const GET = async (request: NextRequest, response: NextResponse) => {
  const path = request.nextUrl.pathname;
  const actionId = path.split("actions/")[1];
  //console.log("actionId vaut:", actionId);

  try {
    const action = await prisma.task.findUnique({
      where: {
        id: +actionId,
      },
      include: {
        person: true,
      },
    });

    // console.log("READ action:", action);

    return NextResponse.json({ message: "OK", action }, { status: 200 });
  } catch (error) {
    // console.log("error", error);

    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request: NextRequest, response: NextResponse) => {
  const path = request.nextUrl.pathname;
  const actionId = path.split("actions/")[1];
  //console.log("actionId vaut:", actionId);

  try {
    const results = await prisma.task.delete({
      where: {
        id: +actionId,
      },
    });

    // console.log("READ action:", action);

    return NextResponse.json({ message: "OK", results }, { status: 200 });
  } catch (error) {
    //console.log("error", error);

    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
