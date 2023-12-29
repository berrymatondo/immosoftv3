//import { db } from "@/db";
//import { myusers, poles } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export const POST = async (request: NextRequest, response: NextResponse) => {
  const { clientId, checksum, signed } = await request.json();

  // const session = await getServerSession(authOptions);

  //console.log("LOOOOGGGGGGGGGGGGG obj:", { clientId, checksum, signed });

  try {
    //   const userTmp: any = session?.user;
    const assus = await prisma.rgpd.create({
      data: {
        personId: clientId,
        checksum: checksum,
        signed: signed,
      },
    });

    //console.log("ASSSSSSS:", assus);

    return NextResponse.json({ message: "OK", assus }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const GET = async (request: NextRequest, response: NextResponse) => {
  //const url = new URL(request.url);

  const path = request.nextUrl.pathname;
  const clientId = path.split("rgpd/")[1].split("/checksum")[0];

  //console.log("clientId: " + clientId);
  //console.log("cchecksum: " + checksumId);

  try {
    const rgdp = await prisma.rgpd.findUnique({
      where: {
        personId: +clientId,
      },
    });

    //console.log("results", rgdp);

    return NextResponse.json({ message: "OK", rgdp }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
