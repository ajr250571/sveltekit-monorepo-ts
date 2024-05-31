<script>
	import 'tailwindcss/tailwind.css';
	import Navbar from '../components/Navbar.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { Toaster } from 'svelte-sonner';
	onMount(() => {
		themeChange(false);
	});
</script>

<svelte:head>
	<title>MonoRepo</title>
</svelte:head>

<main class="container mx-auto px-2">
	<Toaster />
	<Navbar />
	<slot />
</main>
