import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export const GET = async (request: NextRequest, response: NextResponse) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  const clientId = path.split("rgpd/")[1].split("/checksum")[0];
  const checksumId = path.split("checksum/")[1];

  //console.log("clientId: " + clientId);
  //console.log("cchecksum: " + checksumId);

  try {
    const rgdp = await prisma.rgpd.findUnique({
      where: {
        personId: +clientId,
        checksum: +checksumId,
      },
      include: {
        person: true,
      },
    });

    //console.log("results", rgdp);

    return NextResponse.json({ message: "OK", rgdp }, { status: 200 });
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

export const PUT = async (request: NextRequest, response: NextResponse) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  const clientId = path.split("rgpd/")[1].split("/checksum")[0];
  const checksumId = path.split("checksum/")[1];

  // const { type, status, comments } = await request.json();

  //const session = await getServerSession(authOptions);

  try {
    /*       const results = await prisma.assurance.findMany({
        where: {
          personId: +clientId,
        },
      }); */

    //    console.log("results", results);
    //const userTmp: any = session?.user;
    const results = await prisma.rgpd.update({
      where: {
        personId: +clientId,
        checksum: +checksumId,
      },
      data: {
        signed: true,
      },
    });

    //  console.log("{ type, status, comments }", { type, status, comments });

    return NextResponse.json({ message: "OK", results }, { status: 200 });
    //  return NextResponse.json({ message: "OK", results }, { status: 200 });
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
