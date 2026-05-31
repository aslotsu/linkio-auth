<script lang="ts">
	import AuthShell from '../AuthShell.svelte';

	let { data, form } = $props();
</script>

<AuthShell title="Choose a new password" subtitle="Set a fresh password for your Linkio account." next={data.next}>
	{#if form?.message}
		<p class="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
			{form.message}
		</p>
	{/if}

	<form method="post" class="space-y-4">
		<input type="hidden" name="next" value={data.next} />
		<label class="block">
			<span class="text-sm font-medium">New password</span>
			<input class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950" type="password" name="password" autocomplete="new-password" required />
		</label>
		<label class="block">
			<span class="text-sm font-medium">Confirm new password</span>
			<input class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950" type="password" name="confirmPassword" autocomplete="new-password" required />
		</label>
		<button class="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
			Update password
		</button>
	</form>
</AuthShell>
