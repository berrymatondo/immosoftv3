import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export const PUT = async (request: NextRequest, response: NextResponse) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/immos")[0];
  const immoId = path.split("clients/")[1].split("/immos/")[1];

  console.log("clientId: ", clientId);
  console.log("immoId: ", immoId);

  const {
    maritalStatus,
    salNet,
    salNetCo,
    chqRep,
    chqRepCo,
    autRev,
    autRevCo,
    prtTmp,
    prtTmpCo,
    autPrt,
    autPrtCo,
    immoStatus,
    anaDone,
    cahierCharge,

    offerDone,
    offerAccepted,
    rechercheBien,

    startDate,
    endDate,
    demandeCours,
    fileClosed,
    notes,
  } = await request.json();

  console.log("startDate: ", startDate, "endDate: ", endDate);

  const session = await getServerSession(authOptions);

  try {
    /*       const results = await prisma.assurance.findMany({
        where: {
          personId: +clientId,
        },
      }); */

    //    console.log("results", results);
    const userTmp: any = session?.user;
    const results = await prisma.immo.update({
      where: {
        id: +immoId,
      },
      data: {
        maritalStatus: maritalStatus,
        salNet,
        salNetCo,
        chqRep,
        chqRepCo,
        autRev,
        autRevCo,
        prtTmp,
        prtTmpCo,
        autPrt,
        autPrtCo,
        immoStatus,
        anaDone,
        cachierCharge: cahierCharge,

        offerDone,
        offerAccepted,
        rechercheBien,

        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,

        demandeCours,
        fileClosed,
        notes,
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
  const clientId = path.split("clients/")[1].split("/immos")[0];
  const immoId = path.split("clients/")[1].split("/immos/")[1];

  const session = await getServerSession(authOptions);

  try {
    const results = await prisma.assurance.delete({
      where: {
        id: +immoId,
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
