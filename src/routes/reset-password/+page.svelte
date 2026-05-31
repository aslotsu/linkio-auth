<script lang="ts">
	import AuthShell from '../AuthShell.svelte';

	let { data, form } = $props();
</script>

<AuthShell title="Reset your password" subtitle="We will send a secure reset link to your email." next={data.next}>
	{#if form?.success}
		<div class="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm text-emerald-800">
			Check {form.email} for a password reset link.
		</div>
	{:else}
		{#if form?.message}
			<p class="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
				{form.message}
			</p>
		{/if}

		<form method="post" class="space-y-4">
			<input type="hidden" name="next" value={data.next} />
			<label class="block">
				<span class="text-sm font-medium">Email</span>
				<input class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950" type="email" name="email" value={form?.email ?? ''} autocomplete="email" required />
			</label>
			<button class="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
				Send reset link
			</button>
		</form>
	{/if}

	<a class="mt-5 block text-sm text-blue-600 hover:underline" href="/login?next={encodeURIComponent(data.next)}">
		Back to login
	</a>
</AuthShell>
