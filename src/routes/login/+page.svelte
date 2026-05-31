<script lang="ts">
	import AuthShell from '../AuthShell.svelte';

	let { data, form } = $props();
</script>

<AuthShell title="Log in to Linkio" subtitle="Continue to your learning network." next={data.next}>
	{#if form?.message}
		<p class="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
			{form.message}
		</p>
	{/if}

	<form method="post" action="?/google" class="mb-5">
		<input type="hidden" name="next" value={data.next} />
		<button
			type="submit"
			class="flex w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
		>
			Continue with Google
		</button>
	</form>

	<div class="mb-5 flex items-center gap-3 text-xs text-slate-500">
		<div class="h-px flex-1 bg-slate-200"></div>
		<span>Email</span>
		<div class="h-px flex-1 bg-slate-200"></div>
	</div>

	<form method="post" action="?/email" class="space-y-4">
		<input type="hidden" name="next" value={data.next} />
		<label class="block">
			<span class="text-sm font-medium">Email</span>
			<input
				class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950"
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
				class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950"
				type="password"
				name="password"
				autocomplete="current-password"
				required
			/>
		</label>
		<button class="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
			Log in
		</button>
	</form>

	<div class="mt-5 flex items-center justify-between text-sm">
		<a class="text-blue-600 hover:underline" href="/reset-password?next={encodeURIComponent(data.next)}">
			Forgot password?
		</a>
		<a class="text-blue-600 hover:underline" href="/signup?next={encodeURIComponent(data.next)}">
			Create account
		</a>
	</div>
</AuthShell>
