<script lang="ts">
	import AuthShell from '../AuthShell.svelte';

	let { data, form } = $props();
</script>

<AuthShell
	title="Reset your password"
	subtitle="We will send a secure reset link to your email."
	next={data.next}
>
	{#if form?.success}
		<div class="ui-alert-success">
			Check {form.email} for a password reset link.
		</div>
	{:else}
		{#if form?.message}
			<p class="mb-4 ui-alert-error">
				{form.message}
			</p>
		{/if}

		<form method="post" class="space-y-4">
			<input type="hidden" name="next" value={data.next} />
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
			<button class="ui-btn-primary w-full font-semibold"> Send reset link </button>
		</form>
	{/if}

	<a
		class="mt-5 block text-sm text-primary hover:underline"
		href="/login?next={encodeURIComponent(data.next)}"
	>
		Back to login
	</a>
</AuthShell>
