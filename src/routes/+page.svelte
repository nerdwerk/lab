<script lang="ts">
</script>

<svelte:head>
	<title>Nerdwerk Lab</title>
	<meta name="description" content="Nerdwerk Lab" />
</svelte:head>

<p>
	This is the Nerdwerk Lab page. <br />Just experiments and tests and stuff. <br />
	It's all open Source. <br />
	Find it here:
	<a href="https://github.com/nerdwerk/lab" target="_blank" rel="noopener noreferrer"
		>github.com/nerdwerk/lab</a
	>
</p>

{#snippet card(path: string, title: string, description: string)}
	<li>
		<a
			href={path}
			class="block transform rounded-lg border border-gray-100/20 p-4 shadow-md transition hover:-translate-y-1 hover:shadow-2xl"
		>
			<h3 class="text-lg font-semibold">{title}</h3>
			<p class="mt-1 text-sm">{description}</p>
		</a>
	</li>
{/snippet}

<ul class="mt-6 grid gap-4 sm:grid-cols-2">
	{@render card(
		'/gradient-image',
		'Gradientz',
		'Create social images from gradient presets and downloadable PNGs.'
	)}
</ul>
