//import { db } from "@/db";
//import { myusers, poles } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export const POST = async (request: NextRequest, response: NextResponse) => {
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
    origin,
  } = await request.json();

  const session = await getServerSession(authOptions);

  try {
    //Check if the email already exist
    /*     const foundUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (foundUser) return NextResponse.json({ message: "KO" }, { status: 200 }); */

    // Hash password

    const userTmp: any = session?.user;

    /*     console.log("beforrrrrrreeeee", {
      firstName,
      lastName,
      email,
      gender,
      maritalStatus,
      birthdate,
      mobile,
      notes,
    }); */

    const user = await prisma.person.create({
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
        origin: origin,
        // createAt: new Date(),
        // updatedAt: new Date(),
        username: userTmp.username ? userTmp.username : "",
        userId: userTmp.id ? parseInt(userTmp.id) : null,
      },
    });

    // console.log("Apres", user);

    return NextResponse.json({ message: "OK", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
