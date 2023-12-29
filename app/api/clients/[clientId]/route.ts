import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export const GET = async (request: NextRequest, response: NextResponse) => {
  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];
  //console.log("clientId vaut:", clientId);

  try {
    const client = await prisma.person.findUnique({
      where: {
        id: +clientId,
      },
      include: {
        immos: true,
        assus: true,
        task: true,
      },
    });

    // console.log("READ client:", client);

    return NextResponse.json({ message: "OK", client }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (request: NextRequest, response: NextResponse) => {
  const path = request.nextUrl.pathname;
  const clientId = path.split("clients/")[1].split("/assus")[0];

  const {
    firstName,
    lastName,
    email,
    gender,
    maritalStatus,
    birthdate,
    mobile,
    address,
    notes,
  } = await request.json();

  const session = await getServerSession(authOptions);

  try {
    const userTmp: any = session?.user;
    const client = await prisma.person.update({
      where: {
        id: +clientId,
      },
      data: {
        email: email,
        notes: notes,
        firstname: firstName,
        lastname: lastName,
        gender: gender,
        maritalstatus: maritalStatus,
        birthday: new Date(birthdate),
        mobile: mobile,
        address: address,
        // createAt: new Date(),
        // updatedAt: new Date(),
        username: userTmp.username ? userTmp.username : "",
        userId: userTmp.id ? parseInt(userTmp.id) : null,
      },
    });

    //console.log("READ client:", client);

    return NextResponse.json({ message: "OK", client }, { status: 200 });
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
