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
    origin,
    notes,
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

export const GET = async (request: NextRequest, response: NextResponse) => {
  const url = new URL(request.url);

  const page = url.searchParams.get("page")
    ? Number(url.searchParams.get("page"))
    : 1;

  const limit = url.searchParams.get("limit")
    ? Number(url.searchParams.get("limit"))
    : 5;

  const search = url.searchParams.get("search")
    ? String(url.searchParams.get("search"))
    : "";
  //let para = url.searchParams.get("search");

  const taille = search?.length ?? 0;

  const skip = (page - 1) * limit;

  try {
    /*     const results = await prisma.person.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        mobile: true,
      },
      take: limit,
      skip: skip,
    });
    //console.log("ICI 5"); */

    let results;
    if (taille < 1) {
      results = await prisma.person.findMany({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          mobile: true,
          rgpd: true,
          assus: true,
          immos: true,
        },

        take: limit,
        skip: skip,
      });
    } else {
      results = await prisma.person.findMany({
        where: {
          OR: [
            {
              lastname: {
                contains: search!,
                mode: "insensitive",
              },
            },
            {
              firstname: {
                contains: search!,
                mode: "insensitive",
              },
            },
          ],
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          mobile: true,
          rgpd: true,
          assus: true,
          immos: true,
        },
        take: limit,
        skip: skip,
      });
    }

    //const count = await prisma.person.count();

    // console.log("results", results);

    /*     const results = await prisma.person.findMany({ 
      select: {
        id: true,
        firstname: true,
        lastname: true,

      },
    }); */

    // console.log("results: ", JSON.stringify(results));

    const path = request.nextUrl.pathname || "/";

    revalidatePath(path);

    return NextResponse.json({ message: "OK", results }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
