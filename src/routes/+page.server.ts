import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$src/lib/prisma';

export const load: PageServerLoad = async (events) => {
	const session = await events.locals.auth();
	if (!session?.user?.id) {
		redirect(303, `/auth/login`);
	}
	const parejas = await prisma.pareja.findMany({
		orderBy: {
			id: 'desc'
		},
		take: 20,
		select: {
			partido: true,
			pareja: true,
			puntos: true
		}
	});
	// const ranking = await axios.get('http://localhost:3010/api/partido');

	return {
		session,
		parejas
	};
};
