import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (request: NextRequest, response: NextResponse) => {
  //console.log("COUNNNNNNNNNNTTTTTTTTTTTTTTt");

  try {
    const count = await prisma.task.count();

    return NextResponse.json({ message: "OK", count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
