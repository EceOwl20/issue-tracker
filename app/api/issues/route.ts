import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import prisma from "@/prisma/client";

//an object that defines the shape of object and the body of our request 
const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

//we have to validate our request to make sure it doesnt't have bad data
//for data validation we use zode --> npm i zod@3.22.2
export async function POST(request:NextRequest){
    const body = await request.json(); //it returns promise so waited to get the body of requst
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.errors, {status:400})
        //400 bad request meaning: client sent invalid data 
    }

    //if request is valid we should store this issue in our database,
    // to do that we have to import Prisma client 
    //--> go to this site : best practice for instantiating prisma.io then create client.ts copy, paste that code 
    const newIssue = await prisma.issue.create({
        data:{title:body.title, description:body.description}
    });

    return NextResponse.json(newIssue,{status: 201});
}