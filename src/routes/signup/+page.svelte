<script lang="ts">
	import AuthShell from '../AuthShell.svelte';

	let { data, form } = $props();
</script>

<AuthShell
	title="Create your Linkio account"
	subtitle="Sign up to join the learning network."
	next={data.next}
>
	{#if form?.success}
		<div class="ui-alert-success">
			Check {form.email} for a confirmation link.
		</div>
		<a
			class="mt-5 block text-sm text-primary hover:underline"
			href="/login?next={encodeURIComponent(data.next)}"
		>
			Back to login
		</a>
	{:else}
		{#if form?.message}
			<p class="mb-4 ui-alert-error">
				{form.message}
			</p>
		{/if}

		<form method="post" class="space-y-4">
			<input type="hidden" name="next" value={data.next} />
			<label class="block">
				<span class="text-sm font-medium">Full name</span>
				<input
					class="mt-1 ui-input"
					name="fullName"
					value={form?.fullName ?? ''}
					autocomplete="name"
					required
				/>
			</label>
			<label class="block">
				<span class="text-sm font-medium">Email</span>
				<input
					class="mt-1 ui-input"
					type="email"
					name="email"
					value={form?.email ?? ''}
					autocomplete="email"
					required
				/>
			</label>
			<label class="block">
				<span class="text-sm font-medium">Password</span>
				<input
					class="mt-1 ui-input"
					type="password"
					name="password"
					autocomplete="new-password"
					required
				/>
			</label>
			<label class="block">
				<span class="text-sm font-medium">Confirm password</span>
				<input
					class="mt-1 ui-input"
					type="password"
					name="confirmPassword"
					autocomplete="new-password"
					required
				/>
			</label>
			<button class="ui-btn-primary w-full font-semibold"> Create account </button>
		</form>

		<p class="mt-5 text-sm text-muted-foreground">
			Already have an account?
			<a class="text-primary hover:underline" href="/login?next={encodeURIComponent(data.next)}"
				>Log in</a
			>
		</p>
	{/if}
</AuthShell>
