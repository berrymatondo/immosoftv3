import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const PUT = async (request: NextRequest) => {
  const { username, oldemail, newemail, password, status, role } =
    await request.json();
  const session = await getServerSession(authOptions);
  try {
    //Check if the email already exist
    const foundUser = await prisma.user.findUnique({
      where: {
        email: newemail,
      },
    });

    if (foundUser && oldemail != newemail)
      return NextResponse.json({ message: "KO" }, { status: 200 });

    const userTmp: any = session?.user;

    let updateUser;
    // Hash password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      if (oldemail == newemail) {
        updateUser = await prisma.user.update({
          where: {
            email: oldemail,
          },
          data: {
            name: username,

            password: hashedPassword,
            status: status,
            role: role,
            //updatedAt: new Date(),
            username: userTmp.username ? userTmp.username : "",
            userId: userTmp.id ? parseInt(userTmp.id) : null,
          },
        });
      } else {
        updateUser = await prisma.user.update({
          where: {
            email: oldemail,
          },
          data: {
            name: username,

            email: newemail,
            password: hashedPassword,
            status: status,
            role: role,
            //updatedAt: new Date(),
            username: userTmp.username ? userTmp.username : "",
            userId: userTmp.id ? parseInt(userTmp.id) : null,
          },
        });
      }
    } else {
      if (oldemail == newemail) {
        updateUser = await prisma.user.update({
          where: {
            email: oldemail,
          },
          data: {
            name: username,

            status: status,
            role: role,
            updatedAt: new Date(),
            //username: userTmp.username ? userTmp.username : "",
            userId: userTmp.id ? parseInt(userTmp.id) : null,
          },
        });
      } else {
        updateUser = await prisma.user.update({
          where: {
            email: oldemail,
          },
          data: {
            name: username,

            email: newemail,
            status: status,
            role: role,
            //updatedAt: new Date(),
            username: userTmp.username ? userTmp.username : "",
            userId: userTmp.id ? parseInt(userTmp.id) : null,
          },
        });
      }
    }

    return NextResponse.json({ message: "OK", updateUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
