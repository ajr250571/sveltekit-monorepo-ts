<script lang="ts">
	import { existeError } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import TextBox from '../../../components/TextBox.svelte';
	// import { signIn } from '../../auth';

	let data = {
		email: '',
		password: ''
	};
	let error = {
		email: '',
		password: ''
	};
	const handleSubmit = async () => {
		if (!existeError) {
			console.log(data);

			// const res = await signIn('credentials', { email: data.email, password: data.password });
			toast.success('Ingresó correctamente ...');
		}
	};

	$: {
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
	}
</script>

<div class="flex h-[calc(100vh-7rem)] justify-center items-center">
	<div class="card card-compact w-96 bg-base-300 shadow-xl">
		<div class="card-body">
			<h2 class="card-title text-3xl text-primary">Login</h2>
			<form on:submit|preventDefault={handleSubmit}>
				<TextBox type="email" label="Email" bind:value={data.email} error={error.email} required />
				<TextBox
					type="password"
					label="Password"
					bind:value={data.password}
					error={error.password}
					required
				/>
				<div class="card-actions justify-end mt-4">
					<button disabled={existeError(error)} type="submit" class="btn btn-primary"
						>✔️ Login</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
