<script lang="ts">
	import AuthShell from '../AuthShell.svelte';

	let { data, form } = $props();
</script>

<AuthShell title="Log in to Linkio" subtitle="Continue to your learning network." next={data.next}>
	{#if form?.message}
		<p class="mb-4 ui-alert-error">
			{form.message}
		</p>
	{/if}

	<form method="post" action="?/google" class="mb-5">
		<input type="hidden" name="next" value={data.next} />
		<button type="submit" class="ui-btn-secondary w-full gap-2 font-medium">
			<img src="/google-logo.svg" alt="" class="size-5" aria-hidden="true" />
			<span>Continue with Google</span>
		</button>
	</form>

	<div class="mb-5 flex items-center gap-3 text-xs text-muted-foreground">
		<div class="h-px flex-1 bg-border"></div>
		<span>Email</span>
		<div class="h-px flex-1 bg-border"></div>
	</div>

	<form method="post" action="?/email" class="space-y-4">
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
		<label class="block">
			<span class="text-sm font-medium">Password</span>
			<input
				class="mt-1 ui-input"
				type="password"
				name="password"
				autocomplete="current-password"
				required
			/>
		</label>
		<button class="ui-btn-primary w-full font-semibold"> Log in </button>
	</form>

	<div class="mt-5 flex items-center justify-between text-sm">
		<a
			class="text-primary hover:underline"
			href="/reset-password?next={encodeURIComponent(data.next)}"
		>
			Forgot password?
		</a>
		<a class="text-primary hover:underline" href="/signup?next={encodeURIComponent(data.next)}">
			Create account
		</a>
	</div>
</AuthShell>
