<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import Logo from '$lib/Logo.svelte';

	type Props = {
		title: string;
		subtitle: string;
		next?: string;
		children: Snippet;
	};

	let { title, subtitle, next, children }: Props = $props();

	// The boot script in app.html has already put `.dark` on <html> before paint;
	// read it back so the button label agrees with what is on screen.
	let isDark = $state(false);
	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	// Writes the same localStorage key the main app reads, so the choice follows
	// the user between auth.linkio.ca and app.linkio.ca.
	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}
</script>

<svelte:head>
	<title>{title} | Linkio</title>
</svelte:head>

<div class="min-h-dvh bg-background px-4 py-6 text-foreground">
	<header class="mx-auto flex w-full max-w-5xl items-center justify-between">
		<a href="/login{next ? `?next=${encodeURIComponent(next)}` : ''}" aria-label="Linkio auth home">
			<Logo class="h-auto w-[86px] text-foreground" />
		</a>
		<button
			type="button"
			class="inline-flex items-center rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors duration-150 hover:bg-muted focus:ring-2 focus:ring-ring focus:outline-none"
			aria-label="Switch to {isDark ? 'light' : 'dark'} theme"
			onclick={toggleTheme}
		>
			{isDark ? 'Light' : 'Dark'}
		</button>
	</header>

	<main class="mx-auto flex min-h-[calc(100dvh-96px)] w-full max-w-md items-center">
		<section class="w-full ui-card p-6">
			<div class="mb-6">
				<h1 class="text-2xl font-semibold tracking-normal">{title}</h1>
				<p class="mt-2 text-sm text-muted-foreground">{subtitle}</p>
			</div>
			{@render children()}
		</section>
	</main>
</div>
