<script lang="ts">
	import AuthShell from '../AuthShell.svelte';

	let { data, form } = $props();
</script>

<AuthShell
	title="Choose a new password"
	subtitle="Set a fresh password for your Linkio account."
	next={data.next}
>
	{#if form?.message}
		<p class="mb-4 ui-alert-error">
			{form.message}
		</p>
	{/if}

	<form method="post" class="space-y-4">
		<input type="hidden" name="next" value={data.next} />
		<label class="block">
			<span class="text-sm font-medium">New password</span>
			<input
				class="mt-1 ui-input"
				type="password"
				name="password"
				autocomplete="new-password"
				required
			/>
		</label>
		<label class="block">
			<span class="text-sm font-medium">Confirm new password</span>
			<input
				class="mt-1 ui-input"
				type="password"
				name="confirmPassword"
				autocomplete="new-password"
				required
			/>
		</label>
		<button class="ui-btn-primary w-full font-semibold"> Update password </button>
	</form>
</AuthShell>
