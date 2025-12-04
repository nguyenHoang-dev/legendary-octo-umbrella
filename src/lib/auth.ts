import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,

  },
  user: {
    modelName: "TaiKhoan",
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "Student",
        required: true,
      }
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    }
  },

  // databaseHooks: {
  //   user: {
  //     create: {
  //       after: async (user) => {
  //         try {
  //           switch (user.role) {
  //             case "Student": {
  //               await prisma.sinhVien.create({
  //                 data: {

  //                 }
  //               })
  //             }
  //           }
  //         } catch (error) {
            
  //         }
  //       }
  //     }
  //   }
  // },

  plugins: [nextCookies()]
})