import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (events) => {
	const data = await prisma.post.findMany();

	const session = await events.locals.auth();
	if (!session) {
		redirect(303, `/auth/login`);
	}

	return {
		posts: data,
		session
	};
}) satisfies PageServerLoad;
