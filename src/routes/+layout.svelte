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

<div id="app">
	<div id="layout">
		<a href="https://nerdwerk.com" class="sr-only">
			<h1>NERDWERK</h1>
		</a>
		<div bind:this={heroSection}>
			<div
				id="logo"
				class="flex w-full flex-wrap items-center justify-center gap-4"
				in:fly={{ y: -16, duration: 1000, delay: 100 }}
			>
				<img src={logo} alt="Nerdwerk logo icon" class="h-auto max-w-[24vw] sm:max-w-[112px]" />
				<img src={logoText} alt="Nerdwerk logotype" class="h-auto max-w-[70vw] sm:max-w-[420px]" />
				<span
					class="basis-full text-center text-2xl font-black text-blue-600
				"
					>ᕁ᙮ᕁᕽᕽᕁ᙮᙮ᕁᕽᕽᕁ᙮ᕁ LAB ᕁ᙮ᕁᕽᕽᕁ᙮᙮ᕁᕽᕽᕁ᙮ᕁ
				</span>
			</div>

			<nav id="nav" class="flex w-full flex-wrap items-center justify-center gap-4 text-base"></nav>
		</div>

		<main class="mt-20 w-full">
			{@render children()}
		</main>
	</div>
</div>

<style>
	@reference "../app.css";

	#app {
		border-top: 20px solid var(--color-nerd-brown);
		@apply flex min-h-screen flex-col items-center bg-nerd-yellow py-6;
	}

	#layout {
		@apply mx-auto flex w-full max-w-2xl flex-col items-center px-4 pb-12 sm:px-6 lg:px-8;
	}

	#nav a {
		@apply relative z-10 px-2 py-1 text-2xl text-black hover:underline;
	}

	#nav [aria-current='true']::after {
		content: '';
		@apply absolute bottom-2 left-0 block h-3 w-full bg-nerd-highlight;
		z-index: -1;
	}

	#topbar nav a {
		@apply px-2 py-1 text-lg text-black hover:underline;
	}
</style>
