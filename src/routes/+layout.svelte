<script lang="ts">
	import '../app.css';

	import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	// Import assets for the Layout
	import logo from '$lib/assets/logo.svg';
	import logoText from '$lib/assets/logo-text.svg';

	import Footer from '$lib/ui/Footer.svelte';
	import { fade, fly } from 'svelte/transition';

	import { page } from '$app/state';
	let { children } = $props();
	let hydrated = $state(false);
	let showTopBar = $state(false);
	let menuOpen = $state(false);
	let heroSection: HTMLElement | null = null;

	onMount(() => {
		hydrated = true;
		const handleScroll = () => {
			if (!heroSection) return;
			const { bottom } = heroSection.getBoundingClientRect();
			showTopBar = bottom <= 0;
			if (!showTopBar) {
				menuOpen = false;
			}
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	});
</script>

<svelte:head>
	{#if !dev}
		<link rel="preconnect" href="https://cloud.umami.is" />
		<script
			defer
			src="https://cloud.umami.is/script.js"
			data-website-id="7bb70dbe-0ed3-4391-825c-9ac5e0ffaaf1"
		></script>
	{/if}
</svelte:head>

<!-- Wrap site content with a top-level background using the custom Tailwind color 'bg' -->
{#if hydrated}
	{#if showTopBar}
		<div
			id="topbar"
			in:fly={{ y: -30, duration: 220 }}
			out:fly={{ y: -30, duration: 180 }}
			class="fixed top-2 right-2 left-2 z-50 rounded-2xl border-b-4 border-nerd-brown bg-nerd-yellow/90 shadow-2xl backdrop-blur sm:left-1/2 sm:max-w-xl sm:-translate-x-1/2
			"
		>
			<div
				class="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
			>
				<a href="/" class="flex items-center gap-3">
					<img src={logo} alt="Nerdwerk logo icon" class="h-8 w-8" />
					<img src={logoText} alt="Nerdwerk logotype" class="h-6" />
				</a>
				<div class="flex items-center gap-4">
					<nav class="hidden gap-3 text-lg sm:flex">
						<a href="/" aria-current={page.url.pathname === '/'}>Home</a>
						<a href="/about" aria-current={page.url.pathname === '/about'}>About</a>
						<a href="/contact" aria-current={page.url.pathname === '/contact'}>Contact</a>
					</nav>
					<button
						class="flex items-center gap-2 rounded-md border-2 border-black px-3 py-1 text-lg sm:hidden"
						aria-expanded={menuOpen}
						aria-controls="mobile-nav"
						on:click={() => (menuOpen = !menuOpen)}
					>
						<span class="sr-only">Toggle navigation</span>
						<div class="flex flex-col gap-1 py-2">
							<span class="block h-[2px] w-5 rounded-full bg-black"></span>
							<span class="block h-[2px] w-5 rounded-full bg-black"></span>
							<span class="block h-[2px] w-5 rounded-full bg-black"></span>
						</div>
					</button>
				</div>
			</div>
			{#if menuOpen}
				<nav
					id="mobile-nav"
					class="border-t-4 border-nerd-brown bg-nerd-yellow px-4 py-3 sm:hidden"
					in:fade={{ duration: 150 }}
					out:fade={{ duration: 120 }}
				>
					<div class="flex flex-col gap-2 text-lg">
						<a href="/" aria-current={page.url.pathname === '/'} on:click={() => (menuOpen = false)}
							>Home</a
						>
						<a
							href="/about"
							aria-current={page.url.pathname === '/about'}
							on:click={() => (menuOpen = false)}>About</a
						>
						<a
							href="/contact"
							aria-current={page.url.pathname === '/contact'}
							on:click={() => (menuOpen = false)}
						>
							Contact
						</a>
					</div>
				</nav>
			{/if}
		</div>
	{/if}

	<div id="app">
		<div id="layout" in:fade={{ duration: 1000 }}>
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
					<img
						src={logoText}
						alt="Nerdwerk logotype"
						class="h-auto max-w-[70vw] sm:max-w-[420px]"
					/>
				</div>

				<nav
					id="nav"
					class="flex w-full flex-wrap items-center justify-center gap-4 text-base"
					in:fly={{ y: 40, duration: 800, delay: 140 }}
				>
					<a href="/" aria-current={page.url.pathname === '/'} in:fly={{ y: 6, delay: 180 }}>Home</a
					>
					<a
						href="/about"
						aria-current={page.url.pathname === '/about'}
						in:fly={{ y: 6, delay: 230 }}>About</a
					>
					<a
						href="/contact"
						aria-current={page.url.pathname === '/contact'}
						in:fly={{ y: 6, delay: 280 }}
					>
						Contact
					</a>
					<!-- <a href="/journal" aria-current={page.url.pathname.startsWith('/journal')}>Journal</a> -->
				</nav>
			</div>

			<main class="mt-20 w-full" in:fade={{ delay: 300, duration: 400 }}>
				{@render children()}
			</main>

			<div>
				<Footer />
			</div>
		</div>
	</div>
{/if}

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
