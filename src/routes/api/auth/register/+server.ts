import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json()
        const emailFound = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (emailFound) {
            return Response.json(
                {
                    message: "Email already exists.",
                },
                { status: 404 }
            );
        }
        const hashPassword = await bcrypt.hash(data.password, 10);
        const userNew = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashPassword,
            },
        });
        const { password: _, ...user } = userNew;
        return Response.json(user, { status: 201 });
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
};