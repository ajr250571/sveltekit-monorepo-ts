<script lang="ts">
	import { existeError } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import TextBox from '../../../components/TextBox.svelte';
	import axios from 'axios';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	let data = {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};
	let error = {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	const handleSubmit = async () => {
		if (!existeError(error)) {
			const { confirmPassword, ...user } = data;
			try {
				const response = await axios.post('/api/auth/register', user);
				goto('/auth/login');
			} catch (error) {
				console.error('Error al enviar datos:', error);
			}
		}
	};

	$: {
		if (data.name.length <= 3) {
			error.name = 'Name debe ser mayor a 3 caracteres.';
		} else {
			error.name = '';
		}
		const exEmail =
			/^(([^<>()[\]\\.,;:\s@\“]+(\.[^<>()[\]\\.,;:\s@\“]+)*)|(\“.+\“))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z\-0–9]{2,}))$/.test(
				data.email
			);
		if (data.email.length === 0 || !exEmail) {
			error.email = 'Email requerido y el formato debe ser valido.';
		} else {
			error.email = '';
		}

		const exPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$#@%&*¡?])/.test(data.password);
		if (data.password.length < 8 || !exPassword) {
			error.password =
				'La contraseña debe tener al menos 8 caracteres, una letra minúscula, una mayúscula, un número y un carácter especial.';
		} else {
			error.password = '';
		}
		if (data.password !== data.confirmPassword) {
			error.confirmPassword = 'Password debe ser igual a ConfirmPassword';
		} else {
			error.confirmPassword = '';
		}
	}
</script>

<div class="flex h-[calc(100vh-7rem)] justify-center items-center">
	<div class="card card-compact w-96 bg-base-300 shadow-xl">
		<div class="card-body">
			<h2 class="card-title text-3xl text-primary">Register</h2>
			<form on:submit|preventDefault={handleSubmit}>
				<TextBox type="text" label="Name" bind:value={data.name} error={error.name} required />
				<TextBox type="email" label="Email" bind:value={data.email} error={error.email} required />
				<TextBox
					type="password"
					label="Password"
					bind:value={data.password}
					error={error.password}
					required
				/>
				<TextBox
					type="password"
					label="Confirm Password"
					bind:value={data.confirmPassword}
					error={error.confirmPassword}
					required
				/>
				<div class="flex justify-between mt-2 items-center">
					<p class="font-bold">Ya tiene una cuenta?</p>
					<a class="link link-primary text-2xl" href="/auth/login">Login</a>
				</div>
				<div class="card-actions justify-end mt-4">
					<button disabled={existeError(error)} type="submit" class="btn btn-primary"
						>✔️ Register</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
