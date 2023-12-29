//import { db } from "@/db";
//import { myusers, poles } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

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
    /*     
    
      id       Int     @id @default(autoincrement())
  comments    String?
  status AssuStatus
  type AssuType
  createAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId Int?
  username String?
  personId Int
  person Person @relation(fields: [personId], references: [id])
  task Task[]
    
    ; */

    let results;
    if (taille < 1) {
      results = await prisma.immo.findMany({
        select: {
          id: true,
          immoStatus: true,
          endDate: true,
          notes: true,
          person: true,
        },

        take: limit,
        skip: skip,
      });
    } else {
      results = await prisma.immo.findMany({
        where: {
          OR: [
            /*             {
              reference: {
                contains: search!,
                mode: "insensitive",
              },
            }, */
            {
              person: {
                firstname: {
                  contains: search!,
                  mode: "insensitive",
                },
              },
            },
            {
              person: {
                lastname: {
                  contains: search!,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        select: {
          id: true,
          immoStatus: true,
          endDate: true,
          notes: true,
          person: true,
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

    // console.log("request.nextUrl.searchParams:", request.nextUrl.pathname);

    const path = request.nextUrl.pathname || "/";
    // console.log("PAth vaut:", path);

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
