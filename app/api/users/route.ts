import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const results = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createAt: true,
        updatedAt: true,
        userId: true,
        username: true,
      },
    });

    //console.log("results: ", JSON.stringify(results));

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
