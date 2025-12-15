<script lang="ts">
	import '../app.css';

	import { dev } from '$app/environment';

	// Import assets for the Layout
	import logo from '$lib/assets/logo.svg';
	import logoText from '$lib/assets/logo-text.svg';

	let { children } = $props();
</script>

<svelte:head>
	{#if !dev}
		<link rel="preconnect" href="https://cloud.umami.is" />
		<script
			defer
			src="https://cloud.umami.is/script.js"
			data-website-id="34524c61-dccd-409d-8330-8290b2e3a5fc"
		></script>
	{/if}
</svelte:head>

<!-- Wrap site content with a top-level background using the custom Tailwind color 'bg' -->

<div id="app" class="text-mono">
	<header
		class="col-span-2 flex w-full items-center justify-between border-b-2 border-nerd-blue p-5"
	>
		<div class="ascii-logo text-lg">
			<pre>
// N E R D W E R K <span class="font-bold text-nerd-blue">.dev</span>
// _> the open-source lab
                </pre>
		</div>
		<a href="https://nerdwerk.com" class="text-sm hover:underline">> nerdwerk.com</a>
	</header>

	<main class="mt-20 w-full p-4">
		{@render children()}
	</main>

	<footer class="bg-sidebar-bg col-span-2 mt-10 p-4 text-center text-sm">
		<span class="mb-2 block text-nerd-brown"
			>//==============================================================//</span
		>
		&copy; Nerdwerk, 2025. All code is MIT licensed unless noted.
		<br />[ <a href="https://nerdwerk.com" class="text-nerd-blue hover:underline">nerdwerk.com</a>
		] [
		<a href="https://github.com/nerdwerk" class="text-nerd-blue hover:underline"
			>github.com/nerdwerk</a
		> ]
	</footer>
</div>

<style>
	@reference "../app.css";

	#app {
		border-top: 10px solid var(--color-nerd-brown);
		@apply flex min-h-screen flex-col items-center bg-nerd-yellow py-6;
	}
</style>
