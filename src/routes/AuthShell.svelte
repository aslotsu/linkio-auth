<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		subtitle: string;
		next?: string;
		children: Snippet;
	};

	let { title, subtitle, next, children }: Props = $props();
	let dark = $state(false);
</script>

<svelte:head>
	<title>{title} | Linkio</title>
</svelte:head>

<div class:dark>
	<div class="min-h-dvh bg-blue-50 px-4 py-6 text-slate-950 dark:bg-zinc-950 dark:text-white">
		<header class="mx-auto flex w-full max-w-5xl items-center justify-between">
			<a href="/login{next ? `?next=${encodeURIComponent(next)}` : ''}" aria-label="Linkio auth home">
				<img
					src={dark ? '/brand/linkio-dark.png' : '/brand/linkio-light.svg'}
					alt="Linkio"
					class="h-auto w-[86px]"
				/>
			</a>
			<button
				type="button"
				class="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
				onclick={() => (dark = !dark)}
			>
				{dark ? 'Light' : 'Dark'}
			</button>
		</header>

		<main class="mx-auto flex min-h-[calc(100dvh-96px)] w-full max-w-md items-center">
			<section class="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
				<div class="mb-6">
					<h1 class="text-2xl font-semibold tracking-normal">{title}</h1>
					<p class="mt-2 text-sm text-slate-600 dark:text-zinc-400">{subtitle}</p>
				</div>
				{@render children()}
			</section>
		</main>
	</div>
</div>
