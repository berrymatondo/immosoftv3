//import { db } from "@/db";
//import { myusers, poles } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export const GET = async (request: NextRequest, response: NextResponse) => {
  //const url = new URL(request.url);
  // console.log("url", url);

  const path = request.nextUrl.pathname;
  // console.log("PATH", path);

  const clientId = path.split("rgpd/")[1];

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
