import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';


export const GET: RequestHandler = async () => {
    const users = await prisma.user.findMany()
    return Response.json(users)
};

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json()
    const user= await prisma.user.findFirst({
        where: {
            email: data.email
        },
        select: {
            id: true,
            name: true,
            email:true,
            password:true
        }
    })    
    if (user===null) {
        return Response.json({message: 'User not found'},{status:401})
    }

    return Response.json(user,{status:201})
};

