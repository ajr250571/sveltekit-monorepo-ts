import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({params}) => {
    try {
        const data = await prisma.user.findUnique({
            where: {
                id: Number(params.id)
            }
        })
        if (data===null) {
            return Response.json({message: "User not found"},{status: 400})    
        }
        return Response.json(data,{status: 201});        
    } catch (error) {
        return Response.json({message: error},{status: 500})
    }

};