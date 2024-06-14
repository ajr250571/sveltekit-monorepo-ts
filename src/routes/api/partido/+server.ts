import prisma from '$src/lib/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.auth();
	if (!session?.user?.id) {
		return Response.json(null, { status: 401, statusText: 'Unauthorized' });
	}

	// Graba Partido
	interface Jugador {
		id: number;
		nombre: string;
		jugo: boolean;
		gano: boolean;
	}
	const partido: Jugador[] = await request.json();
	interface Participante {
		partido: string;
		fecha: Date;
		equipo: string;
		puntos: number;
		jugadorId: number;
		userId: number;
	}
	const data: Participante[] = [];
	partido.map((jugador) => {
		if (jugador.jugo) {
			data.push({
				partido: crypto.randomUUID(),
				fecha: new Date(),
				equipo: jugador.gano ? 'Ganador' : 'Perdedor',
				puntos: jugador.gano ? 1 : 0,
				jugadorId: jugador.id,
				userId: Number(session.user.id)
			});
		}
	});
	await prisma.partido.createMany({
		data
	});

	// Graba Parejas
	let parejaGanadora = '';
	let parejaPerdedora = '';

	partido.forEach((jugador) => {
		if (jugador.jugo) {
			if (jugador.gano) {
				parejaGanadora += jugador.nombre + '/';
			} else {
				parejaPerdedora += jugador.nombre + '/';
			}
		}
	});
	await prisma.pareja.create({
		data: {
			fecha: new Date(),
			pareja: parejaGanadora.slice(0, -1),
			puntos: 1,
			userId: Number(session.user.id)
		}
	});
	await prisma.pareja.create({
		data: {
			fecha: new Date(),
			pareja: parejaPerdedora.slice(0, -1),
			puntos: 0,
			userId: Number(session.user.id)
		}
	});

	return Response.json(null, { status: 201 });
};
