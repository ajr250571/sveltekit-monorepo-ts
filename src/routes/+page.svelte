<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<div class="flex flex-col h-[calc(95vh-5rem)] justify-center items-center">
	<h1 class="text-2xl text-primary font-bold mb-4">Home Page</h1>
	<p>{$page?.data?.session?.user.email}</p>
	<button class="btn btn-secondary my-2" on:click={() => signOut()}>Logout</button>
</div>
