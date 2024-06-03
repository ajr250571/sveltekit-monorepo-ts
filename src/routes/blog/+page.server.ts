import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const data = await prisma.post.findMany()

    return { posts: data };
}) satisfies PageServerLoad;