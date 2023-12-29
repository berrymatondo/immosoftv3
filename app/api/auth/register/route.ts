import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const POST = async (request: NextRequest, response: NextResponse) => {
  const { username, email, password, isAdmin } = await request.json();

  const session = await getServerSession(authOptions);

  try {
    //Check if the email already exist
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (foundUser) return NextResponse.json({ message: "KO" }, { status: 200 });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const userTmp: any = session?.user;

    const user = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
        role: isAdmin ? "ADMIN" : "USER",
        username: userTmp.username ? userTmp.username : "",
        userId: userTmp.id ? parseInt(userTmp.id) : null,
      },
    });

    return NextResponse.json({ message: "OK", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
