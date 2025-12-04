"use client"
import { authClient } from "@/lib/auth-client";

export default async function seed() {

  const { error } = await authClient.signUp
    .email({
      email: "Admin@ptit.school",
      password: "Admin123",
      name: "Admin",
      role: "Admin"
    })
  
  if (error) alert(error.message)
}