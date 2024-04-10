import { db } from "@/lib/utils";
import { NextResponse } from "next/server";
import {hash } from "bcrypt"
import * as z from "zod"
const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must have than 8 characters'),
  })

export async function POST(req:Request) {
    try {
        const body = await req.json()
        const { email, password, username} = userSchema.parse(body);
        const emailExists = await db.user.findUnique({
            where:{email:email}
        })
        if(emailExists) {
            return NextResponse.json({user:null, message: " User with this email ID already exists"},{status:409})
        }
        const usernameExists = await db.user.findUnique({
            where:{username:username}
        })
        if(usernameExists) {
            return NextResponse.json({user:null, message: " User with this username already exists"},{status:409})
        }
        const hashedPassword = await hash(password,10)
        const newUser = await db.user.create({
            data:{
                username, password:hashedPassword, email
            }
        })
        const { password: newUserPassword, ...rest}= newUser
        return NextResponse.json({user:rest, message:"User created successfully"}, {status:201})
    } catch (error) {
        return NextResponse.json({message:"User not created. Something went wrong!"}, {status:500})

    }
}