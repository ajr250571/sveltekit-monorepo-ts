<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import axios from 'axios';
	import { onMount } from 'svelte';
	export let data;

	interface Jugador {
		id: number;
		nombre: string;
		jugo: number;
		gano: number;
		eficiencia: number;
	}

	let ranking: Jugador[] = [];
	onMount(async () => {
		ranking = (await axios.get('/api/partido')).data;
	});
</script>

<div class="flex flex-col justify-center items-center">
	<div class="flex flex-row justify-between w-full items-center border-b-2">
		<div>
			<h1 class="text-2xl text-primary font-bold">Metegol</h1>

			<p>{data.session.user.name}</p>
		</div>
		<button class="btn btn-secondary btn-xs" on:click={() => signOut()}>Logout</button>
	</div>
	<h1 class="text-primary font-bold mt-4 mb-2">Eficiencia Jugadores</h1>
	<div class="grid grid-cols-4 justify-between w-full">
		<p class="text-secondary font-bold border-b-2 text-xs p-2">Jugador</p>
		<p class="text-secondary font-bold border-b-2 text-xs p-2">Jugó</p>
		<p class="text-secondary font-bold border-b-2 text-xs p-2">Ganó</p>
		<p class="text-secondary font-bold border-b-2 text-xs p-2">Efi</p>
		{#each ranking as item}
			<!-- content here -->
			<p class="text-secondary font-bold border-b-2 text-xs p-2">{item.nombre}</p>
			<p class="text-secondary font-bold border-b-2 text-xs p-2">{item.jugo}</p>
			<p class="text-secondary font-bold border-b-2 text-xs p-2">{item.gano}</p>
			<p class="text-secondary font-bold border-b-2 text-xs p-2">{item.eficiencia}</p>
		{/each}
	</div>
	<h1 class="text-primary font-bold mt-4 mb-2">Ultimos Partidos</h1>
	<div class="grid grid-cols-2 justify-between w-full">
		{#each data.parejas as item}
			{#if item.puntos === 1}
				<p class="text-secondary font-bold border-b-2 text-xs p-2">{item.pareja}</p>
			{:else}
				<p class="text-error font-bold border-b-2 text-xs p-2">{item.pareja}</p>
			{/if}
		{/each}
	</div>
</div>
