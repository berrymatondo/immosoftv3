import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  //const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "username", type: "text", placeholder: "berry" },
        password: { label: "username", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        let checkPass: boolean = false;
        if (user) {
          //const hashedPassword = await bcrypt.hash(credentials.password, 10);

          // checkPass = await bcrypt.compare(hashedPassword, user.password);
          checkPass = await bcrypt.compare(credentials.password, user.password);

          if (!checkPass) {
            return null;
          }

          //console.log("user.usernam", user.username);

          return {
            id: user.id + "",
            role: user.role,
            email: user.email,
            username: user.name,
            createAt: user.createAt,
            updatedAt: user.updatedAt,
            userid: user.userId,
            usermaj: user.username,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
  //});
};
